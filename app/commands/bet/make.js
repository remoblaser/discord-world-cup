const getManager = require('typeorm').getManager
const moment = require('moment')
const flag = require('../../flag')
const config = require('../../../config.json')


exports.run = async (client, message, args) => {
  var matchRepository = getManager().getRepository('Match')
  var match = await matchRepository.findOne(args[0])

  if(match === undefined) {
    message.reply('match ID not provided or not found. Make sure you\'re using a correct match ID.')
  }
  else if(moment(match.match_start, 'YYYY-MM-DD HH:mm:ss').subtract(2, 'hours').isBefore()) {
    message.reply('this match has already started and betting is closed.')
  }
  else {
    var reply = {
      title: flag(match.homeTeam) + " vs. " + flag(match.awayTeam),
      fields: [{
        name: "How to bet",
        value: "React with 👈 if you think the home team will win.\n React with 👉 if you think the away team will win. \n React with 👆 if you think it will be a draw."
      }],
      footer: {
        text: match.id
      }
    }
    var reply = await client.channels.get(message.channel.id).send({embed: reply});
    await reply.react("👈")
    await reply.react("👉")
    if(match.tie_possible) {
      await reply.react("👆")
    }
  }
}