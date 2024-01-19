import express from 'express';
import {
    getAllClients,
    createClient,
    updateClient,
    deleteClient,
} from '../controller';

const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body);
    res.end();
});
router.get('/clients', getAllClients);
router.post('/clients', createClient);
router.put('/clients/:id', updateClient);
router.delete('/clients/:id', deleteClient);

router.post('/login', (req, res) => {
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

export default router;
