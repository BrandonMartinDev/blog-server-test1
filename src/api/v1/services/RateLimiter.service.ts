// -- == [[ IMPORTS ]] == -- \\

// Defaults

import { RATE_LIMITS } from '@v1config/defaults';


// Types

import { type Request } from 'express';


// Utils

import { CatchErr } from '@v1/utils/CatchErr.utils';



// -- == [[ SERVICE DEFAULTS ]] == -- \\

const SERVER_RATE_LIMIT_CACHE: any = {};

/*

Example of how the cache should be structured:

const SERVER_RATE_LIMIT_CACHE = {

    ["0.0.0.0-GET-/api/v1/signup/"] = 1;

    ^^ Each entry into the cache should be in the format:

    IP-METHOD-ENDPOINT_URL = RequestAmount

};

*/



// -- == [[ SERVICE METHODS ]] == -- \\

function CheckRequestLimit(req: Request) {

    try {

        // Destructure ip, method, and originalUrl from the request object

        const { ip, method, originalUrl } = req;

        if (!ip) throw new Error("There was an error getting the requester's IP!");
        if (!method) throw new Error("There was an error getting the requester's method!");
        if (!originalUrl) throw new Error("There was an error getting the requester's originalUrl!");


        // Check if there is rate limit info on the endpoint
        // If not, then the function immediately fails the rate limit check

        const RateLimitInfo = RATE_LIMITS[originalUrl] || RATE_LIMITS[`${originalUrl}/`];
        if (!RateLimitInfo) throw new Error("Could not find rate limit info");


        // Gets the request rate limit info from the method

        let RequestRateLimitInfo: any;

        if (RateLimitInfo.ALL) {
            RequestRateLimitInfo = RateLimitInfo.ALL;
        } else if (RateLimitInfo[method]) {
            RequestRateLimitInfo = RateLimitInfo[method];
        }


        // If it cannot find rate limit info on the method type, then the function immediately fails the rate limit check
        if (!RequestRateLimitInfo) throw new Error("Could not find rate limit info");


        // Gets the EntryString that will be used to check the cache
        const EntryString = (`${ip}-${method}-${originalUrl}`);


        // Checks if the cache already has requests stored for the exact EntryString
        // If there is, the cache will add 1 request to the EntryString    
        // If not, the cache will set the EntryString's requests to 1

        if (SERVER_RATE_LIMIT_CACHE[EntryString]) {
            SERVER_RATE_LIMIT_CACHE[EntryString]++;
        } else {
            SERVER_RATE_LIMIT_CACHE[EntryString] = 1;
        }


        // The server will now wait the RequestRateLimitInfo.removeAfter seconds to decrement the EntryString's requests by 1 and log it

        setTimeout(() => {

            const RequestsAmount = SERVER_RATE_LIMIT_CACHE[EntryString];
            if (RequestsAmount <= 0) return;

            SERVER_RATE_LIMIT_CACHE[EntryString]--;

            console.log(`Decremented ${EntryString} requests amount by 1`);            

        }, RequestRateLimitInfo.removeAfter * 1000);


        // Checks if the amount of requests for the EntryString is over the ratelimit for the request type.
        // If it is, the function will fail the rate limit check and log that the requester has failed the rate limit check
        // If not, the function will pass the rate limit check

        if (SERVER_RATE_LIMIT_CACHE[EntryString] > RequestRateLimitInfo.limit) {
            return false;
        }

        return true;

    } catch (err) {

        CatchErr(err);
        return "Invalid Endpoint";

    }

}



// -- == [[ EXPORTS ]] == -- \\

export { CheckRequestLimit }