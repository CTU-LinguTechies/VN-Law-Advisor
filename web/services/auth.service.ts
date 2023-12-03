import { UserState } from '@/store/userSlice';
import createHttpClient from '@/utils/createHttpClient';
import { AxiosInstance } from 'axios';

export interface LoginRequestDto {
    email: string;
    password: string;
}

export interface LoginResponseDto {
    data: UserState & {
        accessToken: string;
        refreshToken: string;
        expiredAt: number;
    };
    message: string;
}
export interface RegisterRequestDto {
    name: string;
    email: string;
    password: string;
}

export interface RegisterResponseDto {
    data: UserState & {
        accessToken: string;
        refreshToken: string;
        expiredAt: number;
    };
    message: string;
}

export interface CheckUserRequestDto {
    data: UserState;
}

export interface CheckUserResponseDto {
    isUser: boolean;
}

export interface RefreshTokenRequestDto {
    refreshToken: string;
}

export interface RefreshTokenResponseDto {
    accessToken: string;
    expirationTime: number;
}

class AuthService {
    private client: AxiosInstance;

    constructor() {
        this.client = createHttpClient('auth/api/v1');
    }

    async register(body: RegisterRequestDto) {
        return (await this.client.post('/register', body)) as RegisterResponseDto;
    }

    async login(body: LoginRequestDto) {
        return (await this.client.post('/login', body)) as LoginResponseDto;
    }

    async identify() {
        return (await this.client.post('/validate')) as CheckUserRequestDto;
    }

    async refreshToken(body: RefreshTokenRequestDto) {
        return (await this.client.post('/refresh-token', body)) as RefreshTokenResponseDto;
    }

    async logout(body: RefreshTokenRequestDto) {
        return await this.client.post('/logout', body);
    }
}

export default new AuthService() as AuthService;
