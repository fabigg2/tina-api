import {config} from 'dotenv';

import Server from "./Server";

config()

const server = new Server();
server.start()