import poolDB from '../db';
import { Request, Response } from 'express';
import { FieldPacket, ResultSetHeader } from 'mysql2/promise';

export const createUser = async (req: Request, res: Response) => {};
interface IUser extends ResultSetHeader {
    id: number;
    uuid: string;
    login: string;
    email: string;
    password: string;
}

type UserDataStructure = [IUser, FieldPacket];

export const logInUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const [rows, fields] = await poolDB.execute(
            'SELECT * FROM clients WHERE email = ? AND password = ?',
            [email, password],
        );
        console.log(rows);

        res.status(200).json('OK');
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'An error occurred while trying to log in.',
        });
    }
};
