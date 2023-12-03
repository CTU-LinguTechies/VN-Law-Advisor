import { DeMucModel } from '@/models/DeMucModel';
import { BaseFilterPagination, PaginationResponse } from '@/models/Pagination';
import createHttpClient from '@/utils/createHttpClient';
import { AxiosInstance } from 'axios';

export interface PDDemucGetAllFilter extends BaseFilterPagination {
    name?: string;
}

class PDDemucService {
    private client: AxiosInstance;

    constructor() {
        this.client = createHttpClient('law/api/v1');
    }

    async getAllByChuDeId(chudeId: string) {
        return (await this.client.get(`/demuc/${chudeId}`)) as any;
    }
    async getAll(filters?: PDDemucGetAllFilter) {
        return (await this.client.get('/demuc', {
            params: filters,
        })) as PaginationResponse<DeMucModel>;
    }
}

export default new PDDemucService() as PDDemucService;
