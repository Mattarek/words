import express from 'express';
import { getAllClients, createClient, updateUser } from '../controller';

const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body);
    res.end();
});
router.get('/clients', getAllClients);
router.post('/clients', createClient);
router.put('/clients', updateUser);

export default router;
