import { Request } from 'express';
import { generateJWT, authUserWithJWT } from '../../services/authService';
import { JWT } from '../TestConstants';

describe('testing auth service methods ', () => {
    it('should generate a JWT', () => {
        const response = generateJWT({
            first_name: 'Chery',
            last_name: 'John',
            hashed_password: 'asfasfasdfsafasfd',
        });
        expect(typeof response).toBe('string');
        expect(response.length).toBeGreaterThan(0);
    });

    it('should auth user', () => {
        const response = authUserWithJWT({
            headers: { authorization: JWT },
        } as Request);
        expect(response).toEqual(true);
    });
});
