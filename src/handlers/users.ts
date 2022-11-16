import express, { Response, Request } from "express";
import { UserTable } from "../models/users";

const routes = express.Router();

const table = new UserTable();

routes.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await table.index();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(400);
    res.json(error);
  }
});

routes.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const user = await table.show(Number(req.params.id));
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(400);
    res.json(error);
  }
});

routes.post("/users", async (req: Request, res: Response) => {
  try {
    const createResult = await table.create(
      req.body.first_name,
      req.body.last_name,
      req.body.password
    );
    res.json(createResult);
  } catch (error) {
    console.error(error);
    res.status(400);
    res.json(error);
  }
});

routes.post("/login", async (req: Request, res: Response) => {
  try {
    const loginResult = await table.login(
      req.body.first_name,
      req.body.last_name,
      req.body.password
    );

    res.json(loginResult);
  } catch (error) {
    console.error(error);
    res.status(400);
    res.json(error);
  }
});

export default routes;
