import express, {Express} from 'express';
import cors from 'cors';

// const cors = require('cors');
// const path = require('path');

// const routes = require('./routes');


import * as db from './settings/db'// const DB = require('./settings/db/DB');
import { swaggerServe, swaggerSetup } from './settings/doc/swagger'; 
import routes from './routes';
// const { socketIo } = require('./infrastructure/settings/io/io');



class Server {

    app: Express;
    port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';
    }

    /**
     * description: start the server
     */
    start(port = this.port) {
        this.middleware();
        this.routes()
        db.connect();
        this.app.listen(this.port, () => {
            console.log('Server on port ' + port)
        })


    }

    middleware() {
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use('/doc', swaggerServe, swaggerSetup);
        // Server.app.use('/', express.static(path.join(__dirname, '../public')));
    }

    routes() {
        this.app.use('/api', routes)
    }

}


// Server.app.use(express.urlencoded({ extended: false }))
// Server.app.use(express.json())
// Server.app.use(cors())
// Server.app.use('/doc', swaggerServe, swaggerSetup);
// Server.app.use('/', express.static(path.join(__dirname, '../public')));
// Server.app.use('/api', route)
export default Server;