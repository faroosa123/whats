const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

let voicemailOn = false;
const VOICEMAIL_MESSAGE = "Fares isn't here right now. Try texting later";

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/nix/store/qa9cnw4v5xkxyip6mb9kxqfq1z4x2dx1-chromium-138.0.7204.100/bin/chromium',
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ]
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log("Scan this QR code with WhatsApp!");
});

client.on('ready', () => {
    console.log('WhatsApp bot is ready!');
});

client.on('message_create', async msg => {
    const chat = await msg.getChat();

    if (msg.body.toLowerCase() === '/voicemail on') {
        voicemailOn = true;
        console.log('Voicemail turned ON');
        if (msg.fromMe) {
            chat.sendMessage('Voicemail is now ON ✅');
        } else {
            msg.reply('Voicemail is now ON ✅');
        }
        return;
    }
    if (msg.body.toLowerCase() === '/voicemail off') {
        voicemailOn = false;
        console.log('Voicemail turned OFF');
        if (msg.fromMe) {
            chat.sendMessage('Voicemail is now OFF ❌');
        } else {
            msg.reply('Voicemail is now OFF ❌');
        }
        return;
    }

    if (!voicemailOn) return;
    if (msg.fromMe) return;

    if (chat.isGroup) {
        if (!msg.mentionedIds.includes(client.info.wid._serialized)) return;
    }

    msg.reply(VOICEMAIL_MESSAGE);
});

client.initialize();
