const Discord = require('discord.js')
const config = require("./config.json")
const database = require('./app/database')

const client = new Discord.Client()

database.connect()

client.on("message", message => {
  if (message.author.bot) return
  if(message.content.indexOf(config.prefix) !== 0) return

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase().replace('-', '/')
  

  try {
    let commandFile = require(`./app/commands/${command}.js`)
    commandFile.run(client, message, args)
  } catch (err) {
    console.error(err)
  }
});

client.on('messageReactionAdd', (reaction, user) => {
  if(reaction.message.embeds.length === 0) return
  if(user.bot) return
  let dobet = require(`./app/commands/bet/save.js`)
  dobet.run(client, reaction, user)
});

client.login(config.token)