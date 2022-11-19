import express, { Response, Request } from 'express';
import orderService from '../services/orderService';
import { authUserWithJWT } from '../services/authService';

const routes = express.Router();

routes.get('/orders', authUserWithJWT, async (req: Request, res: Response) => {
    try {
        const orders = await orderService(Number(req.query.id));
        res.json({ status: 'success', order_details: orders });
    } catch (error) {
        console.error(error);
        res.json({ status: 'error', errorMessage: 'No order found...' });
        res.status(401);
    }
});

export default routes;
