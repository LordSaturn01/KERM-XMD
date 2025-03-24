const util = require("util");
const fs = require("fs-extra");
const { cmd } = require("../lib/plugins");
const {
  formatp,
  TelegraPh,
  aitts,
  smd,
  prefix,
  runtime,
  Config,
  parsedJid,
  sleep,
  createUrl
} = require("../lib");
const axios = require("axios");
const fetch = require("node-fetch");
const os = require("os");
const speed = require("performance-now");

async function aiResponse(user, type, additionalData = "") {
  let response = "";
  try {
    if (type === "brainshop") {
      response = await (await axios.get(`http://api.brainshop.ai/get?bid=175685&key=Pg8Wu8mrDQjfr0uv&uid=[${user.sender.split("@")[0]}]&msg=[${additionalData}]`)).data.cnt;
    } else if (type === "openai") {
      const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Config.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: additionalData }
          ]
        })
      });
      const responseJson = await openaiResponse.json();
      if (!responseJson.choices || responseJson.choices.length === 0) {
        response = "*Invalid ChatGPT API Key, Please Put New Key*";
      } else {
        response = responseJson.choices[0].message.content;
      }
    } else if (type === "dalle") {
      const dalleResponse = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Config.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "image-alpha-001",
          prompt: additionalData,
          size: "512x512",
          response_format: "url"
        })
      });
      const responseJson = await dalleResponse.json();
      response = responseJson.data[0].url;
    } else if (type === "rmbg") {
      const removeBgResponse = await axios.post("https://api.remove.bg/v1.0/removebg", {
        image_url: additionalData,
        size: "auto"
      }, {
        headers: {
          "X-Api-Key": Config.REMOVE_BG_KEY
        },
        responseType: "arraybuffer"
      });
      response = Buffer.from(removeBgResponse.data, "binary");
    }
    return response;
  } catch (error) {
    console.log("Error in aiResponse:", error);
    return "Error While getting AI response";
  }
}
smd({
  pattern: "chat",
  desc: "chat with an AI",
  category: "ai",
  use: "<Hii, Sir>",
  filename: __filename
}, async (message, args) => {
  try {
    return message.reply(await aiResponse(message, "chat", args));
  } catch (error) {
    await message.error(error + "\n\ncommand: chat", error, "*_no response from chatbot, sorry🥺!!_*");
  }
});
smd({
  pattern: "gpt",
  desc: "chat with an AI",
  category: "ai",
  use: "<Hii, ☞⌜ KG TECH⌝☜>",
  filename: __filename,
  react: "📡"
}, async (message, args) => {
  try {
    try {
      let query = args ? args : bot.reply_text;
      if (!query) {
        return message.reply("Provide me a query ex Who is Kerm");
      }
      const response = await fetch("https://aemt.me/openai?text=" + query);
      const result = await response.json();
      if (result && result.status && result.result) {
        return await message.reply(result.result);
      }
    } catch (error) {}
    if (Config.OPENAI_API_KEY == "" || !Config.OPENAI_API_KEY || !("" + Config.OPENAI_API_KEY).startsWith("sk")) {
      return message.reply("```You Dont Have OPENAI API KEY \nPlease Create OPEN API KEY from Given Link \nhttps://platform.openai.com/account/api-keys\nAnd Set Key in Heroku OPENAI_API_KEY Var```");
    }
    if (!args) {
      return message.reply("Hey there! " + message.senderName + ". How are you doing these days?");
    }
    return message.send(await aiResponse(message, "gpt", args));
  } catch (error) {
    await message.error(error + "\n\ncommand: gpt", error, "*_no response from chatgpt, sorry!!_*");
  }
});
smd({
  pattern: "fgpt",
  desc: "chat with an AI",
  category: "ai",
  use: "<query>",
  filename: __filename
}, async (message, args) => {
  try {
    let query = args ? args : message.reply_text;
    if (!query) {
      return message.reply("Provide me a query ex Who is Kerm");
    }
    const response = await fetch("https://aemt.me/openai?text=" + query);
    const result = await response.json();
    if (result && result.status && result.result) {
      return await message.send(result.result);
    } else {
      await message.send("*_Error while getting GPT response!!_*");
    }
  } catch (error) {
    await message.error(error + "\n\ncommand: fgpt", error, "*_no response from chatgpt, sorry!!_*");
  }
});
smd({
  pattern: "dalle",
  alias: ["dall", "dall-e"],
  desc: "chat with an AI",
  category: "ai",
  use: "<Hii, Sir>",
  filename: __filename
}, async (message, args) => {
  try {
    if (!args) {
      return await message.reply("*Give me a query to get a DALL-E response?*");
    }
    const url = "https://gurugpt.cyclic.app/dalle?prompt=" + encodeURIComponent(args);
    try {
      return await message.bot.sendMessage(message.chat, {
        image: {
          url: url
        },
        caption: "[PROMPT]: ```" + args + " ```  \n " + Config.caption + " "
      });
    } catch (error) {
      console.log("ERROR IN DALL-E RESPONSE FROM API GURUGPT\n", error);
    }
    if (Config.OPENAI_API_KEY == "" || !Config.OPENAI_API_KEY || !("" + Config.OPENAI_API_KEY).startsWith("sk")) {
      return message.reply("```You don't have an OPENAI API key. Please create an OPEN API key from the following link: \nhttps://platform.openai.com/account/api-keys\nAnd set the key in Heroku OPENAI_API_KEY variable```");
    }
    return await message.bot.sendMessage(message.chat, {
      image: {
        url: await aiResponce(message, "dalle", args)
      },
      caption: "*---Your DALL-E Result---*\n" + Config.caption
    });
  } catch (error) {
    await message.error(error + "\n\ncommand: dalle", error, "*_No response from DALL-E AI, sorry!!_*");
  }
});
smd({
  pattern: "imagine",
  alias: ["imagin"],
  desc: "chat with an AI",
  category: "ai",
  use: "<boy walking on street>",
  filename: __filename
}, async (message, args) => {
  try {
    let query = args || message.reply_text;
    if (!query) {
      return await message.reply("*Give me a query to get an imagination?*");
    }
    let response = false;
    try {
      const apiResponse = await fetch("https://aemt.me/openai?text=" + (query + " \nNOTE: Make sure it looks like imagination, make it short and concise, and also in English!"));
      const apiData = await apiResponse.json();
      response = apiData && apiData.status && apiData.result ? apiData.result : "";
    } catch (error) {
      response = false;
    }
    try {
      await Draw(query || message.reply_text).then(imageUrl => {
        message.bot.sendMessage(message.chat, {
          image: imageUrl,
          caption: "*[IMAGINATION]:* ```" + query + " ```" + (response ? "\n\n*[RESPONSE]:* ```" + response + "``` \n" : "") + "  \n " + Config.caption + " "
        });
      });
      return;
    } catch (error) {
      console.log("ERROR IN IMAGINE RESPONSE FROM IMAGINE API\n", error);
    }
    if (Config.OPENAI_API_KEY == "" || !Config.OPENAI_API_KEY || !("" + Config.OPENAI_API_KEY).startsWith("sk")) {
      return message.reply("```You don't have an OPENAI API key. Please create an OPEN API key from the following link: \nhttps://platform.openai.com/account/api-keys\nAnd set the key in the Heroku OPENAI_API_KEY variable```");
    }
    return await message.bot.sendMessage(message.chat, {
      image: {
        url: await aiResponce(message, "dalle", query)
      },
      caption: "*---Your DALL-E Result---*\n" + Config.caption
    });
  } catch (error) {
    await message.error(error + "\n\ncommand: imagine", error, "*_No response from the server side, sorry!!_*");
  }
});
smd({
  pattern: "imagine2",
  alias: ["imagin2"],
  desc: "chat with an AI",
  category: "ai",
  use: "<boy walking on street>",
  filename: __filename
}, async (message, args) => {
  try {
    let query = args || message.reply_text;
    if (!query) {
      return await message.reply("*Give me a query to get an imagination?*");
    }
    const imageUrl = "https://gurugpt.cyclic.app/dalle?prompt=" + encodeURIComponent(query + " \nNOTE: Make sure it looks like imagination");
    let response = false;
    try {
      const apiResponse = await fetch("https://aemt.me/openai?text=" + (query + " \nNOTE: Make sure it looks like imagination, make it short and concise, and also in English!"));
      const apiData = await apiResponse.json();
      response = apiData && apiData.status && apiData.result ? apiData.result : "";
    } catch (error) {
      response = false;
    }
    try {
      return await message.bot.sendMessage(message.chat, {
        image: {
          url: imageUrl
        },
        caption: "*[IMAGINATION]:* ```" + query + " ```" + (response ? "\n\n*[RESPONSE]:* ```" + response + "``` \n" : "") + "  \n " + Config.caption + " "
      });
    } catch (error) {
      console.log("ERROR IN IMAGINE RESPONSE FROM API GURUGPT\n", error);
    }
    if (Config.OPENAI_API_KEY == "" || !Config.OPENAI_API_KEY || !("" + Config.OPENAI_API_KEY).startsWith("sk")) {
      return message.reply("```You don't have an OPENAI API key. Please create an OPEN API key from the following link: \nhttps://platform.openai.com/account/api-keys\nAnd set the key in the Heroku OPENAI_API_KEY variable```");
    }
    return await message.bot.sendMessage(message.chat, {
      image: {
        url: await aiResponce(message, "dalle", query)
      },
      caption: "*---Your DALL-E Result---*\n" + Config.caption
    });
  } catch (error) {
    await message.error(error + "\n\ncommand: imagine", error, "*_No response from the server side, sorry!!_*");
  }
});
async function Draw(query) {
  const response = await fetch("https://api-inference.huggingface.co/models/prompthero/openjourney-v2", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer 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"
    },
    body: JSON.stringify({
      inputs: query
    })
  }).then(res => res.blob());
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

