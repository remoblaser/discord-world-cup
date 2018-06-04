const getManager = require('typeorm').getManager
const moment = require('moment')
const config = require('../../../config.json')

exports.run = async (client, reaction, discordUser) => {
  var userRepository = getManager().getRepository('User')
  var matchRepository = getManager().getRepository('Match')
  var user = await userRepository.findOne({discord: discordUser.id})

  if(user === undefined) {
    user = await createUser(discordUser.id)
  }

  var match = await matchRepository.findOne(reaction.message.footer)
  if(moment(match.match_start, 'YYYY-MM-DD HH:mm:ss').subtract(2, 'hours').isBefore()) {
    message.reply('this match has already started and betting is closed.')
  }
  var bet = await createBet(reaction, user, match)
  client.channels.get(config.channel).send(bet);
}


async function createUser(discordId) {
  var userRepository = getManager().getRepository('User')
  var user = {
    discord: discordId
  }
  return await userRepository.save(user)
}

async function createBet(reaction, user, match) {
  var tip = getTip(reaction)
  var betRepository = getManager().getRepository('Bet')
  var existingBet = await betRepository.findOne({match_id: match.id, user_id: user.id})
  var hope = match.homeTeam
  if(tip === 1) {
    var hope = match.awayTeam
  }

  if(existingBet === undefined) {
    var bet = {
      tip: tip,
      match_id: match.id,
      user_id: user.id
    }
    await betRepository.save(bet)
    
    return `Alright, I've added your bet. Let's hope ${hope} wins!`
  }

  existingBet.tip = tip
  await betRepository.save(existingBet)
  return `Alright, I've updated your bet. You're now rooting for ${hope}!`
}

function getTip(reaction) {
  if(reaction.emoji.name === "👈") {
    return 0
  }
  if(reaction.emoji.name === "👉") {
    return 1
  }
  return 2
}