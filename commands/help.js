exports.run = (client, message, args, level) => {
    if (!args[0]) {
        const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
        const myCommands = message.guild ? client.commands.filter(cmd => cmd.conf.permLevel <= level) : client.commands.filter(cmd => cmd.conf.permLevel <= level && cmd.conf.guildOnly !== true);
        const commandNames = myCommands.keyArray();
        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
        let currentCategory = "";
        let output = `= Command List =\n\n[Use ${settings.prefix}help <commandname> for details]\n`;
        let sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1: -1);
        sorted.forEach(c => {
            const cat = c.help.category
            if (currentCategory !== cat){
                output += `\n== ${cat} ==\n`;
                currentCategory = cat;
            }
            output += `${settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;   
        });
        message.author.send(output, {code: "asciidoc"});
        message.channel.send("I slid into your DMs, " + message.author);
    } else {
        let command = args[0];
        if (client.commands.has(command)){
            command = client.commands.get(command);
            if (level < command.conf.permLevel) return;
            message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage::${command.help.usage}`, {code:"asciidoc"});
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    allowedAnywhere: false,
    aliases: ["h", "halp"],
    permLevel: 0
  };
  
  exports.help = {
    name: "help",
    category: "System",
    description: "Displays all the available commands for your permission level.",
    usage: "help [command]"
  };