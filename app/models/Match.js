module.exports = {
  name: "Match",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    awayTeam: {
      type: "varchar"
    },
    homeTeam: {
      type: "varchar"
    },
    tie_possible: {
      type: "boolean"
    },
    match_start: {
      type: "datetime"
    },
    result: {
      type: "int",
      nullable: true
    }
  },
  relations: {
    matches: {
      target: "Bet",
      type: "many-to-one"
    }
  }
}