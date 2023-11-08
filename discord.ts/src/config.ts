import dotenv from "dotenv";
dotenv.config()

type Config = {
    token: string | undefined,
    clientId: string | undefined,
    guildId: string | undefined,
}

export const loadConfig = (): Config => {
    return {
        token: process.env.TOKEN,
        clientId: process.env.CLIENT_ID,
        guildId: process.env.GUILD_ID,
    }
}
