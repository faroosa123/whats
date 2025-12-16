const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// start web server
require('./server');

let voicemailOn = false;

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ]
  }
});

client.on('qr', qr => {
  console.log('QR CODE RECEIVED');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('WhatsApp bot READY');
});

client.on('message', async msg => {
  const chat = await msg.getChat();

  // commands ONLY from your own account
  if (msg.fromMe) {
    if (msg.body === '/voicemail on') {
      voicemailOn = true;
      return msg.reply('Voicemail ON ✅');
    }
    if (msg.body === '/voicemail off') {
      voicemailOn = false;
      return msg.reply('Voicemail OFF ❌');
    }
  }

  if (!voicemailOn) return;

  if (chat.isGroup) {
    if (!msg.mentionedIds.includes(client.info.wid._serialized)) return;
  }

  await msg.reply("Fares isn't here right now. Try texting later");
});

client.initialize();
