const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

let voicemailOn = false; // voicemail toggle
const VOICEMAIL_MESSAGE = "Fares isn't here right now. Try texting later";

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log("Scan this QR code with WhatsApp!");
});

client.on('ready', () => {
    console.log('WhatsApp bot is ready!');
});

client.on('message', async msg => {
    const chat = await msg.getChat();

    // Command to toggle voicemail
    if (msg.body.toLowerCase() === '/voicemail on') {
        voicemailOn = true;
        msg.reply('Voicemail is now ON ✅');
        return;
    }
    if (msg.body.toLowerCase() === '/voicemail off') {
        voicemailOn = false;
        msg.reply('Voicemail is now OFF ❌');
        return;
    }

    // Only respond if voicemail is on
    if (!voicemailOn) return;

    // Ignore groups unless mentioned
    if (chat.isGroup) {
        if (!msg.mentionedIds.includes(client.info.wid._serialized)) return;
    }

    // Send voicemail message
    msg.reply(VOICEMAIL_MESSAGE);
});

client.initialize();
