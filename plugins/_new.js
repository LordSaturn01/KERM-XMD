let {
   runtime,
   formatp,
   prefix,
   smd,
   smdBuffer,
 } = require("../lib");
 const axios = require("axios");
 const fetch = require("node-fetch");
 const os = require("os");
 const speed = require("performance-now");
 const Config = require("../config");
 const cheerio = require("cheerio");

 smd(
  {
    pattern: "channel",
    desc: "Dev Channel",
    react: "⛓️",
    category: "user",
    filename: __filename,
  },
  async (message) => {
    const channelMessage = `ᵏᵍ┘𝐊𝐄𝐑𝐌_𝐌𝐃-𝐕𝟐└ 𝘾𝙃𝘼𝙉𝙉ᴇ𝙇 𝙎𝙐𝙋𝙋ᴏ𝙍𝙏\n\n _ʜᴇʏ ʜᴇʀᴇ's ᴏᴜʀ ᴄʜᴀɴɴᴇʟ ʟɪɴᴋ, ᴘʟᴇᴀsᴇ ғᴏʟʟᴏᴡ ᴀɴᴅ sᴜᴘᴘᴏʀᴛ ᴜs ᴛᴏ ᴋᴇᴇᴘ ᴛʜɪs ᴘʀᴏᴊᴇᴄᴛ ᴀʟɪᴠᴇ_\n *ʟɪɴᴋ:* https://whatsapp.com/channel/0029Vafn6hc7DAX3fzsKtn45\n\n ${Config.botname} *©Kg Tech*`;

    const contextInfo = {
      forwardingScore: 999,
      isForwarded: true,
    };

    await message.send(channelMessage, { contextInfo });
  }
);

smd(
  {
    pattern: "support",
    desc: "Dev Support",
    react: "⛓️",
    category: "user",
    filename: __filename,
  },
  async (message) => {
    const SupportMsg = `FOR ALL YOUR CONCERNS, JOIN WHATSAPP SUPPORT TO FIND SOLUTIONS! \n\n *WHATSAPP SUPPORT :* https://chat.whatsapp.com/L5MM9j04Caz4y2EZHRnD1Z\n\n ${Config.botname} *©️Kg Tech*`;

    const contextInfo = {
      forwardingScore: 999,
      isForwarded: true,
    };

    await message.send(SupportMsg, { contextInfo });
  }
);

