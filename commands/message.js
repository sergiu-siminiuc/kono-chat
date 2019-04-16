// The MESSAGE event runs anytime a message is received
	// Note that due to the binding of client to every event, every event
	// goes `client, other, args` when this function is run.
	var d = new Date();
	var n = d.toISOString();
	
	module.exports = (client, message) => {
	  // It's good practice to ignore other bots. This also makes your bot ignore itself
	  // and not get into a spam loop (we call that "botception").
	  if (message.author.bot) return;
	  client.pointsMonitor(client, message);
	  client.moneyMonitor(client, message);
	  // Grab the settings for this server from the PersistentCollection
	  // If there is no guild, get default conf (DMs)
	  const settings = message.guild
	    ? client.settings.get(message.guild.id)
	    : client.config.defaultSettings;
	
	  // For ease of use in commands and functions, we'll attach the settings
	  // to the message object, so `message.settings` is accessible.
	  message.settings = settings;
	
	
	  if (message.content.indexOf(settings.prefix) !== 0) return;
	
	  // Here we separate our "command" name, and our "arguments" for the command.
	  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
	  // command = say
	  // args = ["Is", "this", "the", "real", "life?"]
	  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
	  const command = args.shift().toLowerCase();
	
	  // Get the user or member's permission level from the elevation
	  const level = client.permlevel(message);
	
	  // Check whether the command, or alias, exist in the collections defined
	  // in app.js.
	  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
	
	
	  //Check if command is a FAQ, if so, skip rest and just post it.
	  if (client.faq.get(command)) {
		  temp = client.faq.get(command);
		  message.channel.send(`${temp.question}`);
	    message.channel.send(`${temp.answer}`)
	  };
	
	
	
	  // Some commands may not be useable in DMs. This check prevents those commands from running
	  // and return a friendly error message.
	  if (cmd && !message.guild && cmd.conf.guildOnly)
	    return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");
	
	  // If the command exists, **AND** the user has permission, run it.
	
	  if (cmd && level >= cmd.conf.permLevel && settings.botChannel == message.channel.id) {
		  cmd.run(client, message, args, level);
	  }
	
	
	  if (cmd && level >= cmd.conf.permLevel && cmd.conf.allowedAnywhere && settings.botChannel !== message.channel.id) {
	    /*
		client.channels.get(client.config.LOG_CHANNEL).send({embed: {
	  "color": 14651362,
	  "timestamp": `${n}`,
	  "footer": {
	    "text": `ID: ${message.author.id}`
	  },
	    "fields": [
	      {
	        "name": `**Used command:**`,
			"value": `${message}`
	      }
		],
	  "author": {
	    "name": `${message.author.username + "#" + message.author.discriminator}`,
	    "icon_url": `${message.author.avatarURL}`
		}}});
		*/
	    cmd.run(client, message, args, level);
	  }
	
	};