const supertest = require('supertest');
const app = require('../app'); // your express app
const sequelize = require('../services/sequelizeService');
const redis = require('../services/redisService');
const User = require('../models/User');

const userInput = {
    email: 'test@example.com',
    name: 'Thai Ha',
    password: 'thaiha',
    phonenum: '0123456789',
};

afterAll(async () => {
    await User.destroy({ where: { email: userInput.email }, force: true });
    await sequelize.close();
    await redis.disconnect();
});

describe('user registration', () => {
    describe('given the email is valid', () => {
        it('should return the user payload', async () => {
            const { statusCode, body } = await supertest(app)
                .post('/api/v1/register')
                .send(userInput);

            expect(statusCode).toEqual(200);
            expect(function (res) {
                res.body.data.email = userInput.email;
                res.body.data.role = 'USER';
            });
        });
    });
});

describe('user login', () => {
    describe('given an unknown email', () => {
        it('should not allow authentication', async () => {
            const loginCredential = {
                email: 'unknownemail@gmail.com',
                password: '123456789',
            };
            const { statusCode, body } = await supertest(app)
                .post('/api/v1/login')
                .send(loginCredential);
            expect(statusCode).toEqual(404);
        });
    });
    describe('given an existing email', () => {
        it('should not allow authentication when wrong password', async () => {
            const loginCredential = {
                email: userInput.email,
                password: 'random',
            };
            const { statusCode, body } = await supertest(app)
                .post('/api/v1/login')
                .send(loginCredential);
            expect(statusCode).toEqual(401);
            expect((res) => {
                res.body.data.accessToken = undefined;
                res.body.data.refreshToken = undefined;
            });
        });
        it('should allow authentication when correct password', async () => {
            const loginCredential = {
                email: userInput.email,
                password: userInput.password,
            };
            const { statusCode, body } = await supertest(app)
                .post('/api/v1/login')
                .send(loginCredential);
            expect(statusCode).toEqual(200);
            expect(body.data.accessToken).toBeDefined();
            expect(typeof body.data.accessToken).toBe('string');
        });
    });
});

describe('validate token', () => {
    it('should allow access when token is valid', async () => {
        const loginCredential = {
            email: userInput.email,
            password: userInput.password,
        };
        let response = await supertest(app).post('/api/v1/login').send(loginCredential);
        const accessToken = response.body.data.accessToken;

        const request = supertest(app).post('/api/v1/validate');

        request.set('Authorization', `Bearer ${accessToken}`);
        request.set('role', 'USER');

        const { statusCode, body } = await request.send();

        expect(statusCode).toEqual(200);
    });
});
