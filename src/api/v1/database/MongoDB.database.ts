// -- == [[ IMPORTS ]] == -- \\

// Defaults

import { MONGO_CONNECTION_STRING } from "@v1config/defaults";


// Modules/Packages

import mongoose from 'mongoose';



// -- == [[ INITIALIZE DATABASE CONNECTION METHOD ]] == -- \\

async function ConnectToDB() {

    try {

        const connectedDB = await mongoose.connect(MONGO_CONNECTION_STRING);

        console.log("Connected to database successfully!");

        return connectedDB;

    } catch (err) {

        if (err instanceof Error) {
            console.log(`ERROR CONNECTING TO DATABASE: ${err.message}`);
            return;      
        }

        console.log(`ERROR CONNECTING TO DATABASE: ${err}`);

    }

}



// -- == [[ EXPORTS ]] == -- \\

export {
    ConnectToDB
}