smd({
   cmdname: "listmessage",
   alias: ["countmessage", "msgcount"],
   desc: "Check how many users continuously active in chat!",
   category: "misc",
   filename: __filename
 }, async (message, chatData, { store }) => {
   try {
     let userMessages = {};
     store.messages[message.jid].array.forEach(msg => {
       const sender = msg.pushName || (message.isGroup ? msg.key.participant : msg.key.remoteJid || "unknown").split("@")[0];
       userMessages[sender] = (userMessages[sender] || 0) + 1;
     });
     let userEntries = Object.entries(userMessages);
     if (!userEntries || !userEntries[0]) {
       return await message.reply("_No messages found!_");
     }
     const userList = Object.entries(userMessages).map(([username, count]) => "\t*" + (username?.split("\n").join(" ") || "unknown") + "*  ➪  _" + count + "_").join("\n");
     var messageList = ("*LIST OF ACTIVE USERS IN CURRENT CHAT*\n_Note: Sometimes Data will be reset when bot restart!_\n\n*Total Users: _" + userEntries.length + "_*\n\n*USERNAME ➪ MESSAGE COUNT(s)*\n" + userList + "\n\n" + Config.caption).trim();
     await message.send(messageList, {
       contextInfo: {
         ...(await message.bot.contextInfo("ACTIVE USERS", message.senderName))
       }
     }, "asta", message);
   } catch (error) {
     console.log({
       e: error
     });
   }
 });

 let commandHistory = [];

 smd({
   on: "main"
 }, async (message, chatData, { icmd }) => {
   try {
     if (icmd && message.cmd) {
       commandHistory.push({
         user: message.sender,
         command: message.cmd,
         timestamp: new Date()
       });
     }
   } catch (error) {
     await message.error(error + "\n\ncommand : listmessage", error, "*ERROR!*");
   }
 });

 smd({
   cmdname: "usage",
   desc: "Counts the commands used by users after starting bot bro🙂?",
   category: "misc",
   filename: __filename
 }, async message => {
   try {
     let users = [];
     const userStats = {};
     commandHistory.forEach(({ user, command }) => {
       if (!userStats[user]) {
         userStats[user] = {
           commands: {},
           count: 0
         };
         users.push(user);
       }
       if (!userStats[user].commands[command]) {
         userStats[user].commands[command] = 1;
       } else {
         userStats[user].commands[command]++;
       }
       userStats[user].count++;
     });
     const usageList = users.map((user, index) => {
       const userCommands = userStats[user].commands;
       const commandList = Object.entries(userCommands).map(([cmd, count]) => cmd + " " + (count <= 1 ? "" : "(" + count + ")")).join(", ");
       return "*" + (index + 1) + " -- @" + user.split("@")[0] + "'s ➪ " + userStats[user].count + "*  \n *LIST ➪*  _" + commandList.trim() + "_";
     }).join("\n\n");
     var usageReport = ("*LIST OF COMMANDS USED TODAY!*\n_Note: Data will be reset when bot restart!_\n\n*Total Users: _" + users.length + "_*\n*Total Command Used: _" + commandHistory.length + "_*\n\n" + usageList + "\n\n" + Config.caption).trim();
     await message.send(usageReport, {
       contextInfo: {
         ...(await message.bot.contextInfo("HISTORY"))
       },
       mentions: [...users]
     }, "asta", message);
   } catch (error) {
     await message.error(error + "\n\ncommand : cmdused", error, "*ERROR!*");
   }
 });
 smd({
   cmdname: "test",
   alias: ["check", "checkbot"],
   desc: "Check if the bot is active",
   category: "misc",
   filename: __filename
 }, async (message) => {
   try {
     let activeStatusMessage = "*ᵏᵍ┘𝐊𝐄𝐑𝐌_𝐌𝐃-𝐕𝟐└ CURRENTLY ACTIVE BRO👽!*";
     await message.reply(activeStatusMessage, {
       contextInfo: {
         externalAdReply: {
           title: "ACTIVE",
           sourceUrl: gurl,
           showAdAttribution: true,
           thumbnail: await smdBuffer(await message.getpp())
         }
       }
     }, "asta");
   } catch (error) {
     // Handle error if necessary
   }
 });

smd({
   cmdname: "caption",
   desc: "Set caption for replied message",
   category: "misc",
   filename: __filename
 }, async (sender, captionText) => {
   try {
     if (!sender.reply_message || !captionText) {
       return await sender.reply(
         !sender.reply_message 
         ? "*_Please reply to a message with a caption | filename_*" 
         : "*Please provide text to set caption man😑!*"
       );
     }
     
     // Check if the replied message is an image, video, or document
     if (sender.reply_message.image || sender.reply_message.video || sender.reply_message.mtype.includes("document")) {
       let filename = "" + captionText.split("|")[1]?.trim() || "null";
       let caption = sender.reply_message.mtype.includes("document") ? captionText.split("|")[0].trim() : captionText;
       sender.reply_message.message[sender.reply_message.mtype].caption = caption;
       sender.reply_message.message[sender.reply_message.mtype].fileName = filename;
       await sender.bot.copyNForward(sender.chat, sender.reply_message);
     } else {
       return await sender.reply("Please reply to an audio/video/document message.");
     }
   } catch (error) {
     await sender.error(error + "\n\nCommand: caption", error, false);
   }
 });

