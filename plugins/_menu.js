function hi() {
  console.log('Hello World!')
}
hi()

const os = require('os'),
  Config = require('../config')

let { fancytext, tiny, runtime, formatp, prefix } = require('../lib')

const long = String.fromCharCode(8206),
  readmore = long.repeat(4001),
  astro_patch = require('../lib/plugins')

// Generate a random trend usage value
const trend_usage = (() => {
  const getRandomValue = ((min, max) => {
    const random = () => Math.random(),
      floor = (num) => Math.floor(num),
      multiply = (a, b) => a * b,
      add = (a, b) => a + b,
      subtract = (a, b) => a - b,
      result = multiply(random(), subtract(max, min + 1)),
      finalValue = add(floor(result), min)
    return finalValue
  })(1, 99)
  return getRandomValue
})()

// Generate a random database info value
const database_info = (() => {
  const getRandomValue = ((min, max) => {
    const random = () => Math.random(),
      floor = (num) => Math.floor(num),
      multiply = (a, b) => a * b,
      add = (a, b) => a + b,
      subtract = (a, b) => a - b,
      result = multiply(random(), subtract(max, min + 1)),
      finalValue = add(floor(result), min)
    return finalValue
  })(1, 499)
  return getRandomValue
})()

astro_patch.smd(
  {
    cmdname: 'menu',
    desc: 'Help list',
    react: '👽',
    desc: 'To show all available commands.',
    type: 'user',
    filename: __filename,
  },
  async (message, args) => {
    try {
      const { commands } = require('../lib')

      if (args.split(' ')[0]) {
        let commandInfo = []
        const command = commands.find(
          (cmd) => cmd.pattern === args.split(' ')[0].toLowerCase()
        )

        if (command) {
          commandInfo.push(`*🔉Command:* ${command.pattern}`)
          if (command.category) commandInfo.push(`*💁Category:* ${command.category}`)
          if (command.alias?.[0]) commandInfo.push(`*💁Alias:* ${command.alias.join(', ')}`)
          if (command.desc) commandInfo.push(`*💁Description:* ${command.desc}`)
          if (command.use) commandInfo.push(`*〽️Usage:*\n\`\`\`${prefix}${command.pattern} ${command.use}\`\`\``)
          if (command.usage) commandInfo.push(`*〽️Usage:*\n\`\`\`${command.usage}\`\`\``)

          await message.reply(commandInfo.join('\n'))
        }
      }

      let header, separator, footer, categoryStart, categoryEnd, categorySymbol, endLine

      Config.menu === '' && (header = Math.floor(Math.random() * 4) + 1)

      if (
        header === 1 ||
        Config.menu.trim().startsWith('1') ||
        Config.menu.toLowerCase().includes('menu1')
      ) {
        header = '┏彡 *' + Config.botname + '* 彡'
        categorySymbol = '┃✰༅ ✗'
        separator = '┗━━━━━━━━━━━━〤'
        categoryStart = '┌「'
        categoryEnd = '」'
        endLine = ' |\u263B︎ '
        footer = '\n└━━━━━━━━━━━━〤'
      } else if (
        header === 2 ||
        Config.menu.trim().startsWith('2') ||
        Config.menu.toLowerCase().includes('menu2')
      ) {
        header = '┌═[ *' + Config.botname + '* ]'
        categorySymbol = '¤┃✰༅▷'
        separator = '╚═════════⋯⋯▷'
        categoryStart = '┌〈'
        categoryEnd = '〉'
        endLine = '¤┃✰༅▷ '
        footer = '\n┃Ꙭ✰༅╚════════⋯⋯▷▷'
      } else {
        header = '╭【 ' + Config.botname + ' 】'
        categorySymbol = '│ │'
        separator = '╰════════════════⊷'
        categoryStart = '╭─❏'
        categoryEnd = '❏'
        endLine = '│✰༅'
        footer = '╰════════════════⊷'
      }

      const categorizedCommands = {}
      commands.map(async (cmd) => {
        if (!cmd.dontAddCommandList && cmd.pattern !== undefined) {
          if (!categorizedCommands[cmd.category]) {
            categorizedCommands[cmd.category] = []
          }
          categorizedCommands[cmd.category].push(cmd.pattern)
        }
      })

      const currentTime = message.time,
        currentDate = message.date

      let menuMessage =
        `\n  ${header}\n  ${categorySymbol} *Owner:* ${Config.ownername}\n  ` +
        `${categorySymbol} *Uptime:* ${runtime(process.uptime())}\n  ` +
        `${categorySymbol} *RAM Usage:* ${formatp(os.totalmem() - os.freemem())}\n  ` +
        `${categorySymbol} *Time:* ${currentTime}\n  ` +
        `${categorySymbol} *Date:* ${currentDate}\n  ` +
        `${categorySymbol} *Commands:* ${commands.length}\n  ` +
        `${categorySymbol} *Usage Trend:* ${trend_usage}\n  ` +
        `${categorySymbol} *Database:* ${database_info}\n  ` +
        `${separator}\n                   𝒦ℯ𝓇𝓂-𝒳𝓂𝒹\n┃✰༅└─────────── ❉\n` +
        `|➡︎⭐ 2024 𝒦ℯ𝓇𝓂 & 𝒳𝓂𝒹✦\n└────────────── ❉\n  \n${readmore}\n`

      for (const category in categorizedCommands) {
        menuMessage += `${categoryStart} *${tiny(category)}* ${categoryEnd}\n`
        if (args.toLowerCase() === category.toLowerCase()) {
          menuMessage = `${categoryStart} *${tiny(category)}* ${categoryEnd}\n`
          for (const command of categorizedCommands[category]) {
            menuMessage += `${endLine} ${fancytext(command, 1)}\n`
          }
          menuMessage += `${footer}\n`
          break
        } else {
          for (const command of categorizedCommands[category]) {
            menuMessage += `${endLine} ${fancytext(command, 1)}\n`
          }
          menuMessage += `${footer}\n`
        }
      }

      menuMessage += Config.caption

      const messageContent = {
        caption: menuMessage,
        ephemeralExpiration: 3000,
      }

      return await message.sendUi(message.chat, messageContent, message)
    } catch (error) {
      await message.error(error + '\nCommand: menu', error)
    }
  }
)
