//#ENJOY BRO😍
const fs = require("fs-extra");
if (fs.existsSync(".env"))
  require("dotenv").config({ path: __dirname + "/.env" });
global.audio = "";
global.video = "";
global.port = process.env.PORT;
global.appUrl = process.env.APP_URL || "";
global.email = "Kermd237@gmail.com";
global.location = "Douala, Cameroun";
global.mongodb = process.env.MONGODB_URL || "mongodb+srv://Rayan:<Emmanuel237>@cluster0.8twd0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
global.allowJids = process.env.ALLOW_JID || "null";
global.blockJids = process.env.BLOCK_JID || "null";
global.DATABASE_URL = process.env.DATABASE_URL || "";
global.timezone = process.env.TZ || process.env.TIME_ZONE || "Africa/Douala";
global.github = process.env.GITHUB || "https://github.com/Kgtech-cmr/KERM-XMD";
global.gurl = process.env.GURL || "https://whatsapp.com/channel/0029Vafn6hc7DAX3fzsKtn45";
global.website = process.env.GURL || "https://whatsapp.com/channel/0029Vafn6hc7DAX3fzsKtn45";
global.THUMB_IMAGE = process.env.THUMB_IMAGE || process.env.IMAGE || "https://files.catbox.moe/gqcoxn.jpeg";
global.devs = "https://wa.me/237650564445 , https://wa.me/237656520674";
global.sudo = process.env.SUDO || "237655273782";
global.owner = process.env.OWNER_NUMBER || "237691795883";
global.style = process.env.STYLE || "3";
global.gdbye = process.env.GOODBYE || "true";
global.wlcm = process.env.WELCOME || "true";
global.warncount = process.env.WARN_COUNT || 3;
global.disablepm = process.env.DISABLE_PM || "false";
global.disablegroup = process.env.DISABLE_GROUPS || "false",
global.MsgsInLog = process.env.MSGS_IN_LOG || "false";
global.userImages = process.env.USER_IMAGES || "https://files.catbox.moe/gqcoxn.jpeg";
global.waPresence = process.env.WAPRESENCE || "available";
global.readcmds = process.env.READ_COMMAND || "true";
global.readmessage = process.env.READ_MESSAGE || "false";
global.readmessagefrom = process.env.READ_MESSAGE_FROM || "";
global.read_status = process.env.AUTO_READ_STATUS || "true";
global.save_status = process.env.AUTO_SAVE_STATUS || "false";
global.save_status_from = process.env.SAVE_STATUS_FROM || "";
global.read_status_from = process.env.READ_STATUS_FROM || "";

global.api_smd = "https://api-smd-1.vercel.app";
global.scan = "https://kgtech-v2-session.onrender.com";

global.SESSION_ID =
  process.env.SESSION_ID ||
  "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0JidExqYzhjdzRZZWtST3lFYm5NM01kRzBxNUlwbFdEMVVxS0UwQUxIZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUjF0R0w2QWRvWllZM2RxVi94UUVEMHRpZUlUOUQzajRMTDFQSHpmalpVVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXQzl0bjdvbnpaRUdtdXlGVDFlVEgyc3FmN3JhR2dnWVFIZm5Jeng3Y21rPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6bDMrWllENmFZWHBzRS9YMDhBaVBzQ0lYMkV1UVYxelQ2U0FqK2Z1NkRZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVOckt1clNIdG8zS2hCemdvK2ZFcTlTbUtROTBrd1ZEUjA4Njl0QzE2V1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhEOTJpWGhxMENpS2pzRnJBWEFzNE1kN0tVYU0zbzZmRTd6VldjMmNveE09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUFTNDJOMGZtREJEcEJ6ZnpySnFRdVN1QXdVNVMxWjFFL05FS3lzRE1Hdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVDJjRlhwcVJWTzFLWVlkMkRLUlhkZ2w0eUZ2TjBpOW80NHNOSFBTYWltVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5LRkpZc01XaUs3ZzJCTUFpMXFaVmdBN3JCdEpkcnZ6UW5pa3ZnMjdndGZqa2JhU0hNbmdYTDRJbFZEbkYvTFQxMWkwcmljMy9OSEpIc3l5VXZIOUFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NCwiYWR2U2VjcmV0S2V5IjoiaUYzTUM1ZVRhbEJhSFhJN1VvOHI0ajl6ZEdvcVlMcDFBemViSHQ1aFpSYz0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoibDA2ZjY3cjdUZ3lUUklQZlpFdmpFdyIsInBob25lSWQiOiJiZjMwNGVlMi1iOWFhLTQzMDEtOTkyNy0zOTE5MmZmNzcyNDgiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOE1sVVdJeHJ1THR3eWJhd3JZTlg2V3VDWU13PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFXZDE0VXlWSHhBaUtSK3hFZmU1RlRab21Zaz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiI0OFFXN1JORiIsIm1lIjp7ImlkIjoiMjM3NjkxNzk1ODgzOjVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQWxhbmEifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09lTDUrMFBFS3ZpNDc4R0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjdsbEpWaXhwMkt2WXNHU0NyT1BBV2Q0WFdNYzAyRFhZb2ZLeUx5cHZzVkU9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjNha1JabWpMWTdRMDFVY0hWSjUwcXR6RW1PNnNVdVlpdjZESjRVVm82Zkx2R0lnT2FXVzRDMlU4TEhkU2EyOTd1VEwycnZDc0FKenY1QmJ5aEVuR0J3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJaNEhNM2ZEdGhLYmlIR0N0T09BMFpmZDFrUDRoUXNjSHZYQWNHQnJwc3p5ajBqaTVzQXlSdEVRbTZNZ1hwaG5USGJ2ZjIvYWtOcG15QnJIKzFqcVdCUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNzY5MTc5NTg4Mzo1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmU1WlNWWXNhZGlyMkxCa2dxemp3Rm5lRjFqSE5OZzEyS0h5c2k4cWI3RlIifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NDM2NzkyNywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFBQkwifQ=="
module.exports = {
  menu: process.env.MENU || "1",
  HANDLERS: process.env.PREFIX || ".",
  BRANCH: process.env.BRANCH || "main",
  VERSION: process.env.VERSION || "2.1.0",
  caption: process.env.CAPTION || "`BRAND PRODUCT OF ☞⌜ KG TECH⌝☜`",
  author: process.env.PACK_AUTHER || "卂ㄥ卂几卂❤️",
  packname: process.env.PACK_NAME || "卂ㄥ卂几卂❤️",
  botname: process.env.BOT_NAME || "卂ㄥ卂几卂❤️",
  ownername: process.env.OWNER_NAME || "卂ㄥ卂几卂❤️",
  errorChat: process.env.ERROR_CHAT || "",
  KOYEB_API: process.env.KOYEB_API || "false",
  REMOVE_BG_KEY: process.env.REMOVE_BG_KEY || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || "",
  antilink_values: process.env.ANTILINK_VALUES || "all",
  HEROKU: process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY,
  aitts_Voice_Id: process.env.AITTS_ID || "37",
  ELEVENLAB_API_KEY: process.env.ELEVENLAB_API_KEY || "...d336",
  WORKTYPE: process.env.WORKTYPE || process.env.MODE || "public",
  LANG: (process.env.THEME || "KERM").toUpperCase(),
};
global.rank = "updated";
global.isMongodb = false;
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(`Update'${__filename}'`);
  delete require.cache[file];
  require(file);
});