smd({
   cmdname: "todoc",
   desc: "Send document for replied image/video message",
   category: "misc",
   filename: __filename
 }, async (sender, filenameText) => {
   try {
     let media = sender.image || sender.video ? sender : sender.reply_message && (sender.reply_message.image || sender.reply_message.video) ? sender.reply_message : false;
     if (!media) {
       return await sender.reply("_Reply to an image/video message!_");
     }
     if (!filenameText) {
       return await sender.reply("_Need filename, Example: document asta | caption_");
     }
     let fileUrl = await sender.bot.downloadAndSaveMediaMessage(media);
     let separator = filenameText.includes(":") ? ":" : filenameText.includes(";") ? ";" : "|";
     let fileName = filenameText.split(separator)[0].trim() + "." + (media.image ? "jpg" : "mp4");
     let caption = filenameText.split(separator)[1]?.trim() || "";
     caption = ["copy", "default", "old", "reply"].includes(caption) ? media.text : caption;
     if (fileUrl) {
       sender.bot.sendMessage(sender.chat, {
         document: {
           url: fileUrl
         },
         mimetype: media.mimetype,
         fileName: fileName,
         caption: caption
       });
     } else {
       sender.reply("*Request Denied!*");
     }
   } catch (error) {
     await sender.error(error + "\n\nCommand: document", error, false);
   }
 });

smd({
   cmdname: "tovv",
   desc: "Send view-once for replied image/video message",
   category: "misc",
   filename: __filename
 }, async (sender, captionText) => {
   try {
     let media = sender.image || sender.video ? sender : sender.reply_message && (sender.reply_message.image || sender.reply_message.video) ? sender.reply_message : false;
     if (!media) {
       return await sender.reply("_Reply to image/video with caption!_");
     }
     let fileUrl = await sender.bot.downloadAndSaveMediaMessage(media);
     let mediaType = media.image ? "image" : "video";
     if (fileUrl) {
       sender.bot.sendMessage(sender.chat, {
         [mediaType]: {
           url: fileUrl
         },
         caption: captionText,
         mimetype: media.mimetype,
         fileLength: "99999999",
         viewOnce: true
       }, {
         quoted: media
       });
     } else {
       sender.reply("*Request Denied!*");
     }
   } catch (error) {
     await sender.error(error + "\n\nCommand: tovv", error, false);
   }
 });

