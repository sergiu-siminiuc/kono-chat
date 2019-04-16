// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.
var d = new Date();
var n = d.toISOString();

module.exports = (client, message, messageUpdate) => {
  if (messageUpdate.author.bot) return;

  const settings = message.guild
    ? client.settings.get(message.guild.id)
    : client.config.defaultSettings;

  // For ease of use in commands and functions, we'll attach the settings
  // to the message object, so `message.settings` is accessible.
  message.settings = settings;

  
  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = messageUpdate.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();



  // Get the user or member's permission level from the elevation
  const level = client.permlevel(message);

  // Check whether the command, or alias, exist in the collections defined
  // in app.js.
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));


  // Some commands may not be useable in DMs. This check prevents those commands from running
  // and return a friendly error message.
  if (cmd && !messageUpdate.guild && cmd.conf.guildOnly)
    return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");

  // If the command exists, **AND** the user has permission, run it.
  if (cmd && level >= cmd.conf.permLevel) {
    client.channels.get(message.settings.modLogChannel).send({embed: {
  "description" : `**Message edited in ${message.channel}**`,
  "color": 15083817,
  "timestamp": `${n}`,
  "footer": {
    "text": `ID: ${message.author.id}`
  },
  "fields": [
      {
        "name": "Before",
        "value": `${message}`
      },
      {
        "name": "After",
        "value": `${messageUpdate}`
      }
	],
  "author": {
    "name": `${message.author.username + "#" + message.author.discriminator}`,
    "icon_url": `${message.author.avatarURL}`
	}}});
    cmd.run(client, message, args, level);
  }
  testing = message.toString()
  if (testing.includes("http")) {
	  return
	  } else {
	client.channels.get(message.settings.modLogChannel).send({embed: {
  "description" : `**Message edited in ${message.channel}**`,
  "color": 15083817,
  "timestamp": `${n}`,
  "footer": {
    "text": `ID: ${message.author.id}`
  },
  "fields": [
      {
        "name": "Before",
        "value": `${message}`
      },
      {
        "name": "After",
        "value": `${messageUpdate}`
      }
	],
  "author": {
    "name": `${message.author.username + "#" + message.author.discriminator}`,
    "icon_url": `${message.author.avatarURL}`
	}}});
  }

};