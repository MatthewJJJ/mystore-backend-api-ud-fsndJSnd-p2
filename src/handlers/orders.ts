import express, { Response, Request } from 'express';
import orderService from '../services/orderService';
import { authUserWithJWT } from '../services/authService';

const routes = express.Router();

routes.get('/orders', async (req: Request, res: Response) => {
    try {
        authUserWithJWT(req);
    } catch (error) {
        console.error(error);
        res.json({
            status: 'error',
            errorMessage: 'User Authentication Failed!  Please login again...',
        });
        res.status(401);
    }
    try {
        const orders = await orderService(Number(req.query.id));
        res.json({ status: 'success', orders: orders });
    } catch (error) {
        console.error(error);
        res.json({ status: 'error', errorMessage: error });
        res.status(401);
    }
});

export default routes;
