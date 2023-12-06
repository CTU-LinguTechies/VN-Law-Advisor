import { PDBangModel, PDFileModel, PureDieuModel } from '@/models/DieuModel';
import { BaseFilterPagination, PaginationResponse } from '@/models/Pagination';
import createHttpClient from '@/utils/createHttpClient';
import { AxiosInstance } from 'axios';

export interface PDTableGetAllFilter extends BaseFilterPagination {
    name?: string;
}

class PDTableService {
    private client: AxiosInstance;

    constructor() {
        this.client = createHttpClient('law/api/v1/table');
    }

    async getAllTable(filter: PDTableGetAllFilter) {
        return (await this.client.get(``, {
            params: filter,
        })) as PaginationResponse<PDBangModel>;
    }
}

export default new PDTableService() as PDTableService;
