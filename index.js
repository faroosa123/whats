const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// 🔥 IMPORTANT: this line makes the bot run
require('./server');

let voicemailOn = false;
const VOICEMAIL_MESSAGE =
  "Fares isn't here right now. Try texting later";

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
  console.log('Scan QR');
});

client.on('ready', () => {
  console.log('WhatsApp bot READY');
});

client.on('message', async msg => {
  const chat = await msg.getChat();

  // ✅ commands FROM YOUR OWN ACCOUNT
  if (msg.fromMe) {
    if (msg.body === '/voicemail on') {
      voicemailOn = true;
      await msg.reply('Voicemail ON ✅');
      return;
    }
    if (msg.body === '/voicemail off') {
      voicemailOn = false;
      await msg.reply('Voicemail OFF ❌');
      return;
    }
  }

  if (!voicemailOn) return;

  if (chat.isGroup) {
    if (!msg.mentionedIds.includes(client.info.wid._serialized)) return;
  }

  await msg.reply(VOICEMAIL_MESSAGE);
});

client.initialize();
