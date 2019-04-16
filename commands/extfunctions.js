var Roll = require('roll'),
	    roll = new Roll();
	var fs = require('fs'),
	    path = require('path'),
	    _ = require('underscore');
	var config = require('../config.json');
	var minecraft = require('mc-utils')
	
	module.exports.serverStatus = serverStatus;
	module.exports.serverStatus2 = serverStatus2;
	module.exports.serverStatus3 = serverStatus3;
	module.exports.onlinePlayers = onlinePlayers;
	module.exports.serverStatus2 = serverStatus2;
	module.exports.serverStatus3 = serverStatus3;
	
	module.exports.getRandomInt = function getRandomInt(min, max) {
	      min = Math.ceil(min);
	      max = Math.floor(max);
	      return Math.floor(Math.random() * (max - min)) + min;
	    }
	
	module.exports.getMostRecentFileName = function getMostRecentFileName(dir) {
	    var files = fs.readdirSync(dir);
	
	    // use underscore for max()
	    return _.max(files, function(f) {
	        var fullpath = path.join(dir, f);
	
	        // ctime = creation time is used
	        return fs.statSync(fullpath).ctime;
	    });
	}
	
	//function for rolling dice...
	module.exports.rollDice = function rollDice(diceToRoll) {
	    hold = roll.roll(diceToRoll)
	    sum = hold.result
	    rolled = hold.rolled
	    return [sum, rolled]
	}
	
	//function for coinflipping...
	module.exports.coinFlip = function coinFlip() {
	    return (Math.floor(Math.random() * 2) == 0) ? 'Heads!' : 'Tails!';
	}
	
	function serverStatus(cb) {
	
	minecraft.ping(config.SERVER_IP, 25565, function(error, results) {
	     if (error) {
	       status = "**" + config.MODPACK_NAME + " is down.**"
	        cb(status);
	     } else {
	       status = "**" + config.MODPACK_NAME + " is online.**"
		   console.log(results)
	        cb(status);
	     }
	   });
	}
	
	function serverStatus2(cb) {
	
	minecraft.ping(config.SERVER_IP, 25566, function(error, results2) {
	     if (error) {
	       status = "**" + config.MODPACK2_NAME + " is down.**"
	        cb(status);
	     } else {
	       status = "**" + config.MODPACK2_NAME + " is online.**"
	        cb(status);
	     }
	   });
	}
	
	function serverStatus3(cb) {
	
	minecraft.ping(config.SERVER_IP, 25567, function(error, results3) {
	     if (error) {
	       status = "**" + config.MODPACK3_NAME + " is down.**"
	        cb(status);
	     } else {
	       status = "**" + config.MODPACK3_NAME + " is online.**"
	        cb(status);
	     }
	   });
	}
	
	function onlinePlayers(cb) {
	
	minecraft.ping(config.SERVER_IP, 25565, function(error, results) {
	     if (results.players.online > 0) {
	       players = `Currently ${results.players.online} player(s) online: ${results.players.sample}`
	        cb(players);
	     } else {
	       players = "Nobody is online. :c"
	        cb(players);
	     }
	   });
	}
	
	function onlinePlayers2(cb) {
	
	minecraft.ping(config.SERVER_IP, 25566, function(error, results2) {
	     if (error) {
	       status = "**" + config.MODPACK2_NAME + " is down.**"
	        cb(status);
	     } else {
	       status = "**" + config.MODPACK2_NAME + " is online.**"
	        cb(status);
	     }
	   });
	}
	
	function onlinePlayers3(cb) {
	
	minecraft.ping(config.SERVER_IP, 25567, function(error, results3) {
	     if (error) {
	       status = "**" + config.MODPACK3_NAME + " is down.**"
	        cb(status);
	     } else {
	       status = "**" + config.MODPACK3_NAME + " is online.**"
	        cb(status);
	     }
	   });
	}