//checking node version...
if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");
	
// Load up the discord.js library
const Discord = require("discord.js");
// loading all the other junk I need. :)
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const PersistentCollection = require("djs-collection-persistent");

class Bot extends Discord.Client {
  constructor(options) {
    super(options);

    // Here we load the config.json file
    this.config = require("./config.json");

    // commands are put in collections where they can be read from
    this.commands = new Discord.Collection();
    this.aliases = new Discord.Collection();

    // Now we integrate the use of the awesome PersistentCollection module
    this.settings = new PersistentCollection({name: "settings"});
  }
}

const client = new Bot();
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");

//This is where we set up all of our databases we need. I use enmap because well... its easy.
//Points Database
const pointProvider = new EnmapLevel({name: "points"});
client.points = new Enmap({provider: pointProvider});
//FAQ database
const faqProvider = new EnmapLevel({name: "faq"});
client.faq = new Enmap({provider: faqProvider});
//Money database
const moneyProvider = new EnmapLevel({name: "money"});
client.money = new Enmap({provider: moneyProvider});

(async function() {
    await client.faq.defer;
    //all FAQs are now loaded from disk.
}());

(async function() {
    await client.money.defer;
    //all money items are now loaded from disk.
}());

// Let's start by getting some useful functions
require("./modules/functions.js")(client);

// we need to wrap stuff in an anonymous function. It's annoying but it works.
const init = async () => {

  // Here we load **commands** into memory, as a collection, so they're accessible
  const cmdFiles = await readdir("./commands/");
  client.log("log", `Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    try {
      const props = require(`./commands/${f}`);
      if (f.split(".").slice(-1)[0] !== "js") return;
      client.log("log", `Loading Command: ${props.help.name}. 👌`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    } catch (e) {
      client.log(`Unable to load command ${f}: ${e}`);
    }
  });

  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir("./events/");
  client.log("log", `Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });

  // Here we login the client.
  client.login(client.config.token);

// End top-level async/await function.
};

init();