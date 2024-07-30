// SERVER INFO

export const PORT: number = parseInt(process.env.PORT as string) || 4200;
export const SERVER_URL: string = process.env.SERVER_URL as string || "http://localhost:3000/";

export const CORS_OPTIONS = {
    credentials: true,
    origin: SERVER_URL
};

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

    "/api/v1/login/": {

        GET: {
            limit: 10,
            removeAfter: 60
        },

        POST: {
            limit: 10,
            removeAfter: 60
        }

    },

}


// EXPRESS SESSION INFO

export const COOKIE_SECRET: string = process.env.COOKIE_SECRET as string || "iSc7spjweRGJsQHPGc^%k0X-&h_mib_M9";

export const SESSION_OPTIONS = {

    secret: COOKIE_SECRET,

    resave: false,
    saveUninitialized: false,

    cookie: {
        httpOnly: true,
        secure: "auto",
        sameSite: false,
        maxAge: (1000 * 60) * 60 * 60 * 24 * 7, // One week
    }

};



// DATABASE INFO

export const MONGO_USERNAME: string = process.env.MONGO_USERNAME as string;
export const MONGO_PASSWORD: string = process.env.MONGO_PASSWORD as string;
export const MONGO_CONNECTION_STRING: string = (process.env.MONGO_CONNECTION_STRING as string)
    .replace('<username>', MONGO_USERNAME)
    .replace('<password>', MONGO_PASSWORD);