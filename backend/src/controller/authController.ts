import poolDB from '../db';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2/promise';

export const createUser = async (req: Request, res: Response) => {};
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
