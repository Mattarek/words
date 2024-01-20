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
    console.log(req.body);
    try {
        if (req.body) {
            const [userFound] = await poolDB.execute<IUser[]>(
                'SELECT * FROM clients WHERE email = ? AND password = ?',
                [email, password],
            );
            console.log(userFound);
            res.status(200).json({
                email: userFound[0].email,
                password: userFound[0].password,
            });
            res.status(404).json({
                error: 'User not exist.',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'An error occurred while trying to log in.',
        });
    }
};
