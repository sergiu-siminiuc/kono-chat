const Discord = require('discord.js');
	exports.run = async (client, message, args) => {
	  const user = message.mentions.users.first();
	  const muteRole = client.guilds.get(message.guild.id).roles.find('name', client.config.defaultSettings.mutedRole);
	  if (!muteRole) return message.reply('I cannot find a mute role').catch(console.error);
	  if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);
	
	  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);
	
	  if (message.guild.member(user).roles.has(muteRole.id)) {
	    message.guild.member(user).removeRole(muteRole).then(() => {
	      embed = new Discord.RichEmbed()
	        .setAuthor(`Member Unmuted`,user.displayAvatarURL)
	        .setColor(14651362)
	        .setDescription(`**${user}**`)
	        .setTimestamp()
	        .setFooter(`ID: ${user.id}`)
	        .addField(`**Action commited by:**`,`${message.author}`)
	      client.channels.get(message.settings.modLogChannel).send({embed}).catch(console.error);
	    });
	  } else {
	    message.guild.member(user).addRole(muteRole).then(() => {
	      embed = new Discord.RichEmbed()
	        .setAuthor(`Member Muted`,user.displayAvatarURL)
	        .setColor(14651362)
	        .setDescription(`**${user}**`)
	        .setTimestamp()
	        .setFooter(`ID: ${user.id}`)
	        .addField(`**Action commited by:**`,`${message.author}`)
	      client.channels.get(message.settings.modLogChannel).send({embed}).catch(console.error);
	    });
	  }
	};
	
	exports.conf = {
	  enabled: true,
	  guildOnly: false,
	  allowedAnywhere: true,
	  aliases: ['unmute'],
	  permLevel: 2
	};
	
	exports.help = {
	  name: 'mute',
	  description: 'mutes or unmutes a mentioned user',
	  usage: '!un/mute [mention]'
	};