const moment = require("moment-timezone");
const Config = require("../config");
let { smd, prefix, updateProfilePicture, parsedJid } = require("../lib");
const { cmd } = require("../lib/plugins");

let messageTypes = ["imageMessage"];

smd(
  {
    pattern: "pp",
    desc: "Set profile picture",
    category: "whatsapp",
    use: "<reply to image>",
    fromMe: true,
    filename: __filename,
  },
  async (message) => {
    try {
      let mediaMessage = messageTypes.includes(message.mtype)
        ? message
        : message.reply_message;

      if (!mediaMessage || !messageTypes.includes(mediaMessage?.mtype || "need_Media")) {
        return await message.reply("*Reply to an image, dear*");
      }

      return await updateProfilePicture(
        message,
        message.user,
        mediaMessage,
        "pp"
      );
    } catch (error) {
      await message.error(error + "\n\ncommand : pp", error);
    }
  }
);

smd(
  {
    pattern: "fullpp",
    desc: "Set full screen profile picture",
    category: "whatsapp",
    use: "<reply to image>",
    fromMe: true,
    filename: __filename,
  },
  async (message) => {
    try {
      let mediaMessage = messageTypes.includes(message.mtype)
        ? message
        : message.reply_message;

      if (!mediaMessage || !messageTypes.includes(mediaMessage?.mtype || "need_Media")) {
        return await message.reply("*Reply to an image, dear*");
      }

      return await updateProfilePicture(
        message,
        message.user,
        mediaMessage,
        "fullpp"
      );
    } catch (error) {
      await message.error(error + "\n\ncommand : fullpp", error);
    }
  }
);
smd(
  {
    pattern: "rpp",
    desc: "Remove profile picture",
    category: "whatsapp",
    use: "<chat>",
    fromMe: true,
    filename: __filename,
  },
  async (message) => {
    try {
      await message.removepp();
      message.send("*_Profile picture removed successfully!_*");
    } catch (error) {
      await message.error(error + "\n\ncommand : rpp", error);
    }
  }
);

smd(
  {
    pattern: "bio",
    desc: "Update profile status of WhatsApp",
    category: "whatsapp",
    use: "<text>",
    fromMe: true,
    filename: __filename,
  },
  async (message, text) => {
    try {
      if (!text) {
        return await message.send(
          "*_Provide text to update profile status!_*\n*_Example: " +
            prefix +
            "bio Kerm Md_*"
        );
      }
      await message.bot.updateProfileStatus(text);
      message.send("*Profile status updated successfully!*");
    } catch (error) {
      await message.error(error + "\n\ncommand : bio", error);
    }
  }
);

cmd(
  {
    pattern: "ptv",
    desc: "Send ptv (Video) message",
    category: "whatsapp",
    filename: __filename,
  },
  async (message, replyMessage, { cmdName }) => {
    try {
      if (!message.quoted) {
        return await message.send("*Uhh, please, reply to a video*");
      }
      let messageType = message.quoted.mtype;
      if (messageType !== "videoMessage") {
        return await message.send("*Uhh, dear, reply to a video message*");
      }
      return await message.bot.forwardOrBroadCast(
        message.chat,
        message.quoted,
        {},
        "ptv"
      );
    } catch (error) {
      await message.error(error + "\n\ncommand : ptv", error);
    }
  }
);

cmd(
  {
    pattern: "quoted",
    desc: "Get reply message from replied message",
    category: "user",
    filename: __filename,
  },
  async (message) => {
    try {
      if (!message.quoted) {
        return await message.send("*_Uhh Dear, Reply to a Message_*");
      }
      let quotedMessage = await message.bot.serializeM(
        await message.getQuotedObj()
      );
      if (!quotedMessage || !quotedMessage.quoted) {
        return await message.reply(
          "*Message you replied to does not contain a reply message*"
        );
      }
      try {
        await message.react("✨", message);
        return await message.bot.copyNForward(
          message.chat,
          quotedMessage.quoted,
          false
        );
      } catch (error) {
        await message.bot.forward(
          message.chat,
          quotedMessage.quoted,
          {},
          message
        );
        console.log(error);
      }
    } catch (error) {
      await message.error(error + "\n\ncommand : quoted", error);
    }
  }
);

