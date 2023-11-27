const supertest = require('supertest');
const app = require('../app'); // your express app

const userInput = {
    email: "test@example.com",
    name: "Thai Ha",
    password: "thaiha",
    phonenum: "0123456789"
};

describe('User', () => {
    describe("user registration", () => {
        describe("given the email is valid", () => {
            it('should return the user payload', async () => {
                const { statusCode, body } = await supertest(app)
                    .post('/api/v1/auth/register')
                    .send(userInput);

                expect(statusCode).toBe(200);

                expect(body).toEqual(userPayload);

                expect(response.body.message).toEqual('Hello World');
            });
        });
    });
});