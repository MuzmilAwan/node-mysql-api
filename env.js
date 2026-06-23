import dotenv from "dotenv";
dotenv.config({ path: "./.env", });

const env = process.env;

const ENV = {
    HOST: env.DB_HOST,
    USER: env.DB_USER,
    PASSWORD: env.DB_PASSWORD,
    PORT: env.PORT,
    CORS: env.CORS,
    DB_NAME: env.DB_NAME

};

export default ENV;



