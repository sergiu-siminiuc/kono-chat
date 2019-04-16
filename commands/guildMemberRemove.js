const Discord = require('discord.js');
	
	module.exports = (client, member) => {
	  // Load the guild's settings
	  const settings = client.settings.get(member.guild.id);
	
	  const embed = new Discord.RichEmbed()
	    .setAuthor(`Member Left`, member.user.displayAvatarURL)
	    .setDescription(`${member.user} ${member.user.username}`)
	    .setColor(16711680)
	    .setTimestamp()
	    .setFooter(`ID: ${member.user.id}`)
	
	
	    client.channels.get(client.config.LOG_CHANNEL).send({embed});
	};