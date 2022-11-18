import { generateJWT } from '../../services/authService';

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
});
