import { REST, Routes} from "discord.js";
import fs from "fs";
import path from "path";
import { loadConfig } from "./config";

const config = loadConfig();
const rest = new REST().setToken(config.token!);

const commands: any = [];
export async function deployCommands(){ 
	
	// Grab all the command files from the commands directory you created earlier
	const foldersPath = "./src/commands/"
	const commandFolders = fs.readdirSync(foldersPath);
	
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
	}
	
	// Construct and prepare an instance of the REST module
	
	
	// and deploy your commands!
	(async () => {
		try {
			console.log(`Started refreshing ${commands.length} application (/) commands.`);
	
			// The put method is used to fully refresh all commands in the guild with the current set
			const data: any = await rest.put(
				Routes.applicationGuildCommands(config.clientId!, config.guildId!),
				{ body: commands },
			);
	
			console.log(`Successfully reloaded ${data.length} application (/) commands.`);
		} catch (error) {
			// And of course, make sure you catch and log any errors!
			console.error(error);
		}
	})();
