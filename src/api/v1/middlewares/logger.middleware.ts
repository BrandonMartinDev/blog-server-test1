// -- == [[ IMPORTS ]] == -- \\

// Modules

import fs from 'fs';


// Types

import {
    type Request,
    type Response,
    type NextFunction
} from 'express'


// Defaults

import { LOGS_DIR } from '@v1config/defaults.js';

// Utils

import { CatchErr } from '@v1utils/CatchErr.utils';



// -- == [[ MIDDLEWARE METHODS ]] == -- \\

let currentLogFilePath: string = `${LOGS_DIR}/LOG_0.txt`;

fs.readdir(LOGS_DIR, (err, files) => {

    if (err) {
        CatchErr(err, "ERROR GETTING LOGS DIRECTORY LENGTH (1)");
    }

    try {

        if (files) {
            currentLogFilePath = `${LOGS_DIR}/LOG_${files.length + 1}.txt`;
        }

    } catch (error) {
        CatchErr(error, "ERROR GETTING LOGS DIRECTORY LENGTH");
    }

});



const LoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const logString = `${new Date().toISOString()} || ${req.ip} || ${req.method} || ${req.originalUrl}`

    const previousLogs = (() => {
        try {
            return fs.readFileSync(currentLogFilePath);
        } catch (err) {
            return "";
        }
    })()

    fs.writeFileSync(currentLogFilePath, previousLogs + "\n" + logString, 'utf-8');

    console.log(logString);
    next();

}



// -- == [[ EXPORTS ]] == -- \\

export default LoggerMiddleware;