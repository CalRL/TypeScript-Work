import { Client, Collection } from  "discord.js";
import * as fs from "fs";
import path from "path";
import * as dotenv from "dotenv";
import {config} from "./config";


const client: any = new Client({ intents: 32767 });
client.commands = new Collection();
function loadCommands() {
    const commandsPath = path.join(__dirname, "commands");
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".ts"));
    for(const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ("data" in command && "execute" in command) {
            client.commands.set(command.data.name, command);
    
        } else {
            throw new Error(`Command ${command.data.name} is missing execute or data`);
        }
    }
}
const startSequence = () => {
    client.login(config.token);
}

client.once("ready", () => {
    startSequence();
    loadCommands();
})