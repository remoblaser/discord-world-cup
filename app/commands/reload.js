exports.run = (client, message, args) => {
  if(!args || args.size < 1) return message.reply("Must provide a command name to reload.");
  var command = args[0].replace('-', '/')
  delete require.cache[require.resolve(`./${command}.js`)];
  message.reply(`The command ${command} has been reloaded`);
};