smd({
  pattern: "rmbg",
  alias: ["removebg"],
  category: "ai",
  filename: __filename,
  desc: "Remove image Background."
}, async (message) => {
  try {
    if (!Config.REMOVE_BG_KEY) {
      return message.reply("```You don't have a REMOVE_BG_KEY. \nPlease create a RemoveBG key from the following link: \nhttps://www.remove.bg/\nAnd set the key in the REMOVE_BG_KEY variable```");
    }
    
    let validMessageTypes = ["imageMessage"];
    let messageToProcess = validMessageTypes.includes(message.mtype) ? message : message.reply_message;
    
    if (!messageToProcess || !validMessageTypes.includes(messageToProcess?.mtype || "null")) {
      return await message.send("*_Please reply to an image_*");
    }

    let imagePath = await message.bot.downloadAndSaveMediaMessage(messageToProcess);
    let imageUrl = await TelegraPh(imagePath);

    try {
      fs.unlinkSync(imagePath);
    } catch {}

    let result = await aiResponce(message, "rmbg", imageUrl);

    if (result) {
      await message.send(result, {
        caption: Config.caption
      }, "image", message);
    } else {
      await message.send("*_Request could not be processed!!_*");
    }
  } catch (error) {
    await message.error(error + "\n\ncommand: rmbg", error, "*_No response from remove.bg, sorry!!_*");
  }
});
smd({
  pattern: "readmore",
  alias: ["rmore", "readmor"],
  desc: "Adds *readmore* in given text.",
  category: "general",
  filename: __filename
}, async (message, replyText) => {
  try {
    let text = replyText ? replyText : message.reply_text;
    if (!text) {
      text = "*Uhh Dear, please provide text*\n*Eg:- _.readmor text1 readmore text2_*";
    } else {
      text += " ";
    }

    if (text.includes("readmore")) {
      await message.reply(text.replace(/readmore/, String.fromCharCode(8206).repeat(4001)));
    } else {
      await message.reply(text.replace(" ", String.fromCharCode(8206).repeat(4001)));
    }
  } catch (error) {
    await message.error(error + "\n\ncommand : readmore", error, false);
  }
});

