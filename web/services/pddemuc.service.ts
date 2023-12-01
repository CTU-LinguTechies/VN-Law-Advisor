import createHttpClient from '@/utils/createHttpClient';
import { AxiosInstance } from 'axios';

class PDDemucService {
    private client: AxiosInstance;

    constructor() {
        this.client = createHttpClient('law/api/v1');
    }

    async getAllByChuDeId(chudeId: string) {
        return (await this.client.get(`/demuc/${chudeId}`)) as any;
    }
}

export default new PDDemucService() as PDDemucService;
