const { handleError } = require('../services/CommonUtils');
const CustomError = require('../config/CustomError');
const User = require('../models/User');
const TokenUtil = require('../services/jwtService');
const sequelize = require('../services/sequelizeService');
const passwordService = require('../services/passwordService');
const { ROLES } = require('../config/constants');
const clientRedis = require('../services/redisService');

class AuthController {
    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async registerUser(req, res) {
        const transaction = await sequelize.transaction();
        try {
            const newUserInfo = req.body;
            console.log(newUserInfo);
            const existingUser = await User.findOne({
                where: {
                    email: newUserInfo.email,
                },
            });
            if (existingUser) throw new CustomError('Email already existed', 409);
            const newUser = await User.create(
                {
                    name: newUserInfo.name,
                    phonenum: newUserInfo.phonenum,
                    email: newUserInfo.email,
                    password: passwordService.hash(newUserInfo.password),
                },
                { transaction },
            ).then((data) => data.toJSON());
            const accessToken = TokenUtil.generateAccessToken(newUser);
            const refreshToken = TokenUtil.generateRefreshToken(newUser);
            await clientRedis.set(`refreshToken-${newUser.id}`, refreshToken);
            delete newUser.password;
            delete newUser.deletedAt;
            await transaction.commit();
            return res.status(200).json({
                data: {
                    ...newUser,
                    accessToken,
                    refreshToken,
                },
                message: 'Register successfully',
                status: 200,
            });
        } catch (error) {
            console.log(error);
            await transaction.rollback();
            return handleError(res, error);
        }
    }
    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */

    async validateTokenWithRole(req, res) {
        try {
            const { authorization, role } = req.headers;
            if (!authorization || authorization === 'Bearer')
                throw new CustomError('Token is missing', 400);
            const token = authorization.substring(7);
            switch (role) {
                case ROLES.ADMIN:
                    const adminUser = TokenUtil.decodeToken(token);

                    if (adminUser.role !== ROLES.ADMIN)
                        throw new CustomError('Permission denied.', 401);
                    if (adminUser.role === ROLES.USER)
                        throw new CustomError('You are not allowed to do this.', 403);
                    delete adminUser.password;
                    return res.status(200).json({
                        data: adminUser,
                        message: 'Valid Token',
                        status: 200,
                    });
                case ROLES.USER:
                    let user = TokenUtil.decodeToken(token);
                    if (user.role !== ROLES.USER && user.role !== ROLES.ADMIN)
                        throw new CustomError('Permission denied', 401);
                    delete user.password;
                    return res.status(200).json({
                        data: user,
                        message: 'Valid Token',
                        status: 200,
                    });
                default:
                    const unknownUser = TokenUtil.decodeToken(token);
                    return res.status(200).json({
                        data: unknownUser,
                        message: 'Valid Token',
                        status: 200,
                    });
            }
        } catch (error) {
            return handleError(res, error);
        }
    }
    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            let existUser = await User.findOne({
                where: {
                    email,
                },
            });
            if (!existUser) throw new CustomError('No user found with email ' + email, 404);
            existUser = existUser.toJSON();
            const isValidPassword = passwordService.compare(password, existUser.password);
            if (!isValidPassword) throw new CustomError('Wrong password', 401);
            const accessToken = TokenUtil.generateAccessToken(existUser);
            const refreshToken = TokenUtil.generateRefreshToken(existUser);
            await clientRedis.set(`refreshToken-${existUser.id}`, refreshToken);
            delete existUser.password;
            delete existUser.deletedAt;
            return res.status(200).json({
                data: {
                    ...existUser,
                    accessToken,
                    refreshToken,
                },
                message: 'Login successfully!',
                status: 200,
            });
        } catch (error) {
            return handleError(res, error);
        }
    }
    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async requestRefreshToken(req, res) {
        try {
            const { refreshToken } = req.body.refreshToken;
            const refreshTokenInfo = TokenUtil.decodeRefreshToken(refreshToken);

            const refreshTokenInRedis = await clientRedis.get(
                `refreshToken-${refreshTokenInfo.id}`,
            );
            if (refreshToken === refreshTokenInRedis) {
                const user = await User.findOne({
                    where: {
                        id: refreshTokenInfo.id,
                    },
                }).then((data) => data.toJSON());
                const accessToken = TokenUtil.generateAccessToken(user);
                return res.status(200).json({
                    data: {
                        accessToken,
                    },
                    message: 'RefreshToken Succeeded',
                    status: 200,
                });
            }
            return res.status(400).json({
                data: {},
                message: 'Invalid refresh Token',
                status: 400,
            });
        } catch (err) {
            return handleError(res, err);
        }
    }
}
module.exports = new AuthController();
