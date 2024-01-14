// src/index.ts
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { json } from 'body-parser';
import clientRoutes from './routes/clientRoutes';
import poolDB from './db';
import dotenv from 'dotenv';
const app = express();

// Middleware
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));
app.use(json());

// Routes
app.use('/api', clientRoutes);

// MySQL Connection
const run = async () => {
    try {
        const connection = await poolDB.getConnection();
        if (connection) {
            app.listen(process.env.PORT, () => {
                console.log(`Server is running on port ${process.env.PORT}`);
            });
        }
    } catch (error) {
        console.error(error);
    }
};
run();
