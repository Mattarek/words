import express from 'express';
import { logInUser } from '../controller/authController';

const authRouter = express.Router();

authRouter.get('/', (req, res) => {
    console.log(req.body);
    res.end();
});

authRouter.post('/login', logInUser);

export default authRouter;