smd({
  pattern: "calc",
  desc: "Calculate an equation.",
  category: "general",
  use: "<equation>",
  filename: __filename
}, async (message, equation) => {
  try {
    if (!equation) {
      return await message.reply("*Please enter a math operation*\n*Example: .calc 22+12*");
    }

    let sanitizedEquation = equation.replace(/\s+/g, "");
    if (!/^(\d+([-+%*/]\d+)+)$/.test(sanitizedEquation)) {
      return await message.reply("Please enter a valid mathematical operation.");
    }

    const calculate = (expression) => {
      return new Function("return " + expression)();
    };

    const result = calculate(sanitizedEquation);

    if (sanitizedEquation.includes("/") && sanitizedEquation.split("/").some(part => part === "0")) {
      return message.reply("Cannot divide by zero.");
    }

    if (sanitizedEquation.split(/[-+%*/]/).length <= 2) {
      const [firstNumber, operator, secondNumber] = sanitizedEquation.match(/\d+|[-+%*/]/g);
      return await message.reply(firstNumber + " " + operator + " " + secondNumber + " = " + result);
    } else {
      return await message.reply("Result: " + result);
    }
  } catch (error) {
    return await message.error(error + "\n\ncommand: calc", error);
  }
});

async function getDateTime() {
  const currentDate = new Date();
  const date = currentDate.toISOString().slice(0, 10);
  const time = currentDate.toLocaleTimeString();
  return {
    date: date,
    time: time
  };
}
smd({
  pattern: "repo",
  alias: ["git", "sc", "script", "kerm"],
  desc: "Sends info about repo",
  category: "general",
  react: "🤖",
  filename: __filename
}, async (message) => {
  try {
    let { data: githubData } = await axios.get("https://api.github.com/repos/Kgtech-cmr/KERM-XMD");
    let repoInfo = (
      "\n𝗞𝗘𝗥𝗠-𝗫𝗠𝗗 𝘈 𝘚𝘐𝘔𝘗𝘓𝘌 𝘞𝘏𝘈𝘛𝘚𝘈𝘗𝘗 𝘉𝘖𝘛 , 𝘔𝘈𝘋𝘌 𝘉𝘠 ☞⌜ KG TECH⌝☜ 𝘈𝘕𝘋 𝘋𝘌𝘗𝘓𝘖𝘠𝘌𝘋 𝘉𝘠 *" +
      Config.ownername +
      "*.\n\n  *❲❒❳ Stars:* " +
      (githubData?.stargazers_count || "120+") +
      " stars\n  *❲❒❳ Forks:* " +
      (githubData?.forks_count || "1000+") +
      " forks\n  *❲❒❳ Authors:* ☞⌜ KG TECH⌝☜\n  *❲❒❳ Created On:* " +
      (githubData?.created_at || "undefined") +
      "\n  *❲❒❳ Repo:* _https://github.com/Kgtech-cmr/KERM-XMD\n  *❲❒❳ Scan:* _" +
      scan +
      "_" +
      (Config.caption ? "\n\n" + Config.caption : "")
    ).trim();
    return await message.sendUi(message.jid, { caption: repoInfo });
  } catch (error) {
    await message.error(error + "\n\ncommand: repo", error);
  }
});

