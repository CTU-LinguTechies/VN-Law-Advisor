import createHttpClient from '@/utils/createHttpClient';
import tokenService from '@/utils/tokenService';
import { AxiosInstance } from 'axios';

export interface QnARequestDto {
    question: string;
}

export interface QnAResponseDto {
    citation: string[];
    question: string;
    response: string;
    status: string;
    topic_ids: string[];
}

class QnAService {
    private client: AxiosInstance;

    constructor() {
        this.client = createHttpClient('qna/api/v1');
    }

    async answer(body: any) {
        return (await this.client.post('/question', body)) as any;
    }
    async getAllQuestions() {
        const accessToken = tokenService.accessToken;
    }
}

export default new QnAService() as QnAService;
