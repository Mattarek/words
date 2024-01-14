import { createPool, Pool } from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const poolDB: Pool = createPool({
    host: process.env.DATABASE_HOST_URL,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});

export default poolDB;
