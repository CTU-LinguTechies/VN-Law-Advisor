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
    accessToken: string;
    refreshToken: string;
    expirationTime: number;
}

export interface SocialLoginDto {
    accessToken: string;
}

export interface CheckUserRequestDto {
    accessToken: string;
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

    async socialLogin(body: LoginRequestDto) {
        return (await this.client.post('/social-login', body)) as LoginResponseDto;
    }

    async register(body: RegisterRequestDto) {
        return (await this.client.post('/register', body)) as RegisterResponseDto;
    }

    async checkUser(body: CheckUserRequestDto) {
        return (await this.client.post('/check-user', body)) as CheckUserResponseDto;
    }

    async identify() {
        return (await this.client.get('/identity')) as UserState;
    }

    async refreshToken(body: RefreshTokenRequestDto) {
        return (await this.client.post('/refresh-token', body)) as RefreshTokenResponseDto;
    }

    async logout(body: RefreshTokenRequestDto) {
        return await this.client.post('/logout', body);
    }
}

export default new AuthService() as AuthService;
