import poolDB from '../db';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2/promise';
import bcrypt from 'bcrypt';

interface IUser extends RowDataPacket {
    id: number;
    uuid: string;
    login: string;
    email: string;
    password: string;
}

export const createUser = async (req: Request, res: Response) => {
    const { email, password, login } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [result] = await poolDB.execute(
            'INSERT INTO clients (email, login, password) VALUES (?, ?, ?)',
            [email, login, hashedPassword],
        );
        res.status(201).json({
            message: 'You have successfully logged in!',
        });
        return { success: true, message: 'User registered successfully' };
    } catch (error) {
        console.error('Error during registration:', error);
        return {
            success: false,
            message: 'An error occurred during registration',
        };
    }
};

export const logInUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const [userFound] = await poolDB.execute<IUser[]>(
            'SELECT * FROM clients WHERE email = ? AND password = ?',
            [email, password],
        );

        if (userFound.length > 0) {
            res.status(200).json({
                message: 'You have successfully logged in!',
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
};
