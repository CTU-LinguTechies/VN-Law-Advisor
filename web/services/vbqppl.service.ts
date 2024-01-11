import { PDBangModel, PDFileModel, PureDieuModel } from '@/models/DieuModel';
import { BaseFilterPagination, PaginationResponse } from '@/models/Pagination';
import { VBQPPLModel } from '@/models/VBQPPLModel';
import createHttpClient from '@/utils/createHttpClient';
import createTestHttpClient from '@/utils/createTestHttpClient';
import { AxiosInstance } from 'axios';

export interface VBQPPLGetAllFilter extends BaseFilterPagination {
    name?: string;
    loai?: string;
}

class VBQPPLService {
    private client: AxiosInstance;
    private recommendationClient: AxiosInstance;

    constructor() {
        this.client = createHttpClient('law/api/v1/vbpl');
        this.recommendationClient = createHttpClient('recommend/api/v1');
        // this.recommendationClient = createTestHttpClient('api/v1');
    }

    async getAllVBQPPL(filter: VBQPPLGetAllFilter) {
        return (await this.client.get(``, {
            params: filter,
        })) as PaginationResponse<VBQPPLModel>;
    }
    async getOne(id: string) {
        return (await this.client.get(`/${id}`)) as VBQPPLModel;
    }
    async getReccomended(filter: any) {
        return (await this.recommendationClient.post(`/get_recommendations`, filter)) as any;
    }
}

export default new VBQPPLService() as VBQPPLService;
