import { loadConfig } from "./config"
import { REST, Routes } from "discord.js"
import { Client, GatewayIntentBits, Collection, Events } from "discord.js"
import fs from "fs";
import path from "path";
import { deployCommands } from "./deploycommands";
const config = loadConfig()
deployCommands().then(() => {client.login(config.token!)})


const client: any = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]});
client.on("ready", () => {
    console.log(`Logged in with configToken`)

})

const commands: any = [];
// Grab all the command files from the commands directory you created earlier
const foldersPath = "./src/commands/"
const commandFolders = fs.readdirSync(foldersPath);
//create a command handler

for (const folder of commandFolders) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	let file: any;
	for (file of commandFiles) {
		const filePath: any  = path.join(commandsPath, file);
		const command: any = filePath;
		try {
			commands.push(command.data.toJSON());
		} catch (e) {
			console.log(`${filePath} error`);
		}
	}
}