cmd(
  {
    pattern: "blocklist",
    desc: "Get list of all blocked numbers",
    category: "whatsapp",
    fromMe: true,
    filename: __filename,
    use: "<text>",
  },
  async (message) => {
    try {
      const blocklist = await message.bot.fetchBlocklist();
      if (blocklist.length === 0) {
        return await message.reply(
          "Uhh Dear, You don't have any blocked numbers."
        );
      }
      let blocklistMessage =
        "\n*≡ List*\n\n*_Total Users:* " +
        blocklist.length +
        "_\n\n┌─⊷ \t*BLOCKED USERS*\n";
      for (let i = 0; i < blocklist.length; i++) {
        blocklistMessage +=
          "▢ " +
          (i + 1) +
          ":- wa.me/" +
          blocklist[i].split("@")[0] +
          "\n";
      }
      blocklistMessage += "└───────────";
      return await message.bot.sendMessage(message.chat, {
        text: blocklistMessage,
      });
    } catch (error) {
      await message.error(error + "\n\ncommand : blocklist", error);
    }
  }
);

cmd(
  {
    pattern: "location",
    desc: "Send location based on given coordinates",
    category: "whatsapp",
    filename: __filename,
  },
  async (message, coordinates) => {
    try {
      if (!coordinates) {
        return await message.reply(
          "*Give coordinates to send location!*\n *Ex: " +
            prefix +
            "location 24.121231,55.1121221*"
        );
      }
      let latitude = parseFloat(coordinates.split(",")[0]) || "";
      let longitude = parseFloat(coordinates.split(",")[1]) || "";
      if (!latitude || isNaN(latitude) || !longitude || isNaN(longitude)) {
        return await message.reply(
          "*_Coordinates not in correct format, try again_*"
        );
      }
      await message.reply(
        "*----------LOCATION------------*\n```Sending location of given data:\n Latitude: " +
          latitude +
          "\n Longitude: " +
          longitude +
          "```\n\n" +
          Config.caption
      );
      return await message.sendMessage(
        message.jid,
        {
          location: {
            degreesLatitude: latitude,
            degreesLongitude: longitude,
          },
        },
        {
          quoted: message,
        }
      );
    } catch (error) {
      await message.error(error + "\n\ncommand : location", error);
    }
  }
);
smd(
  {
    pattern: "listpc",
    category: "whatsapp",
    desc: "Finds info about personal chats",
    filename: __filename,
  },
  async (message, _, { store }) => {
    try {
      message.react("🫡");
      let personalChats = await store.chats
        .all()
        .filter(chat => chat.id.endsWith(".net"))
        .map(chat => chat);
      let resultMessage =
        " 「  " + Config.botname + "'s pm user list  」\n\nTotal " +
        personalChats.length +
        " users are texting in personal chat.";
      for (let chat of personalChats) {
        resultMessage +=
          "\n\nUser: @" +
          chat.id.split("@")[0] +
          "\nMessages: " +
          chat.unreadCount +
          "\nLast chat: " +
          moment(chat.conversationTimestamp * 1000)
            .tz(timezone)
            .format("DD/MM/YYYY HH:mm:ss");
      }
      message.bot.sendTextWithMentions(message.chat, resultMessage, message);
    } catch (error) {
      return await message.error(
        error + "\n\n command: listpc",
        error,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);

smd(
  {
    pattern: "listgc",
    category: "whatsapp",
    desc: "Finds info about all active groups",
    filename: __filename,
  },
  async (message, _, { store, Void }) => {
    try {
      message.react("🫡");
      let activeGroups = await store.chats
        .all()
        .filter(chat => chat.id.endsWith("@g.us"))
        .map(group => group);
      let resultMessage =
        " 「  " + Config.botname + "'s group user list  」\n\nTotal " +
        activeGroups.length +
        " active Groups found!";
      for (let group of activeGroups) {
        let groupMetadata = await Void.groupMetadata(group.id);
        resultMessage +=
          "\n\nName: " +
          groupMetadata.subject +
          " " +
          (groupMetadata.owner
            ? "\nOwner: @" + groupMetadata.owner.split("@")[0]
            : "") +
          "\nID: " +
          group.id +
          "\nCreated: " +
          (groupMetadata.creation
            ? moment(groupMetadata.creation * 1000)
                .tz("Asia/Kolkata")
                .format("DD/MM/YYYY HH:mm:ss")
            : groupMetadata.creation) +
          "\nMembers: " +
          (groupMetadata.participants.length || 0) +
          "\n\nMessages: " +
          group.unreadCount +
          "\nLast chat: " +
          moment(group.conversationTimestamp * 1000)
            .tz(timezone)
            .format("DD/MM/YYYY HH:mm:ss");
      }
      message.send(resultMessage, {}, "asta", message);
    } catch (error) {
      return await message.error(
        error + "\n\n command: listgc",
        error,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);

cmd(
  {
    pattern: "vcard",
    desc: "Create Contact by given name.",
    category: "whatsapp",
    filename: __filename,
  },
  async (message, name) => {
    try {
      if (!message.quoted) {
        return message.reply("*Please Reply to User With Name*");
      }
      if (!name) {
        return message.reply(
          "Please Give Me User Name, \n *Example: " +
            prefix +
            "vcard Kg Tech Info* "
        );
      }
      var nameParts = name.split(" ");
      if (nameParts.length > 3) {
        name = nameParts.slice(0, 3).join(" ");
      }
      const vcard =
        "BEGIN:VCARD\nVERSION:3.0\nFN:" +
        name +
        "\nORG:;\nTEL;type=CELL;type=VOICE;waid=" +
        message.quoted.sender.split("@")[0] +
        ":+" +
        owner[0] +
        "\nEND:VCARD";
      let contactMessage = {
        contacts: {
          displayName: name,
          contacts: [
            {
              vcard: vcard,
            },
          ],
        },
      };
      return await message.bot.sendMessage(message.chat, contactMessage, {
        quoted: message,
      });
    } catch (error) {
      await message.error(error + "\n\ncommand : vcard", error);
    }
  }
);

smd(
  {
    cmdname: "block",
    info: "blocks a person",
    fromMe: true,
    type: "whatsapp",
    filename: __filename,
    use: "<quote/reply user.>",
  },
  async (message) => {
    try {
      let userJid = message.reply_message
        ? message.reply_message.sender
        : !message.isGroup
        ? message.from
        : message.mentionedJid[0]
        ? message.mentionedJid[0]
        : "";
      if (!userJid || !userJid.includes("@s.whatsapp.net")) {
        return await message.reply("*Uhh dear, reply/mention a user*");
      }
      if (message.checkBot(userJid)) {
        return await message.reply("*Huh, I can't block my Creator Kg Tech idiot😑!!*");
      }
      await message.bot
        .updateBlockStatus(userJid, "block")
        .then(() => {
          message.react("🔒", message);
        })
        .catch(() => message.reply("*_Can't block user, Sorry!!_*"));
    } catch (error) {
      await message.error(error + "\n\ncommand: block", error, false);
    }
  }
);
smd(
  {
    cmdname: "unblock",
    info: "Unblocks a user.",
    type: "whatsapp",
    fromMe: true,
    filename: __filename,
  },
  async (message) => {
    try {
      let userJid =
        message.reply_message
          ? message.reply_message.sender
          : !message.isGroup
          ? message.from
          : message.mentionedJid[0]
          ? message.mentionedJid[0]
          : "";
      if (!userJid || !userJid.includes("@s.whatsapp.net")) {
        return await message.reply("*Uhh dear, reply/mention a user*");
      }
      await message.bot
        .updateBlockStatus(userJid, "unblock")
        .then(() =>
          message.send(
            "*@" + userJid.split("@")[0] + " Unblocked Successfully..!*",
            {
              mentions: [userJid],
            }
          )
        )
        .catch(() =>
          message.reply("*_Can't unblock user, Make sure the user is blocked!!_*")
        );
    } catch (error) {
      await message.error(error + "\n\ncommand: unblock", error);
    }
  }
);

cmd(
  {
    pattern: "vv",
    alias: ["viewonce", "retrieve"],
    desc: "download viewOnce Message.",
    category: "whatsapp",
    use: "<query>",
    react: "💾",
    filename: __filename,
  },
  async (message, query) => {
    try {
      let viewOnceMessage = false;
      if (message.reply_message) {
        if (
          message.reply_message.viewOnce ||
          (message.device === "ios" &&
            /audioMessage|videoMessage|imageMessage/g.test(
              message.reply_message.mtype
            ))
        ) {
          viewOnceMessage = message.reply_message;
        }
      }
      viewOnceMessage.mtype = viewOnceMessage.mtype2;
      if (!viewOnceMessage) {
        return message.reply("```Please reply to a ViewOnce message```");
      }
      let messageKey = {
        key: viewOnceMessage.key,
        message: {
          conversation: "```[VIEWONCE FOUND DOWNLOAD 100%]```",
        },
      };
      let mediaFile = await message.bot.downloadAndSaveMediaMessage(
        viewOnceMessage.msg
      );
      await message.bot.sendMessage(
        message.jid,
        {
          [viewOnceMessage.mtype2.split("Mess")[0]]: {
            url: mediaFile,
          },
          caption: viewOnceMessage.body,
        },
        {
          quoted: messageKey,
        }
      );
    } catch (error) {
      await message.error(error + "\n\ncommand: vv", error);
    }
  }
);
