const getManager = require('typeorm').getManager
const flag = require('../../flag')

exports.run = async (client, message, args) => {
  var matchRepository = getManager().getRepository('Match')
  var matches = await matchRepository.find()
  var reply = {
    title: 'All Matches',
    description: 'Type "wc!bet-make <match> to place or change a bet.',
    fields: []
  }
  for(var match of matches) {
    reply.fields.push({
      name: `Match #${match.id} - ${match.match_start}`,
      value: flag(match.homeTeam) + " vs. " + flag(match.awayTeam)
    })
  }
  message.reply({embed: reply})
}