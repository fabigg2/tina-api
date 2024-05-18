import { Model } from "objection";
import Knex from "knex";


/**
 * Main function to initialize the database, requires a env variable
 */
function db(){
    const knex = Knex({
        client: 'pg',
        debug: true,
        connection:{
            host:'localhost',
            port:5432,
            user:'postgres',
            database:'talkit',
            password:'1234'
        }
    })

    Model.knex(knex);
    return knex;
}

export default db;



// import mongoose from "mongoose";
// const local = 'mongodb://127.0.0.1:27017/test1';

// export const connect = () => {
//     mongoose.connect(local);

//     let { connection: db } = mongoose;

//     db.on('error', console.error.bind(console, 'connection error:'))
//     db.once('open', function () {
//         console.log('Conection succesful');
//     })

//     return mongoose;
// }

// export const desconnect = ()=>{
//     mongoose.disconnect()
// }


