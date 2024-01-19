import express from 'express';
import {
    getAllClients,
    createClient,
    updateClient,
    deleteClient,
} from '../controller';

const clientRouter = express.Router();

clientRouter.post('/', (req, res) => {
    console.log(req.body);
    res.end();
});
clientRouter.get('/clients', getAllClients);
clientRouter.post('/client', createClient);
clientRouter.put('/clients/:id', updateClient);
clientRouter.delete('/clients/:id', deleteClient);

clientRouter.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    if (email === 'przykladowy@email.com' && password === 'tajnehaslo') {
        return res.json({ success: true, message: 'Zalogowano pomyślnie' });
    } else {
        return res
            .status(401)
            .json({ success: false, message: 'Nieprawidłowe dane logowania' });
    }
});

export default clientRouter;
