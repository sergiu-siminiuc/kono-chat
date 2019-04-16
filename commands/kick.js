const Discord = require('discord.js');
	
	exports.run = async (client, message, args) => {
	  const user = message.mentions.users.first();
	  const modlog = client.channels.find('name', client.config.defaultSettings.modLogChannel);
	  if (!modlog) return message.reply('I cannot find a mod-log channel');
	  if (message.mentions.users.size < 1) return message.reply('You must mention someone to kick them.').catch(console.error);
	
	  if (!message.guild.member(user).kickable) return message.reply('I cannot kick that member');
	  message.guild.member(user).kick();
	  message.delete(1000)
	
	  const embed = new Discord.RichEmbed()
	    .setTitle(`Member Kicked`)
	    .setDescription(`${user}`)
	    .setColor(11406336)
	    .setTimestamp()
	    .addField(`**Action commited by:**`,`${message.author}`)
	  return client.channels.get(modlog.id).send({embed});
	};
	
	exports.conf = {
	  aliases: [],
	  allowedAnywhere: true,
	  permLevel: 2
	};
	
	exports.help = {
	  name: 'kick',
	  description: 'Kicks the mentioned user.',
	  usage: 'kick [mention]'
	};