import express, { Response, Request } from 'express';
import { ProductTable } from '../models/products';
import { authUserWithJWT } from '../services/authService';

const routes = express.Router();

const table = new ProductTable();

routes.get('/products', async (req: Request, res: Response) => {
    try {
        const products = await table.index();
        res.json({ status: 'success', products: products });
    } catch (error) {
        console.error(error);
        res.json({ status: 'error', errorMessage: error });
        res.status(400);
    }
});

routes.get('/products/:id', async (req: Request, res: Response) => {
    try {
        const product = await table.show(Number(req.params.id));
        res.json({ status: 'success', product: product });
    } catch (error) {
        console.error(error);
        res.json({ status: 'error', errorMessage: error });
        res.status(400);
    }
});

routes.post('/products', async (req: Request, res: Response) => {
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
        const createResult = await table.create(
            req.body.name,
            Number(req.body.price)
        );
        res.json({ status: 'success', result: createResult });
    } catch (error) {
        console.error(error);
        res.json({ status: 'error', errorMessage: error });
        res.status(400);
    }
});

export default routes;
