import express, { Response, Request } from 'express';
import { UserTable } from '../models/users';
import { authUserWithJWT } from '../services/authService';

const routes = express.Router();

const table = new UserTable();

routes.get('/users', async (req: Request, res: Response) => {
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
        const users = await table.index();
        res.json({ status: 'success', users: users });
    } catch (error) {
        console.error(error);
        res.json({ status: 'error', errorMessage: error });
        res.status(400);
    }
});

routes.get('/users/:id', async (req: Request, res: Response) => {
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
        const user = await table.show(Number(req.params.id));
        res.json({ status: 'success', user: user });
    } catch (error) {
        console.error(error);
        res.json({ status: 'error', errorMessage: error });
        res.status(400);
    }
});

routes.post('/users', async (req: Request, res: Response) => {
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
            req.body.first_name,
            req.body.last_name,
            req.body.password
        );
        res.json({ status: 'success', token: createResult });
    } catch (error) {
        console.error(error);
        res.json({ status: 'error', errorMessage: error });
        res.status(400);
    }
});

routes.post('/login', async (req: Request, res: Response) => {
    try {
        const loginResult = await table.login(
            req.body.first_name,
            req.body.last_name,
            req.body.password
        );

        res.json({ status: 'success', token: loginResult });
    } catch (error) {
        console.error(error);
        res.json({ status: 'error', errorMessage: error });
        res.status(400);
    }
});

export default routes;
