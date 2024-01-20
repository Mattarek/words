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

export default clientRouter;
