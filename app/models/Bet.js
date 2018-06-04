module.exports = {
  name: "Bet",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    tip: {
      type: "int"
    },
    match_id: {
      type: "int"
    },
    user_id: {
      type: "int"
    }
  }
}