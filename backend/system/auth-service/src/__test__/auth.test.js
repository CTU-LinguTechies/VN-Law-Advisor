const supertest = require('supertest');
const app = require('../app'); // your express app

const User = require('../models/User');

const userInput = {
    email: 'test@example.com',
    name: 'Thai Ha',
    password: 'thaiha',
    phonenum: '0123456789',
};

describe('User', () => {
    describe('user registration', () => {
        describe('given the email is valid', () => {
            it('should return the user payload', async () => {
                const { statusCode, body } = await supertest(app)
                    .post('/auth/api/v1/register')
                    .send(userInput);

                expect(statusCode).toEqual(200);
                expect(function (res) {
                    res.body.data.email = userInput.email;
                    res.body.data.role = 'USER';
                });
                await User.destroy({ where: { email: userInput.email }, force: true });
            });
        });
    });
});