smd({
   cmdname: "feature",
   category: "misc",
   filename: __filename,
   info: "Get counting for total features!"
 }, async (sender) => {
   try {
     const plugins = require("../lib/plugins");
     let totalFeatures = Object.values(plugins.commands).length;
     try {
       let { key: messageKey } = await sender.send("Counting... 0", {}, "asta", sender);
       for (let i = 0; i <= totalFeatures; i++) {
         if (i % 15 === 0) {
           await sender.send("Counting... " + i, { edit: messageKey }, "asta", sender);
         } else if (totalFeatures - i < 10) {
           await sender.send("Counting... " + i, { edit: messageKey }, "asta", sender);
         }
       }
       await sender.send("*Feature Counting Done!*", { edit: messageKey }, "asta", sender);
     } catch (error) {}
     let featureStats = ` *乂 𝐊𝐄𝐑𝐌 𝐌𝐃 - ＢＯＴ ＦＥＡＴＵＲＥ*\n\n\n  ◦ _Total Features ➪ ${totalFeatures}_\n  \n*◦ LIST DOWN THE FEATURES*\n\n      _Commands ➪ ${Object.values(plugins.commands).filter(command => command.pattern).length}_\n      _Msg Listener ➪ ${Object.values(plugins.commands).filter(command => command.on).length}_\n      _Call Listener ➪ ${Object.values(plugins.commands).filter(command => command.call).length}_\n      _Group Listener ➪ ${Object.values(plugins.commands).filter(command => command.group).length}_\n  \n\n` + Config.caption;
     await sender.bot.relayMessage(sender.chat, {
       requestPaymentMessage: {
         currencyCodeIso4217: "NG",
         amount1000: totalFeatures * 5000,
         requestFrom: "0@s.whatsapp.net",
         noteMessage: {
           extendedTextMessage: {
             text: featureStats,
             contextInfo: {
               mentionedJid: [sender.sender],
               externalAdReply: {
                 showAdAttribution: true
               }
             }
           }
         }
       }
     }, {});
   } catch (error) {
     await sender.error(error + "\n\nCommand: feature", error, false);
   }
 });
 smd({
   cmdname: "character",
   category: "fun",
   use: "[@user]",
   filename: __filename,
   info: "Check character of replied USER!"
 }, async (message) => {
   const user = message.reply_message ? message.reply_message.sender : message.mentionedJid && message.mentionedJid[0] ? message.mentionedJid[0] : "";
   if (!user || !user.includes("@")) {
     return await message.reply("*Mention/reply user to check its character!*");
   }
   const characters = ["Sigma", "Generous", "Grumpy", "Overconfident", "Obedient", "Good", "Simple", "Kind", "Patient", "Pervert", "Cool", "Helpful", "Brilliant", "Sexy", "Hot", "Gorgeous", "Cute", "Fabulous", "Funny"];
   const character = characters[Math.floor(Math.random() * characters.length)];
   let response = "Character of @" + user.split("@")[0] + " is *" + character + "* 🔥⚡";
   message.send(response, {
     mentions: [user]
   }, "asta", message);
 });

 smd({
   cmdname: "poetry",
   type: "fun",
   info: "get random poetry lines"
 }, async (message) => {
   try {
     let response = await fetch("https://shizoapi.onrender.com/api/texts/shayari?apikey=shizo");
     let { result } = await response.json();
     message.reply(response && result ? result : "_Request Denied from Server!_");
   } catch (error) {
     await message.error(error + "\n\ncommand : poetry", error, false);
   }
 });

 smd({
   cmdname: "alexa",
   category: "ai",
   use: "[text]",
   filename: __filename,
   info: "chat with simsimi alexa ai!"
 }, async (message, userInput) => {
   try {
     if (!userInput) {
       return await message.reply("Hi *" + message.senderName + "*, do you want to talk?");
     }
     const requestPayload = {
       method: "POST",
       headers: {
         "Content-Type": "application/x-www-form-urlencoded"
       },
       body: "text=" + encodeURIComponent(userInput) + "&lc=en&key="
     };
     const response = await fetch("https://api.simsimi.vn/v2/simtalk", requestPayload);
     const data = await response.json();
     if (data.status === "200" && data.message) {
       message.reply(data.message);
     } else {
       message.reply("*No Response!*");
     }
   } catch (error) {
     await message.error(error + "\n\ncommand : alexa", error, false);
   }
 });

 smd({
   cmdname: "ping2",
   alias: ["botstatus", "statusbot", "p2"],
   type: "misc",
   info: "get bot status and system information"
 }, async (message) => {
   try {
     const memoryUsage = process.memoryUsage();
     const cpus = os.cpus().map(cpu => {
       cpu.total = Object.keys(cpu.times).reduce((total, time) => total + cpu.times[time], 0);
       return cpu;
     });
     const cpuStats = cpus.reduce((acc, cpu) => {
       acc.total += cpu.total;
       acc.speed += cpu.speed / cpus.length;
       acc.times.user += cpu.times.user;
       acc.times.nice += cpu.times.nice;
       acc.times.sys += cpu.times.sys;
       acc.times.idle += cpu.times.idle;
       acc.times.irq += cpu.times.irq;
       return acc;
     }, {
       speed: 0,
       total: 0,
       times: {
         user: 0,
         nice: 0,
         sys: 0,
         idle: 0,
         irq: 0
       }
     });

     let speedValue = speed();
     let speedDifference = speed() - speedValue;
     neww = performance.now();
     oldd = performance.now();
     const response = `
       Response Speed: ${speedDifference.toFixed(4)} seconds
       Runtime: ${runtime(process.uptime())}

       💻 Server Info:
       RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
       NodeJS Memory Usage:
       ${Object.keys(memoryUsage).map(key => key.padEnd(Math.max(...Object.keys(memoryUsage).map(k => k.length)), " ") + ": " + formatp(memoryUsage[key])).join("\n")}
       ${cpus[0] ? `Total CPU Usage: ${cpus[0].model.trim()} (${cpuStats.speed} MHz)
       ${Object.keys(cpuStats.times).map(key => `- ${key.padEnd(6)}: ${(cpuStats.times[key] * 100 / cpuStats.total).toFixed(2)}%`).join("\n")}` : ""}
     `;
     message.reply(response);
   } catch (error) {
     await message.error(error + "\n\ncommand : ping2", error, false);
   }
 });

 smd({
   cmdname: "myip",
   alias: ["ip"],
   type: "misc",
   info: "get bot's public IP address"
 }, async (message) => {
   try {
     let { data } = await axios.get("https://api.ipify.org/");
     message.send(data ? `*Bot's IP address is : _${data}_*` : "_No response from server!_");
   } catch (error) {
     await message.error(error + "\n\ncommand : myip", error, false);
   }
 });

 let ssweb = (url, device = "desktop") => {
   return new Promise((resolve, reject) => {
     const screenshotApiUrl = "https://www.screenshotmachine.com";
     const screenshotParams = {
       url,
       device,
       cacheLimit: 0
     };
     axios({
       url: screenshotApiUrl + "/capture.php",
       method: "POST",
       data: new URLSearchParams(Object.entries(screenshotParams)),
       headers: {
         "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
       }
     }).then(response => {
       const cookies = response.headers["set-cookie"];
       if (response.data.status == "success") {
         axios.get(screenshotApiUrl + "/" + response.data.link, {
           headers: {
             cookie: cookies.join("")
           },
           responseType: "arraybuffer"
         }).then(({ data }) => {
           resolve({
             status: 200,
             result: data
           });
         });
       } else {
         reject({
           status: 404,
           statuses: "Link Error",
           message: response.data
         });
       }
     }).catch(reject);
   });
 };
 smd({
   cmdname: "ss",
   type: "misc",
   info: "get random poetry lines"
}, async (message, args) => {
   try {
     let url = args.split(" ")[0].trim();
     if (!url) {
       return await message.reply("*Need URL! Use " + prefix + "ss https://github.com/Kermhack/KERM_MD-v2*");
     }
     let response = await ssweb(url);
     if (response && response.status == "200") {
       return await message.send(response.result, {
         caption: Config.caption
       }, "amdimg", message);
     } else {
       message.send("_No response from server!_");
     }
   } catch (error) {
     await message.error(error + "\n\ncommand : myip", error, "*Request Denied!*");
   }
});

