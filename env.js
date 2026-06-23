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
    JWT_SECRET: env.JWT_SECRET,
    JWT_EXPIRES_IN: env.JWT_EXPIRES_IN,
};

export default ENV;