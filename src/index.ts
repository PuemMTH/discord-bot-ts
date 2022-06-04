// Importing the libraries
import bot from './classes/bot';

// Loading the environment variables
import 'dotenv/config';

// Declaring the discord client
const client = new bot({
    // Adding the intents.
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_VOICE_STATES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "DIRECT_MESSAGES",
    ]
});

// Logging in the client
client.login(process.env.TOKEN); 