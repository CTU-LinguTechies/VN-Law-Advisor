import { UserState } from '@/store/userSlice';
import createHttpClient from '@/utils/createHttpClient';
import { AxiosInstance } from 'axios';

export interface LoginRequestDto {
    accessToken: string;
}

export interface LoginResponseDto {
    accessToken: string;
    refreshToken: string;
    expirationTime: number;
}
export interface RegisterRequestDto {
    userRole: 'APPLICANT' | 'RECRUITER';
    fullName: string;
    phoneNumber: string;
    accessToken: string;
    dob: string;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
}

export interface RegisterResponseDto {
    name: string;
    email: string;
    phonenum: string;
    password: string;
}

export interface CheckUserRequestDto {
    data: {
        id: string;
        email: string;
        name: string;
        phonenum: string;
        role: string;
        iat: number;
        exp: number;
    };
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
        this.client = createHttpClient('auth');
    }

    async register(body: RegisterRequestDto) {
        return (await this.client.post('/register', body)) as RegisterResponseDto;
    }

    async identify() {
        return (await this.client.get('/validate')) as CheckUserRequestDto;
    }

    async refreshToken(body: RefreshTokenRequestDto) {
        return (await this.client.post('/refresh-token', body)) as RefreshTokenResponseDto;
    }

    async logout(body: RefreshTokenRequestDto) {
        return await this.client.post('/logout', body);
    }
}

export default new AuthService() as AuthService;
