module.exports = {
  name: "User",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    discord: {
      type: "varchar"
    }
  },
  relations: {
    matches: {
      target: "Bet",
      type: "many-to-one"
    }
  }
}