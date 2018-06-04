exports.run = async (client, message, args) => {
  var reply = {
    title: 'How to use the Discord World Cup Bot',
    fields: [
      {
        name: "Bets",
        value: "wc!bet-make <match> - Make a bet for a match\nwc!bet-list - List your bets"
      },
      {
        name: "Matches",
        value: "wc!match-list - List all matches\nwc!match-next - Show the 6 upcoming matches\nwc!match-show <match> - View bets for a match"
      },
      {
        name: "Ranking",
        value: "wc!ranking - View the current ranking"
      },
      {
        name: "Help",
        value: "wc!help - Display this help message"
      }
    ]
  }
  message.reply({embed: reply})
}