smd({
  pattern: "cpu",
  desc: "To check bot status",
  category: "general",
  filename: __filename
}, async (message) => {
  try {
    const memUsage = process.memoryUsage();
    const cpus = os.cpus().map(cpu => {
      cpu.total = Object.keys(cpu.times).reduce((total, time) => total + cpu.times[time], 0);
      return cpu;
    });
    const cpuStats = cpus.reduce((acc, cpu, index, { length: cpuCount }) => {
      acc.total += cpu.total;
      acc.speed += cpu.speed / cpuCount;
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
    let timestamp = speed();
    let latency = speed() - timestamp;
    let perfStart = performance.now();
    let perfEnd = performance.now();
    let responseText = (
      "*❲❒❳ " + Config.botname + " Server Info ❲❒❳*\n\n" +
      "  *❲❒❳ Runtime:* " + runtime(process.uptime()) + "\n" +
      "  *❲❒❳ Speed:* " + latency.toFixed(3) + "/" + (perfEnd - perfStart).toFixed(3) + " ms\n" +
      "  *❲❒❳ RAM:* " + formatp(os.totalmem() - os.freemem()) + " / " + formatp(os.totalmem()) + "\n\n" +
      "  *❲❒❳ Memory Usage:*\n      " +
      Object.keys(memUsage).map(key => key.padEnd(Math.max(...Object.keys(memUsage).map(k => k.length)), " ") + ": " + formatp(memUsage[key])).join("\n      ") +
      "\n\n" +
      (cpus[0] ? (
        "  *❲❒❳ Total CPU Usage:*\n" +
        "  *" + cpus[0].model.trim() + " (" + cpuStats.speed + " MHZ)*\n      " +
        Object.keys(cpuStats.times).map(key => "-" + (key + "").padEnd(6) + ": " + (cpuStats.times[key] * 100 / cpuStats.total).toFixed(2) + "%").join("\n      ") +
        "\n\n  *❲❒❳ CPU Core Usage (" + cpus.length + " Core CPU)*\n  " +
        cpus.map((cpu, i) => (
          "*Core " + (i + 1) + ": " + cpu.model.trim() + " (" + cpu.speed + " MHZ)*\n      " +
          Object.keys(cpu.times).map(timeKey => "-" + (timeKey + "").padEnd(6) + ": " + (cpu.times[timeKey] * 100 / cpu.total).toFixed(2) + "%").join("\n      ")
        )).join("\n\n")
      ) : "") +
      "\n"
    ).trim();
    return await message.send(responseText, {}, "", message);
  } catch (error) {
    await message.error(error + "\n\ncommand: cpu", error, "*_No response from Server side, Sorry!!_*");
  }
});
smd({
  pattern: "advt",
  alias: ["advertisement"],
  category: "ai",
  desc: "Advertise your message by sending it to the provided number range.",
  use: "23765652xxxx,Your_text_here",
  fromMe: true,
  filename: __filename
}, async (message, replyText) => {
  try {
    let messageText = replyText ? replyText : message.reply_text;
    if (!messageText) {
      return await message.reply("*Advertise your message*\n*by sending it to the provided number range.*\n" + prefix + "advt 234902786xx,Your_text_here");
    }
    const commaIndex = messageText.indexOf(",");
    if (commaIndex === -1) {
      return await message.send("*Invalid format. Please provide the number and message separated by a comma.*");
    }
    let numberRange = messageText.slice(0, commaIndex).trim();
    let textMessage = messageText.slice(commaIndex + 1).trim() + "\n\n\n" + Config.caption;
    if (!numberRange.includes("x")) {
      return message.send("*You did not add x in the number.*\n*Ex: " + prefix + "advt 23765652067xx,Your_Message_here*  \n " + Config.caption);
    }
    await message.send("*Sending message to the given number range!*\n*It may take some time, so please wait*");
    
    function countOccurrences(str, char) {
      return str.split(char).length - 1;
    }

    let baseNumber = numberRange.split("x")[0];
    let suffix = numberRange.split("x")[countOccurrences(numberRange, "x")] || "";
    let xCount = countOccurrences(numberRange, "x");
    let rangeLimit;

    if (xCount === 1) {
      rangeLimit = 10;
    } else if (xCount === 2) {
      rangeLimit = 100;
    } else if (xCount === 3) {
      rangeLimit = 1000;
    } else if (xCount > 3) {
      return await message.send("*Only 3(x) are allowed in the number*");
    }

    let sentCount = 0;
    let processedNumbers = "";
    for (let i = 0; i < rangeLimit; i++) {
      var contact = await message.bot.onWhatsApp("" + baseNumber + i + suffix + "@s.whatsapp.net");
      if (contact[0]) {
        let contactJid = contact[0].jid;
        if (processedNumbers.includes(contactJid)) {
          continue;
        }
        await sleep(1500);
        await message.bot.sendMessage(contactJid, {
          text: textMessage
        });
        processedNumbers += "," + contactJid;
        sentCount += 1;
      }
    }
    return await message.send("*_Advertisement of your message is done,_* \n\n*_Message successfully sent to " + sentCount + " chats_*\nLast_User: " + processedNumbers.split("@")[0] + "\nSearch_No: " + rangeLimit + " number(s) searched\n\n\n" + Config.caption);
  } catch (error) {
    await message.error(error + "\n\ncommand: advt", error, "*_No response from server side, sorry!_*");
  }
});

const astro_patch_AnonyMsg = {};
let isAnnonyMsgAlive = "";
let cmdName = "rcg";

class AnonymousMsg {
  constructor() {
    this.id = "";
    this.sender = "";
    this.reciever = "";
    this.senderMsg = "";
    this.tellinfo = 0;
    this.howmanyreply = 0;
  }
}
smd({
  pattern: "anonymsg",
  alias: ["recognition", "anonychat"],
  desc: "Send message anonymously",
  category: "ai",
  use: "<Hii, Astropeda>",
  filename: __filename
}, async (message, replyText, { smd }) => {
  try {
    let messageContent = replyText ? replyText : message.reply_text;
    if (!messageContent) {
      return await message.send("*Please provide a number and message to send anonymously.* \n*Example " + (prefix + smd) + " 237656520674,your_Message*", {}, "", message);
    }
    if (message.isCreator && messageContent === "info") {
      return await message.reply(isAnnonyMsgAlive == "" ? "*No Anonymous Chats have been created yet*" : "*Anonymous Chat Recipients*\n_" + isAnnonyMsgAlive + "_");
    }
    const commaIndex = messageContent.indexOf(",");
    if (commaIndex === -1) {
      return await message.reply("*Invalid format. Please provide both number and message separated by a comma.*");
    }
    let recipientJid = messageContent.slice(0, commaIndex).trim() + "@s.whatsapp.net";
    let textMessage = messageContent.slice(commaIndex + 1).trim();
    let recipient = (await parsedJid(recipientJid)) || [];
    if (recipient[0]) {
      const { date, time } = await getDateTime();
      const messageId = "anony-msg-" + Math.floor(100000 + Math.random() * 900000);
      astro_patch_AnonyMsg[messageId] = new AnonymousMsg();
      let anonymousMessage = astro_patch_AnonyMsg[messageId];
      anonymousMessage.id = messageId;
      anonymousMessage.sender = message.sender;
      anonymousMessage.reciever = recipient[0];
      anonymousMessage.msgStatus = true;
      anonymousMessage.senderMsg = message;
      textMessage = "*KERM_MD-V2 • Anonymous Msg*\n\n*Msg_Id:* " + anonymousMessage.id + "\n*Date:* _" + date + "_\n*Time:* _" + time + "_\n\n*Message:* " + textMessage + "\n\n\n" + Config.caption;
      isAnnonyMsgAlive = isAnnonyMsgAlive + "," + anonymousMessage.reciever;
      await message.bot.sendMessage(anonymousMessage.reciever, {
        text: textMessage
      });
      return await message.reply("*_Anonymous message sent successfully_*");
    } else {
      return await message.reply("*_The provided number is not valid!!!_*");
    }
  } catch (error) {
    await message.error(error + "\n\ncommand: " + smd, error, "*_Can't send anonymous message yet, Sorry!!_*");
  }
});

smd({
  on: "text"
}, async (message) => {
  try {
    if (message.quoted && isAnnonyMsgAlive.includes(message.sender) && message.text.length > 2) {
      const messageContent = message.reply_text.split("\n");
      if (messageContent.length < 3) {
        return;
      }
      if (message.reply_text.includes("KERM-XMD • Anonymous Msg") && messageContent[0].includes("QUEEN_ANITA-V2 • Anonymous Msg") && messageContent[2].includes("Msg_Id")) {
        let messageId = "" + messageContent[2].replace("*Msg_Id:* ", "").trim();
        let anonymousMessage = astro_patch_AnonyMsg[messageId];
        if (!anonymousMessage) {
          return;
        }
        try {
          if (anonymousMessage) {
            let replyContent = message.text.split(",")[0].trim();
            if (replyContent.toLowerCase().startsWith("reply")) {
              anonymousMessage.howmanyreply += 1;
              const messageIndex = message.text.indexOf(",");
              let responseMessage = "*KERM-XMD • Your Anonymous Msg Reply*\n\n*_From @" + anonymousMessage.reciever.split("@")[0] + "_*\n*_Msg_Id: " + anonymousMessage.id + "_*\n\n*Message:* " + message.text.slice(messageIndex + 1).trim() + "\n\n\n\n" + Config.caption;
              if (anonymousMessage.howmanyreply >= 2) {
                isAnnonyMsgAlive = isAnnonyMsgAlive.replace("," + message.sender, "");
              }
              await message.bot.sendMessage(anonymousMessage.sender, {
                text: responseMessage,
                mentions: [anonymousMessage.reciever]
              }, {
                quoted: anonymousMessage.senderMsg
              });
              if (anonymousMessage.howmanyreply >= 2) {
                isAnnonyMsgAlive = isAnnonyMsgAlive.replace("," + message.sender, "");
                delete astro_patch_AnonyMsg[messageId];
              }
              return await message.reply("*_Your message has been successfully delivered to the user_* " + (anonymousMessage.howmanyreply == 1 ? "\n*You can reply one more time*" : "") + " ");
            } else if (anonymousMessage.tellinfo === 0) {
              anonymousMessage.tellinfo = 1;
              let infoMessage = "*This is an Anonymous Message*\n\n_Msg_Id: " + anonymousMessage.id + "_\n_This message was sent by a chatbot_\n_The user does not wish to expose themselves to send this message_\n\n\n*If you want to reply to this user,*\n*Reply to this message with:* reply, Type_your_Message_Here\n*Example:* reply, Can you text me from your number\n\n\n" + Config.caption;
              message.bot.sendMessage(anonymousMessage.reciever, {
                text: infoMessage
              }, {
                quoted: message
              });
            } else if (anonymousMessage.tellinfo === 1) {
              anonymousMessage.tellinfo = 2;
              message.reply("*Please follow the format to reply to the message*\n*Type like: _reply, Type_your_Message_Here_*");
            }
          }
        } catch (error) {
          console.log("Error: ", error);
        }
      }
    }
  } catch {}
});
smd({
  pattern: "aitts",
  desc: "Text to Voice Using Eleven Lab Ai",
  category: "ai",
  use: "<Hii, Astropeda>",
  filename: __filename
}, async (message, replyText) => {
  await aitts(message, replyText || message.reply_text);
});
