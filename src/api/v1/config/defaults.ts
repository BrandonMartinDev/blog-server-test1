// SERVER INFO

export const PORT: number = parseInt(process.env.PORT as string) || 4200;
export const LOGS_DIR: string = "src/api/v1/logs";


// DATABASE INFO

export const MONGO_USERNAME: string = process.env.MONGO_USERNAME as string;
export const MONGO_PASSWORD: string = process.env.MONGO_PASSWORD as string;
export const MONGO_CONNECTION_STRING: string = (process.env.MONGO_CONNECTION_STRING as string)
    .replace('<username>', MONGO_USERNAME)
    .replace('<password>', MONGO_PASSWORD);