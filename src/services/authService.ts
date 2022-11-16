import { User } from "../models/users";
import jsonwebtoken from "jsonwebtoken";
import { Request, Response } from "express";
import { FunctionTypeNode } from "typescript";

const generateJWT = (user: User) => {
  let secret = process.env.secret ? process.env.secret : "";
  let myJWT = jsonwebtoken.sign(user, secret);
  return myJWT;
};

const authUserWithJWTMiddleware = (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    let secret = process.env.secret ? process.env.secret : "";
    const authorizationHeader = req.headers.authorization;
    const jwt = authorizationHeader ? authorizationHeader.split(" ")[1] : "";
    let validationResult = jsonwebtoken.verify(jwt, secret);

    console.log(validationResult);
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
  }
};

export { generateJWT, authUserWithJWTMiddleware };
