import express, { Express } from "express";
import http, { Server as HttpServer } from "http";
import cors from "cors";
import { socketIo } from "./ServerIO";

// const cors = require('cors');
// const path = require('path');

// const routes = require('./routes');

import db from "./settings/db"; // const DB = require('./settings/db/DB');
import { swaggerServe, swaggerSetup } from "./settings/doc/swagger";
import routes from "./routes";
import { Knex } from "knex";

class Server {
  io;
  private server: HttpServer;
  private app: Express;
  private port: string;
  private knex: Knex;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.port = process.env.PORT || "8080";
  }

  /**
   * description: start the server
   */
  start(port = this.port) {
    this.middleware();
    this.routes();
    this.knex = db();
    this.knex
      .raw("select 1")
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
    this.server.listen(this.port, () => {
      console.log("Server on port " + port);
    });
    this.io = socketIo(this.server);
  }

  middleware() {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use("/doc", swaggerServe, swaggerSetup);
    // Server.app.use('/', express.static(path.join(__dirname, '../public')));
  }

  routes() {
    this.app.use("/api", routes);
  }
}

// Server.app.use(express.urlencoded({ extended: false }))
// Server.app.use(express.json())
// Server.app.use(cors())
// Server.app.use('/doc', swaggerServe, swaggerSetup);
// Server.app.use('/', express.static(path.join(__dirname, '../public')));
// Server.app.use('/api', route)
export default Server;
