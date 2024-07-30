// -- == [[ IMPORTS ]] == -- \\

// Defaults

import { MONGO_CONNECTION_STRING } from "@v1config/defaults";


// Modules/Packages

import mongoose from 'mongoose';


// Utils

import { CatchErr } from "@v1/utils/CatchErr.utils";



// -- == [[ INITIALIZE DATABASE CONNECTION METHOD ]] == -- \\

let connectedDB: mongoose.Mongoose;

async function ConnectToDB() {

    try {

        connectedDB = await mongoose.connect(MONGO_CONNECTION_STRING);

        console.log("Connected to database successfully!");

        return connectedDB;

    } catch (err) {
        CatchErr(err, "ERROR CONNECTING TO DATABASE");
    }

}

async function DisconnectDB() {

    if (connectedDB) {
        console.log("Disconnecting database...");
        await mongoose.connection.close();
        console.log("Disconnected database successfully");
    }

}

process.on('SIGINT', async () => await DisconnectDB());
process.on('exit', async () => await DisconnectDB());
process.on('beforeExit', async () => await DisconnectDB());


// -- == [[ EXPORTS ]] == -- \\

export {
    ConnectToDB,
    DisconnectDB
}