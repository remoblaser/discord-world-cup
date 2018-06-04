const getManager = require('typeorm').getManager
const Not = require('typeorm').Not

exports.run = async (client, message, args) => {
  var matchRepository = getManager().getRepository('Match')
  var betRepository = getManager().getRepository('Bet')
  var userRepository = getManager().getRepository('User')
  var finishedMatches = await matchRepository.find({result: Not("null")})

  var ranking = new Map()
  var reply = {
    title: 'Ranking',
    description: 'Current ranking.',
    fields: []
  }
  for(var match of finishedMatches) {
    var bets = await betRepository.find({match_id: match.id})
    for(var bet of bets) {
      if(bet.tip === match.result) {
        var score = ranking.get(bet.user_id)
        if(score !== undefined) {
          ranking.set(bet.user_id, ++score)
        }
        else {
          ranking.set(bet.user_id, 1)
        }
      }
    }
  }
  [...ranking].map(e =>{ return e[1];}).slice().sort(function(a, b) {
    return a - b; 
  });
  for (var [key, value] of ranking) {
    var user = await userRepository.findOne(key)
    var discordUser = await client.fetchUser(user.discord)
    reply.fields.push({name: discordUser.username, value: value + " Points"})
  }
  message.reply({embed: reply})
}