const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

require('./server');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  }
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
  console.log('QR RECEIVED — scan it');
});

client.on('ready', () => {
  console.log('WhatsApp bot READY');
});

client.on('message', async msg => {
  const chat = await msg.getChat();

  if (msg.fromMe) {
    if (msg.body === '/voicemail on') {
      global.voicemailOn = true;
      return msg.reply('Voicemail ON ✅');
    }
    if (msg.body === '/voicemail off') {
      global.voicemailOn = false;
      return msg.reply('Voicemail OFF ❌');
    }
  }

  if (!global.voicemailOn) return;

  if (chat.isGroup) {
    if (!msg.mentionedIds.includes(client.info.wid._serialized)) return;
  }

  await msg.reply("Fares isn't here right now. Try texting later");
});

client.initialize();

