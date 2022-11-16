import express, { Response, Request } from "express";
import { ProductTable } from "../models/products";

const routes = express.Router();

const table = new ProductTable();

routes.get("/products", async (req: Request, res: Response) => {
  try {
    const products = await table.index();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400);
    res.json(error);
  }
});

routes.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const product = await table.show(Number(req.params.id));
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400);
    res.json(error);
  }
});

routes.post("/products", async (req: Request, res: Response) => {
  try {
    const createResult = await table.create(
      req.body.name,
      Number(req.body.price)
    );
    res.json(createResult);
  } catch (error) {
    console.error(error);
    res.status(400);
    res.json(error);
  }
});

export default routes;
