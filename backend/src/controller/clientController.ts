import poolDB from '../db';
import { v4 as uuidv4 } from 'uuid';
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
        res.status(500).json({
            error: 'An error occurred while displaying users.',
        });
    }
};

export const createClient = async (req: Request, res: Response) => {
    const { name, surname, email } = req.body;
    const uuid = uuidv4();

    try {
        const [result] = await poolDB.execute(
            'INSERT INTO clients (uuid, name, surname, email) VALUES (?, ?, ?, ?)',
            [uuid, name, surname, email],
        );
        const insertedClientId: number = (result as ResultSetHeader).insertId;

        res.status(201).json({ id: insertedClientId, name, surname, email });
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while adding the user.',
        });
    }
};

export const updateClient = async (req: Request, res: Response) => {
    const updatedId = req.params.id;
    const { name, surname, email } = req.body;

    try {
        const [result] = await poolDB.execute<ResultSetHeader>(
            'UPDATE clients SET name = ?, surname = ?, email = ? WHERE id = ?',
            [name, surname, email, updatedId],
        );
        if (result.affectedRows === 1) {
            res.status(200).json({
                message: 'User has been updated successfully.',
            });
        } else {
            res.status(404).json({
                error: 'The user with the specified ID was not found.',
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while updating the user.',
        });
    }
};

export const deleteClient = async (req: Request, res: Response) => {
    const userDeleteId = req.params.id;

    try {
        const [result] = await poolDB.execute<ResultSetHeader>(
            'DELETE FROM clients WHERE id = ?',
            [userDeleteId],
        );
        console.log(result.affectedRows);
        if (result.affectedRows > 0) {
            res.status(200).json({
                message: 'User has been deleted successfully.',
            });
        } else {
            res.status(404).json({
                error: 'The user with the specified ID was not found.',
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while deleting the user.',
        });
    }
};
