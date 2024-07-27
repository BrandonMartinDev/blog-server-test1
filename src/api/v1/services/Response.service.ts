// -- == [[ IMPORTS ]] == -- \\

// Types

import { type Response } from 'express';



// -- == [[ SERVICE TYPES ]] == -- \\

type ServerResponseJson = {
    message?: string;
    error?: string;
    data?: any;
}

type ServerResponseOptions = {
    statusCode: number;
    responseJson: ServerResponseJson;
}



// -- == [[ SERVICE METHODS ]] == -- \\

function RespondToClient(res: Response, resOptions: ServerResponseOptions) {

    const { statusCode, responseJson } = resOptions;

    res.status(statusCode);
    res.json(responseJson);

    return;

}



// -- == [[ EXPORTS ]] == -- \\

export { RespondToClient }