let tmpUrl = "https://telegra.ph/file/28926e89d8ee962a92f32.jpg";
const secmailData = {};

smd({
   pattern: "tempmail",
   alias: ["tmpmail", "newmail", "tempemail"],
   info: "Create temporary email address, and use it according to your needs!",
   type: "misc"
}, async (message) => {
   try {
     if (!secmailData[message.sender]) {
       const tempMail = await tempmail.create();
       if (!tempMail || !tempMail[0]) {
         return await message.reply("*Request Denied!*");
       }
       const [login, domain] = tempMail[0].split("@");
       secmailData[message.sender] = {
         email: tempMail[0],
         login: login,
         domain: domain
       };
     }
     var hasImage = false;
     try {
       hasImage = await smdBuffer(tmpUrl);
     } catch (error) {}
     await message.reply(("*YOUR TEMPMAIL INFO*\n\n\n*EMAIL:* ➪ " + secmailData[message.sender].email + "\n*Login:* ➪ " + secmailData[message.sender].login + "\n*Domain:* ➪ " + secmailData[message.sender].domain + "\n\n\n*USE " + prefix + "checkmail to get latest emails!*\n*USE " + prefix + "delmail to delete current email!*\n\n" + Config.caption).trim(), {
       contextInfo: {
         ...(await message.bot.contextInfo("TEMPMAIL", message.senderName, hasImage))
       }
     }, "smd", message);
   } catch (error) {
     console.log(error);
     await message.reply("*Request Denied!*");
   }
});

