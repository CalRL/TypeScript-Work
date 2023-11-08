import * as dotenv from "dotenv";
dotenv.config();
export const config = {
    token: process.env.TOKEN,
    clientID: process.env.CLIENT_ID
};
