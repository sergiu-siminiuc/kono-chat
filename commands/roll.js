const functions = require('../modules/extfunctions.js');
	
	exports.run = async (client, message, args) => {
		let [rolls] = args
	    if (rolls == null)
	        rolls = "1d20"
	    diceToRoll = rolls.toString(rolls)
	    temp = functions.rollDice(diceToRoll);
	    message.channel.send("You rolled **" + temp[1] + ".**\nTotal is **" + temp[0] + ".**");
	};
	
	exports.conf = {
	  enabled: true,
	  guildOnly: false,
		allowedAnywhere: false,
	  aliases: [],
	  permLevel: 0
	};
	
	exports.help = {
	  name: "roll",
	  category: "Miscellaneous",
	  description: "It rolls dice. Default is 1d20",
	  usage: "roll <number>d<number>"
	};