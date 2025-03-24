const { cmd } = require("../lib/plugins");
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

cmd(
  {
    pattern: 'update',
    alias: ['sync'],
    react: '🔄',
    desc: 'Update the bot to the latest version.',
    category: 'tools',
    filename: __filename,
  },
  async (message, _0xf65f6b, _0x42b29f, { from: sender, reply, isOwner }) => {
    if (!isOwner) return message.reply('❌ This command is only for the bot owner.');

    try {
      await message.reply('```🔍 Checking for KERM-XMD updates...```');
      
      const { data } = await axios.get('https://api.github.com/repos/Kgtech-cmr/KERM-XMD/commits/main');
      const latestCommitHash = data.sha;
      let currentCommitHash = 'unknown';

      try {
        const packageData = require('../package.json');
        currentCommitHash = packageData.commitHash || 'unknown';
      } catch (error) {
        console.error('Error reading package.json:', error);
      }

      if (latestCommitHash === currentCommitHash) {
        return message.reply('```✅ Your KERM-XMD bot is already up-to-date!```');
      }

      await message.reply('```🚀 Updating the bot...```');
      const zipFilePath = path.join(__dirname, 'latest.zip');
      const { data: zipData } = await axios.get('https://github.com/Kgtech-cmr/KERM-XMD/archive/main.zip', { responseType: 'arraybuffer' });
      fs.writeFileSync(zipFilePath, zipData);

      await message.reply('```📦 Extracting the latest code...```');
      const extractDir = path.join(__dirname, 'latest');
      const zip = new AdmZip(zipFilePath);
      zip.extractAllTo(extractDir, true);

      await message.reply('```🔄 Replacing files...```');
      const extractedFolder = path.join(extractDir, 'KERM-XMD-main');
      const projectDir = path.join(__dirname, '..');
      copyFolderSync(extractedFolder, projectDir);
      fs.unlinkSync(zipFilePath);
      fs.rmSync(extractDir, { recursive: true, force: true });

      const packageFilePath = path.join(__dirname, 'package.json');
      const packageDataUpdated = require(packageFilePath);
      packageDataUpdated.commitHash = latestCommitHash;
      fs.writeFileSync(packageFilePath, JSON.stringify(packageDataUpdated, null, 2));

      await message.reply('```🔄 Restarting the bot to apply updates...```');
      process.exit(0);
    } catch (error) {
      console.error('Update error:', error);
      message.reply('❌ Update failed. Please try manually.');
    }
  }
);

function copyFolderSync(source, target) {
  if (!fs.existsSync(target)) fs.mkdirSync(target, { recursive: true });

  const files = fs.readdirSync(source);
  for (const file of files) {
    const sourceFile = path.join(source, file),
      targetFile = path.join(target, file);
    
    if (fs.lstatSync(sourceFile).isDirectory()) {
      copyFolderSync(sourceFile, targetFile);
    } else {
      fs.copyFileSync(sourceFile, targetFile);
    }
  }
}