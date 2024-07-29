// SERVER INFO

export const PORT: number = parseInt(process.env.PORT as string) || 4200;
export const LOGS_DIR: string = "src/api/v1/logs";

export const RATE_LIMITS: any = {

    /*
    
    RATE_LIMITS should be in the format:

    RATE_LIMITS = {
    
        "endpoint/": {                      // Make sure to add a slash at the end of the endpoint url.
        
            METHOD: {
            
                limit: number,              // Indicates how many requests the user can make per 'removeAfter' seconds.
                removeAfter: number         // Time (in SECONDS) it takes for a request to be removed from the cache.

            }

        }

    }
    
    */

    "default": {

        ALL: {
            limit: 30,
            removeAfter: 60
        }

    },

    "/": {

        ALL: {
            limit: 20,
            removeAfter: 60
        },

    },

    "/api/v1/": {

        ALL: {
            limit: 20,
            removeAfter: 60
        },

    },

    "/api/v1/signup/": {

        GET: {
            limit: 5,
            removeAfter: 60
        },

        POST: {
            limit: 2,
            removeAfter: 60
        }

    },

    "/api/v1/user/": {

        GET: {
            limit: 30,
            removeAfter: 60
        }

    },

}


// DATABASE INFO

export const MONGO_USERNAME: string = process.env.MONGO_USERNAME as string;
export const MONGO_PASSWORD: string = process.env.MONGO_PASSWORD as string;
export const MONGO_CONNECTION_STRING: string = (process.env.MONGO_CONNECTION_STRING as string)
    .replace('<username>', MONGO_USERNAME)
    .replace('<password>', MONGO_PASSWORD);