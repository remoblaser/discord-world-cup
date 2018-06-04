const typeorm = require('typeorm')
const EntitySchema = typeorm.EntitySchema;
const Match = require('./models/Match')
const User = require('./models/User')
const Bet = require('./models/Bet')

module.exports.connect = () => {
  return typeorm.createConnection({
    type: "sqlite",
    database: "./db.sqlite",
    synchronize: true,
    entities: [ 
      new EntitySchema(Match), 
      new EntitySchema(User),
      new EntitySchema(Bet) 
    ]
  })
}