import createHttpClient from '@/utils/createHttpClient';
import { AxiosInstance } from 'axios';

class PDDieuService {
    private client: AxiosInstance;

    constructor() {
        this.client = createHttpClient('law/api/v1');
    }

    async getAllByChuongId(chuongId: string, page?: number, size?: number) {
        return (await this.client.get(`/dieu/${chuongId}`, {
            params: {
                pageNo: page,
            },
        })) as any;
    }
}

export default new PDDieuService() as PDDieuService;
