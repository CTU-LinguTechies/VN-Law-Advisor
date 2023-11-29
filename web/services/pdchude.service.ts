import createHttpClient from '@/utils/createHttpClient';
import { AxiosInstance } from 'axios';

class PDChuDeService {
    private client: AxiosInstance;

    constructor() {
        this.client = createHttpClient('law/api/v1');
    }

    async getAll() {
        return (await this.client.get('/chude')) as any;
    }
}

export default new PDChuDeService() as PDChuDeService;
