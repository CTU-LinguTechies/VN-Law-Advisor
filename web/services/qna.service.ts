import { QuestionModel } from '@/models/ChatAnswerModel';
import createHttpClient from '@/utils/createHttpClient';
import createTestHttpClient from '@/utils/createTestHttpClient';
import { AxiosInstance } from 'axios';

export interface QnARequestDto {
    question: string;
}

export interface QnAResponseDto {
    citation: CitationModel[];
    question: string;
    response: string;
    status: string;
}

export interface CitationModel {
    mapc: string;
    noidung: string;
    ten: string;
}

class QnAService {
    private client: AxiosInstance;

    constructor() {
        this.client = createHttpClient('qna/api/v1');
        // this.client = createTestHttpClient('/api/v1');
    }

    async answer(body: any) {
        return (await this.client.post('/question', body)) as any;
    }
    async getQuestions() {
        return (await this.client.get('/question')) as QuestionModel[];
    }
}

export default new QnAService() as QnAService;
