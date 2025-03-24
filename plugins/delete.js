let DELCHAT = process.env.DELCHAT || 'pm';
const { smd, tlang, botpic, prefix, Config, bot_ } = require('../lib');
let bgmm = false;

smd(
  {
    pattern: 'antidelete',
    react: "⛔️",
    alias: ['delete'],
    desc: 'Turn On/Off auto download deletes',
    fromMe: true,
    category: 'general',
    use: '<on/off>',
    filename: __filename,
  },
  async (message, command) => {
    try {
      bgmm = await bot_.findOne({ id: 'bot_' + message.user }) || await bot_.new({ id: 'bot_' + message.user });
      let action = command.toLowerCase().split(' ')[0].trim();
      
      if (action === 'on' || action === 'enable' || action === 'act') {
        if (bgmm.antidelete === 'true') {
          return await message.reply('*Anti_Delete already enabled!*');
        }
        await bot_.updateOne({ id: 'bot_' + message.user }, { antidelete: 'true' });
        await message.reply('*Anti_Delete Successfully enabled*');
      } else if (action === 'off' || action === 'disable' || action === 'deact') {
        if (bgmm.antidelete === 'false') {
          return await message.reply('*Anti_Delete already disabled*');
        }
        await bot_.updateOne({ id: 'bot_' + message.user }, { antidelete: 'false' });
        await message.reply('*Anti_Delete Successfully deactivated*');
      } else {
        return await message.send('*_Use on/off to enable/disable Anti_Delete!_*');
      }
    } catch (error) {
      await message.error(error + '\n\nCommand: antidelete ', error);
    }
  }
);

let ms = [],
  { stor, isGroup } = require('../lib');

smd({ on: 'delete' }, async (message, command, { store }) => {
  try {
    let botData = await bot_.findOne({ id: 'bot_' + message.user });
    if (botData && botData.antidelete && botData.antidelete === 'true') {
      let participant = message.msg.key.participant
        ? message.msg.key.participant
        : message.msg.key.fromMe
        ? message.user
        : message.msg.key.remoteJid;

      let storeData = await stor();
      if (!storeData.messages[message.from]) {
        storeData.messages[message.from] = {};
      }
      ms = [
        ...storeData.messages[message.from],
        ...store.messages[message.from].array,
      ];

      for (let i = 0; i < ms.length; i++) {
        if (ms[i].key.id === message.msg.key.id) {
          let fakeMessage = await message.bot.fakeMessage(
            'text',
            { id: message.msg.key.id },
            '*⛔️[ANTIDELETE DETECTED]⛔️*'
          );
          
          let forwardedMessage = await message.bot.forwardOrBroadCast(
            /pm/gi.test(DELCHAT) ? message.user : message.from,
            ms[i].message,
            {
              quoted:
                ms[i].message && ms[i].message.conversation
                  ? undefined
                  : fakeMessage,
            }
          );

          if (forwardedMessage) {
            await message.bot.sendMessage(
              /pm/gi.test(DELCHAT) ? message.user : message.from,
              {
                text:
                  '*❌[DELETED INFORMATION]❌*\n\n*🕦TIME:* ' +
                  message.time +
                  '\n*📝CHAT:* ' +
                  (await message.bot.getName(message.chat))
                    .split('\n')
                    .join('  ') +
                  '\n*🚫DELETED BY:* @' +
                  message.senderNum +
                  '\n*📝MESSAGE FROM:* @' +
                  participant.split('@')[0],
                mentions: [participant, message.sender],
              },
              { quoted: forwardedMessage }
            );
          }
          break;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
});