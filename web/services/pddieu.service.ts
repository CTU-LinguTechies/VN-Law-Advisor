import createHttpClient from '@/utils/createHttpClient';
import { AxiosInstance } from 'axios';

class PDDieuService {
    private client: AxiosInstance;

    constructor() {
        this.client = createHttpClient('law/api/v1');
    }

    async getAllByChuongId(chuongId: string) {
        return (await this.client.get(`/dieu/${chuongId}`)) as any;
    }
}

export default new PDDieuService() as PDDieuService;
