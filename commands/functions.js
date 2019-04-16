
const talkedRecently = new Set();

module.exports = (client, message) => {

// POINTS SYSTEM Function

  client.pointsMonitor = (client, message) => {
    const settings = client.settings.get(message.guild.id);
  if (message.channel.type !=='text') return;
  if (message.content.startsWith(settings.prefix)) return;
  const score = client.points.get(message.author.id) || { points: 0, level: 0 };
  if (talkedRecently.has(message.author.id))
    return;
    // Adds the user to the set so that they can't gain exp for 60 seconds
    talkedRecently.add(message.author.id);
    score.points++;
setTimeout(() => {
  // Removes the user from the set after 60 seconds
  talkedRecently.delete(message.author.id);
}, 60000);
  const curLevel = Math.floor(0.6 * Math.sqrt(score.points));
  if (score.level < curLevel) {
    message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
    score.level = curLevel;
  }
  client.points.set(message.author.id, score);
  if (score.points == 25) {
    role = message.guild.roles.find("name", message.settings.memberRole)
	  message.member.addRole(role).catch(console.log)
	  message.reply(`You have been assigned the role: ${message.settings.memberRole}`)
  }
  	};

  client.moneyMonitor = (client, message) => {
    const money = client.money.get(message.author.id) || client.money.set(message.author.id,{money: 0,daily: 0,lastDaily: "Not Collected Yet"});
  }
  client.permlevel = message => {
    let permlvl = 0;

    // If bot owner, return max perm level
    if (message.author.id === client.config.ownerID) return 10;

    // If DMs or webhook, return 0 perm level.
    if (!message.guild || !message.member) return 0;

    // The rest of the perms rely on roles. If those roles are not found
    // in the settings, or the user does not have it, their level will be 0
    try {
      const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
      if (modRole && message.member.roles.has(modRole.id)) permlvl = 2;
    } catch (e) {
      console.warn("modRole not present in guild settings. Skipping Moderator (level 2) check");
    }
    try {
      const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
      if (adminRole && message.member.roles.has(adminRole.id)) permlvl = 3;
    } catch (e) {
      console.warn("adminRole not present in guild settings. Skipping Administrator (level 3) check");
    }

    // Guild Owner gets an extra level, wooh!
    if (message.author.id === message.guild.owner.id) permlvl = 4;

    return permlvl;
  };


  /*
  LOGGING FUNCTION

  Logs to console. Future patches may include time+colors
  */
  client.log = (type, msg, title) => {
    if (!title) title = "Log";
    console.log(`[${type}] [${title}]${msg}`);
  };


  /*
  SINGLE-LINE AWAITMESSAGE

  A simple way to grab a single reply, from the user that initiated
  the command. Useful to get "precisions" on certain things...

  USAGE

  const response = await client.awaitReply(msg, "Favourite Color?");
  msg.reply(`Oh, I really love ${response} too!`);

  */
  client.awaitReply = async (msg, question, limit = 60000) => {
    const filter = m=>m.author.id = msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  };


  /*
  MESSAGE CLEAN FUNCTION

  "Clean" removes @everyone pings, as well as tokens, and makes code blocks
  escaped so they're shown more easily. As a bonus it resolves promises
  and stringifies objects!
  This is mostly only used by the Eval and Exec commands.
  */
  client.clean = async (client, text) => {
    if (text && text.constructor.name == "Promise")
      text = await text;
    if (typeof evaled !== "string")
      text = require("util").inspect(text, {depth: 0});

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");

    return text;
  };




  /* MISCELANEOUS NON-CRITICAL FUNCTIONS */

  String.prototype.toProperCase = function() {
    return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

  // `await client.wait(1000);` to "pause" for 1 second.
  client.wait = require("util").promisify(setTimeout);

  // These 2 simply handle unhandled things. Like Magic. /shrug
  process.on("uncaughtException", (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Uncaught Exception: ", errorMsg);
  });

  process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: ", err);
  });
};