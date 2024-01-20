import poolDB from '../db';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface IUser extends RowDataPacket {
    id: number;
    uuid: string;
    login: string;
    email: string;
    password: string;
}

export const logInUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const [userFound] = await poolDB.execute<IUser[]>(
            'SELECT * FROM clients WHERE email = ?',
            [email],
        );

        const isMatch = await bcrypt.compare(password, userFound[0].password);
        if (isMatch) {
            const accessToken = jwt.sign(
                userFound[0].email,
                process.env.JWT_SECRET as string,
            );
            res.status(200).json({
                message: 'You have successfully logged in!',
                accessToken,
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
};