smd({
   pattern: "checkmail",
   alias: ["readmail", "reademail"],
   type: "misc",
   info: "check mails in your temporary email address!"
}, async (message) => {
   try {
     const sender = message.sender;
     const tempMailInfo = secmailData[sender];
     if (!tempMailInfo || !tempMailInfo.email) {
       return await message.reply("*You haven't created a temporary email.*\n*Use " + prefix + "tempmail to create an email first!*");
     }
     const mails = await tempmail.mails(tempMailInfo.login, tempMailInfo.domain);
     if (!mails || !mails[0] || mails.length === 0) {
       return await message.reply("*EMPTY ➪ No mails received yet!* \n*Use " + prefix + "delmail to delete mail!*");
     }
     var hasImage = false;
     try {
       hasImage = await smdBuffer(tmpUrl);
     } catch (error) {}
     for (const mail of mails) {
       const mailContent = await tempmail.emailContent(tempMailInfo.login, tempMailInfo.domain, mail.id);
       console.log({ emailContent: mailContent });
       if (mailContent) {
         const mailDetails = "\n*From* ➪ " + mail.from + "\n*Date* ➪  " + mail.date + "\n*EMAIL ID* ➪  [" + mail.id + "]\n*Subject* ➪  " + mail.subject + "\n*Content* ➪  " + mailContent;
         await message.reply(mailDetails, {
           contextInfo: {
             ...(await message.bot.contextInfo("*EMAIL ➪ " + mail.id + "*", message.senderName, hasImage))
           }
         }, "smd", message);
       }
     }
   } catch (error) {
     console.log(error);
     await message.reply("*Request Denied!*");
   }
});

smd({
   pattern: "delmail",
   alias: ["deletemail", "deltemp", "deltmp"],
   type: "misc",
   info: "Delete temporary email address!"
}, async (message) => {
   try {
     const sender = message.sender;
     if (secmailData[sender]) {
       delete secmailData[sender];
       await message.reply("*Successfully deleted the email address.*");
     } else {
       await message.reply("*No email address to delete.*");
     }
   } catch (error) {
     console.log(error);
     await message.reply("*Request Denied!*");
   }
});

const tempmail = {};

tempmail.create = async () => {
   const apiUrl = "https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1";
   try {
     let response = await fetch(apiUrl);
     if (!response.ok) {
       throw new Error("HTTP error! status: " + response.status);
     }
     let data = await response.json();
     return data;
   } catch (error) {
     console.log(error);
     return null;
   }
};

tempmail.mails = async (login, domain) => {
   const apiUrl = "https://www.1secmail.com/api/v1/?action=getMessages&login=" + login + "&domain=" + domain;
   try {
     let response = await fetch(apiUrl);
     if (!response.ok) {
       throw new Error("HTTP error! status: " + response.status);
     }
     let data = await response.json();
     return data;
   } catch (error) {
     console.log(error);
     return null;
   }
};

tempmail.emailContent = async (login, domain, id) => {
   const apiUrl = "https://www.1secmail.com/api/v1/?action=readMessage&login=" + login + "&domain=" + domain + "&id=" + id;
   try {
     let response = await fetch(apiUrl);
     if (!response.ok) {
       throw new Error("HTTP error! status: " + response.status);
     }
     let data = await response.json();
     const htmlBody = data.htmlBody;
     console.log({ htmlContent: htmlBody });
     const $ = cheerio.load(htmlBody);
     const textContent = $.text();
     return textContent;
   } catch (error) {
     console.log(error);
     return null;
   }
};
