import authService, { RefreshTokenResponseDto } from '@/services/auth.service';
import tokenService from './tokenService';
import axios from 'axios';

const createTestHttpClient = (baseUrl: string = '') => {
    const client = axios.create({
        baseURL: `http://localhost:5002/${baseUrl}`,
    });

    client.interceptors.request.use(async (config) => {
        const now = new Date().getTime();
        const tokenExpiratedAt = tokenService.expiratedAt;

        const isRefreshToken = config.url?.endsWith('refresh-token');

        if (tokenExpiratedAt < now && !isRefreshToken && tokenService.refreshToken) {
            const { accessToken, expirationTime } = (await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
                {
                    refreshToken: tokenService.refreshToken,
                },
            )) as RefreshTokenResponseDto;

            tokenService.accessToken = accessToken;
            tokenService.expiratedAt = expirationTime;
        }

        if (tokenService.accessToken && !isRefreshToken)
            config.headers.Authorization = `Bearer ${tokenService.accessToken}`;

        return config;
    });

    client.interceptors.response.use(
        (res) => res.data,
        async (error) => {
            throw error.response?.data || error;
        },
    );

    return client;
};

export default createTestHttpClient;
