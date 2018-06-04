const getManager = require('typeorm').getManager
const flag = require('../../flag')

exports.run = async (client, message, args) => {
  var matchRepository = getManager().getRepository('Match')
  var betRepository = getManager().getRepository('Bet')
  var userRepository = getManager().getRepository('User')
  var match = await matchRepository.findOne(args[0])
  if(match === undefined) {
    message.reply('match ID not provided or not found. Make sure you\'re using a correct match ID.')
  }

  var bets = await betRepository.find({match_id: match.id})
  var reply = {
    title: 'Bets for ' + flag(match.homeTeam) + ' vs. ' + flag(match.awayTeam),
    fields: []
  }
  for(var bet of bets) {
    var user = await userRepository.findOne(bet.user_id)
    var discordUser = await client.fetchUser(user.discord)
    var tip = "👆"
    if(bet.tip == 0 ) {
      tip = flag(match.homeTeam)
    }
    else if(bet.tip == 1) {
      tip = flag(match.awayTeam)
    }
    reply.fields.push({
      name: `${discordUser.username}`,
      value: tip
    })
  }
  message.reply({embed: reply})
}