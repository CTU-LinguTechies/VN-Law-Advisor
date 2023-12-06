import { PDBangModel, PDFileModel, PureDieuModel } from '@/models/DieuModel';
import { BaseFilterPagination, PaginationResponse } from '@/models/Pagination';
import { VBQPPLModel } from '@/models/VBQPPLModel';
import createHttpClient from '@/utils/createHttpClient';
import { AxiosInstance } from 'axios';

export interface VBQPPLGetAllFilter extends BaseFilterPagination {
    deMucId?: string;
}

class VBQPPLService {
    private client: AxiosInstance;

    constructor() {
        this.client = createHttpClient('law/api/v1/phapdien-vbpl');
    }

    async getAllVBQPPLChuaPhapDien(filter: VBQPPLGetAllFilter) {
        return (await this.client.get(``, {
            params: filter,
        })) as any;
    }
}

export default new VBQPPLService() as VBQPPLService;
