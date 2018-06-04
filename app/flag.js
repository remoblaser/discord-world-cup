const CountryNames = require('countrynames')
const EmojiFlags = require('emoji-flags')

module.exports = (country) => {
  if(CountryNames.getCode(country) !== undefined) {
    return EmojiFlags.countryCode(CountryNames.getCode(country)).emoji
  }
  return country
}