import express, { Response, Request } from "express";
import orderService from "../services/orderService";
import { authUserWithJWTMiddleware } from "../services/authService";

const routes = express.Router();

routes.get(
  "/orders",
  [authUserWithJWTMiddleware],
  async (req: Request, res: Response) => {
    try {
      const orders = await orderService(Number(req.query.id));
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(400);
      res.json(error);
    }
  }
);

export default routes;
