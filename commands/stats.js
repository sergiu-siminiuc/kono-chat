const { version } = require("discord.js");
	const moment = require("moment");
	require("moment-duration-format");
	
	exports.run = (client, message, args) => {
	  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
	  message.channel.send(`= STATISTICS AND VERSION INFO =
	• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
	• Uptime     :: ${duration}
	• Users      :: ${client.users.size.toLocaleString()}
	• Discord.js :: v${version}
	• Node       :: ${process.version}`, {code: "asciidoc"});
	};
	
	exports.conf = {
	  enabled: true,
	  guildOnly: false,
	  allowedAnywhere: false,
	  aliases: [],
	  permLevel: 0
	};
	
	exports.help = {
	  name: "stats",
	  category: "Miscellaneous",
	  description: "Gives some useful bot statistics and various version info",
	  usage: "stats"
	};