import poolDB from '../db';

import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';

export const getAllClients = async (req: Request, res: Response) => {
    try {
        const results = await poolDB.execute('SELECT * FROM clients');
        console.log(results);
        const clients = results[0];
        res.json(clients);
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createClient = async (req: Request, res: Response) => {
    const { name, surname, email } = req.body;

    try {
        const [result] = await poolDB.execute(
            'INSERT INTO clients (name, surname, email) VALUES (?, ?, ?)',
            [name, surname, email],
        );

        const insertedClientId: number = (result as ResultSetHeader).insertId;

        res.status(201).json({ id: insertedClientId, name, surname, email });
    } catch (error) {
        console.error('Error creating client:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export async function updateUser(req: Request, res: Response): Promise<void> {
    const { name, surname, email, id } = req.body;

    try {
        const result: ResultSetHeader = await poolDB.query(
            'UPDATE clients SET name = ?, surname = ?, email = ? WHERE id = ?',
            [name, surname, email, id],
        );
        console.log(result);
        if (result) {
            res.status(200).json({
                message: 'User has been updated successfully.',
            });
        } else {
            res.status(404).json({
                error: 'The user with the specified ID was not found.',
            });
        }
    } catch (error) {
        console.error('Error during user update:', error);
        res.status(500).json({
            error: 'An error occurred while updating the user/',
        });
    }
}
