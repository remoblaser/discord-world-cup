const getManager = require('typeorm').getManager
const flag = require('../../flag')
const config = require('../../../config.json')


exports.run = async (client, message, args) => {
  var betRepository = getManager().getRepository('Bet')
  var matchRepository = getManager().getRepository('Match')
  var userRepository = getManager().getRepository('User')

  var currentUser = await userRepository.findOne({discord: message.author.id})

  var userBets = await betRepository.find({user_id: currentUser.id})
  var reply = {
      title: "Here are your bets:",
      fields: []
    }
  for(var bet of userBets) {
    var match = await matchRepository.findOne({id: bet.match_id})
    var tip = flag(match.homeTeam);
    if(bet.tip === 1) {
      var tip = flag(match.awayTeam);
    }
    else {
      var tip = "Draw"
    }
    reply.fields.push({ name: flag(match.homeTeam) + " vs. " + flag(match.awayTeam), value: "Your bet: " + tip })
  }
  message.reply({embed: reply})
}