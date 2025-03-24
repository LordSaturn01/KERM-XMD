const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const util = require('util');
const { cmd } = require("../lib/plugins");

// Supported media types including image, video, audio, document, and sticker (webp)
let mediaTypes = [
  "videoMessage",
  "imageMessage",
  "audioMessage",
  "documentMessage",
  "stickerMessage"
];

// Function to create a URL using the catbox.moe API
async function createUrl(filePath) {
  try {
    let formData = new FormData();
    formData.append('reqtype', 'fileupload');
    formData.append('fileToUpload', fs.createReadStream(filePath));
    
    // Call the catbox.moe API
    let response = await axios.post(
      'https://catbox.moe/user/api.php',
      formData,
      { headers: { ...formData.getHeaders() } }
    );
    
    let uploadedUrl = response.data.trim();
    if (!uploadedUrl.startsWith('http')) {
      throw new Error("Invalid response from catbox.moe API");
    }
    return uploadedUrl;
  } catch (error) {
    console.error("Error while creating URL:", error);
    return null;
  }
}

// Command to convert media (image, video, audio, document, sticker) to URL
cmd({
  pattern: "url",
  alias: ["tourl"],
  category: "converter",
  filename: __filename,
  desc: "Converts a media (image, video, audio, document, webp) into a URL.",
  react: "🔗"
}, async (message) => {
  try {
    // Determine if the current message is a media message or use the replied message
    let mediaMessage = mediaTypes.includes(message.mtype) ? message : message.reply_message;
    
    if (!mediaMessage || !mediaTypes.includes(mediaMessage?.mtype)) {
      return message.reply("*_Please reply with a media (image, video, audio, document or sticker)! _*");
    }

    // Download and save the media file temporarily
    let filePath = await message.bot.downloadAndSaveMediaMessage(mediaMessage);

    // Create a URL using the API
    let mediaUrl = await createUrl(filePath);

    if (!mediaUrl) {
      return message.reply("*_URL creation failed !_*");
    }

    // Attempt to delete the temporary file
    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      console.error("Error deleting temporary file:", error);
    }

    // Send the URL in the chat
    await message.send(util.format(mediaUrl), {}, "asta", mediaMessage);
  } catch (error) {
    await message.error(error + "\n\nURL command failed", error);
  }
});