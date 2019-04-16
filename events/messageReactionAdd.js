
const Discord = require('discord.js');
const alreadyReacted = new Set();

module.exports = (client, messageReaction, user) => {
  data = client.money.get(user.id)
  message = messageReaction.message.toString();

  if (message.includes("~Reward") && messageReaction.message.author.id == client.user.id) {



    if (alreadyReacted.has(user.id))
      return;
      data.money += 2;
      client.money.set(user.id, data)
      alreadyReacted.add(user.id);
      console.log(data)
  setTimeout(() => {
    // Removes the user from the set after 1 hour
    alreadyReacted.delete(user.id);
  }, 600000);
  }
};