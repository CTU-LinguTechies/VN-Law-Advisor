import { PDBangModel, PDFileModel, PureDieuModel } from '@/models/DieuModel';
import { BaseFilterPagination, PaginationResponse } from '@/models/Pagination';
import { VBQPPLModel } from '@/models/VBQPPLModel';
import createHttpClient from '@/utils/createHttpClient';
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
        this.recommendationClient = createHttpClient('reccomedation/api/v1/get_recommendations');
    }

    async getAllVBQPPL(filter: VBQPPLGetAllFilter) {
        return (await this.client.get(``, {
            params: filter,
        })) as PaginationResponse<VBQPPLModel>;
    }
    async getOne(id: string) {
        return (await this.client.get(`/${id}`)) as VBQPPLModel;
    }
    async getReccomended(id: string) {
        return (await this.client.get(`/recommended/${id}`)) as VBQPPLModel[];
    }
}

export default new VBQPPLService() as VBQPPLService;
