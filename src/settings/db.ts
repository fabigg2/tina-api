import mongoose from "mongoose";
const local = 'mongodb://127.0.0.1:27017/test1';

export const connect = () => {
    mongoose.connect(local);

    let { connection: db } = mongoose;

    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', function () {
        console.log('Conection succesful');
    })

    return mongoose;
}

export const desconnect = ()=>{
    mongoose.disconnect()
}


