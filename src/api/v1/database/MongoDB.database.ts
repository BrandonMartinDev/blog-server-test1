// -- == [[ IMPORTS ]] == -- \\

// Defaults

import { MONGO_CONNECTION_STRING } from "@v1config/defaults";


// Modules/Packages

import mongoose from 'mongoose';


// Utils

import { CatchErr } from "@v1/utils/CatchErr.utils";



// -- == [[ INITIALIZE DATABASE CONNECTION METHOD ]] == -- \\

async function ConnectToDB() {

    try {

        const connectedDB = await mongoose.connect(MONGO_CONNECTION_STRING);

        console.log("Connected to database successfully!");

        return connectedDB;

    } catch (err) {
        CatchErr(err, "ERROR CONNECTING TO DATABASE");
    }

}



// -- == [[ EXPORTS ]] == -- \\

export {
    ConnectToDB
}