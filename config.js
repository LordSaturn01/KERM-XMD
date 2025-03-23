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
global.sudo = process.env.SUDO || "4915562378343";
global.owner = process.env.OWNER_NUMBER || "4915563151347";
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
  "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUtwTXM0OGtNUVJjZGdGellwWWdtOGJ4MDhIb2Q1YlhkWk9tdUljNWtYQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidU15NEl3dVUyS0c1aUxiRkdBOEZFV3FjRVlXNUZ4NWY4cUVhd0hWV016TT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzQ1hIVG45TGJlL29PMFpiMHJJQ1Z6OUJWUDJPWnBseEVrK2NNRnpDa2w4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYWmFVVFdScjlSc1lKTWFKaVRFOXVETzJNZXBtV1J4emhKM253b3o1Vmo0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9IelJ0ejJhNkVQNG0vUE1peWU0YzFRbnlnaGk1aVg0Q3E4Umw4bXZIVXM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkkrckRpMHFoTllwY2dwbXBCbFFRa0p4NUU5dHBvb3JOSWJCVlMrSlY0aFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEs3d1dBYVVldy9tbUVRNlY0MnlwcElWMk1mWEFLMi9LdjBXU0hONWQxWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmhuaDRrL1dlMFpzV3hHTG93bnROa21MYWxCVGtlR2NDVUlGQW8ySEFWST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdBTTh4OFErbTRwcENmTHorT3hmcE90RlVUMzdNZW9SYk9VZFRmaXk1c0JFNjh6R1U5RGZJVlhOWGRGc2o5SkdlMVcwQWs5eCtWSU50QUJZekZoamlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYwLCJhZHZTZWNyZXRLZXkiOiJMWE1McFV5dXR5cGJaOEVDWTRWL01DSFFybDBUSW9pOHkxaUNYa0dhZU9VPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjQ5MTU1NjIzNzgzNDNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQTZGNDQ5NkY0MzgxRTU3RDhCRDAwNkYxNEU5NzA2M0QifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0Mjc2NzA4NX0seyJrZXkiOnsicmVtb3RlSmlkIjoiNDkxNTU2MjM3ODM0M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJGQ0YxRDAyRkNFQjZCMTRENTdEMDNCMEQ3NDBCMTVDOCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQyNzY3MDg1fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJUUTh3VFVfUlF5V1JPdmFMTXVvYXVnIiwicGhvbmVJZCI6Ijk5YmFjOGI5LTg4ZWMtNGE3NC04NzFmLWJhYTNkYTViY2Y2NiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBYzRxOEVzWklFS0x2bnRDcHM1dDFQVFgxYjQ9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV292MytOT3RwNEkvdEllaGthbHFUNUxLb3hFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlE4UTZaVzhNIiwibWUiOnsiaWQiOiI0OTE1NTYyMzc4MzQzOjI4QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkJMQUNLU0tZLU1EIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQUFB5UzBRM29lQ3Z3WVlBU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI3MlYxMWxJWnZhbEp2RjI2MmJNWHczNG5LZ1JOOUtvM0NPZ3crNEg0ZVJzPSIsImFjY291bnRTaWduYXR1cmUiOiIvc1BxMEFWUHZIaVVuajFZdnd3aCt6MkNtK2lSb1VnbWExcjJ1OWtDcmxIK0Rub0JYSmdNR2N4WXo3ZjFXZXlUZ2hmZkRkYlJVWTl4QjUxU3hGS29DUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiSmtLRldqUDJXaUZBVzV6bzdjZ3ZyZjhTdnFRdzl5YmNEWFdSSWdSY1hjRElpUU9Yamgxci9VQStlZWkxR3ZTb3F6WU5TMW5nZ0dXTzZrZVh4eWFGakE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI0OTE1NTYyMzc4MzQzOjI4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmU5bGRkWlNHYjJwU2J4ZHV0bXpGOE4rSnlvRVRmU3FOd2pvTVB1QitIa2IifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDI3NjcwODMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSWpzIn0="
module.exports = {
  menu: process.env.MENU || "1",
  HANDLERS: process.env.PREFIX || ".",
  BRANCH: process.env.BRANCH || "main",
  VERSION: process.env.VERSION || "2.1.0",
  caption: process.env.CAPTION || "`BRAND PRODUCT OF ☞⌜ KG TECH⌝☜`",
  author: process.env.PACK_AUTHER || "KG TECH",
  packname: process.env.PACK_NAME || "𝔹𝕃𝔸ℂ𝕂𝕊𝕂𝕐-𝕄𝔻",
  botname: process.env.BOT_NAME || "𝔹𝕃𝔸ℂ𝕂𝕊𝕂𝕐-𝕄𝔻",
  ownername: process.env.OWNER_NAME || "☞⌜Martin⌝☜",
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
