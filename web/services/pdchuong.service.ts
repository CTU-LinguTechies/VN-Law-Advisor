import createHttpClient from '@/utils/createHttpClient';
import { AxiosInstance } from 'axios';

class PDChuongService {
    private client: AxiosInstance;

    constructor() {
        this.client = createHttpClient('law/api/v1');
    }

    async getAllByDemucId(demucId: string) {
        return (await this.client.get(`/chuong/${demucId}`)) as any;
    }
}

export default new PDChuongService() as PDChuongService;
