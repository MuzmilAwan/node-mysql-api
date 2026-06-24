import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const env = process.env;

const ENV = {
    HOST: env.DB_HOST,
    USER: env.DB_USER,
    PASSWORD: env.DB_PASSWORD,
    DB_NAME: env.DB_NAME,
    PORT: env.PORT,
    CORS: env.CORS,
    JWT_ACCESS_SECRET:  env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: env.JWT_REFRESH_SECRET,
};

export default ENV;