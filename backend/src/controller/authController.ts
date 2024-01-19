import poolDB from '../db';
import { Request, Response } from 'express';
type User = {
  id: number;
  uuid: string;
  login: string;
  email: string;
  password: string;
};

type TableDefinition = {
  id: 'id' | 'uuid' | 'login' | 'email' | 'password';
  type: 'INT' | 'VARCHAR';
  constraints?: string[]; // Dodatkowe ograniczenia, np. UNIQUE_KEY
};
type UserDataStructure = [User[], TableDefinition[]] as const;

export const createUser = async (req: Request, res: Response) => {};

export const logInUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const userFound: UserDataStructure = await poolDB.execute(
            'SELECT * FROM clients WHERE email = ? AND password = ?',
            [email, password],
        );

        console.log(userFound);
        if (userFound[0]) {
            res.status(200).json({
                login: userFound[0].login,
                email: userFound[0].email,
                password: userFound[0].password,
            });
        }
        res.status(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'An error occurred while trying to log in.',
        });
    }
};
