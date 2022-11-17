import { User } from '../models/users';
import jsonwebtoken from 'jsonwebtoken';
import { Request } from 'express';

const generateJWT = (user: User) => {
    let secret = process.env.secret ? process.env.secret : '';
    let myJWT = jsonwebtoken.sign(user, secret);
    return myJWT;
};

const authUserWithJWT = (req: Request) => {
    try {
        let secret = process.env.secret ? process.env.secret : '';
        const authorizationHeader = req.headers.authorization;
        const jwt = authorizationHeader
            ? authorizationHeader.split(' ')[1]
            : '';

        let validationResult = jsonwebtoken.verify(jwt, secret);

        return validationResult !== null;
    } catch (error) {
        throw Error('User Authentication Failed!');
    }
};

export { generateJWT, authUserWithJWT };
