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

export default router;
