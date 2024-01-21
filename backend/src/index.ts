import jwt from 'jsonwebtoken';
import { createWriteStream } from 'fs';
import { join } from 'path';

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { json } from 'body-parser';

import clientRouter from './routes/clientRoutes';
import authRouter from './routes/authRoutes';
import poolDB from './db';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

// log and rotate
const accessLogStream = createWriteStream(
    join(__dirname, '../logs/access.log'),
    { flags: 'a' },
);

// Middleware
dotenv.config();
app.use(express.json());
app.use(helmet());

const options: cors.CorsOptions = {
    origin: process.env.FRONTEND_URL,
};
app.use(cors(options));

app.use(
    morgan(
        '\nDate: :date[iso] \nIp: :remote-addr :remote-user \nStatus: :http-version :method :url :status :response-time ms',
        {
            stream: accessLogStream,
        },
    ),
);

app.use(json());

const authenticate = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const authHeader = req.header['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_ACCESS_SECRET as string, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Routes
app.use('/api', clientRouter);
app.use('/api/auth', authenticate, authRouter);

// MySQL Connection
const run = async () => {
    try {
        const connection = await poolDB.getConnection();
        if (connection) {
            app.listen(port, () => {
                console.log(`Server is running on port ${process.env.PORT}`);
            });
        }
    } catch (error) {
        console.error(error);
    }
};
run();
