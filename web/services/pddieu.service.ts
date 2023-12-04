import { PDBangModel, PDFileModel, PureDieuModel } from '@/models/DieuModel';
import { BaseFilterPagination, PaginationResponse } from '@/models/Pagination';
import createHttpClient from '@/utils/createHttpClient';
import { AxiosInstance } from 'axios';

export interface PDDieuGetAllFilter extends BaseFilterPagination {
    name?: string;
    deMucId?: string;
}

export interface PDListTableAndForms {
    bangs: PDBangModel[];
    files: PDFileModel[];
}

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
    async getDieuTreeViewByMapc(mapc: string) {
        return (await this.client.get(`/dieu/tree/${mapc}`)) as any;
    }
    async getFilter(filter: PDDieuGetAllFilter) {
        return (await this.client.get(`/dieu/filter`, {
            params: filter,
        })) as PaginationResponse<PureDieuModel>;
    }
    async getListTableAndForms(mapc: string) {
        return (await this.client.get(`/dieu/form/${mapc}`)) as PDListTableAndForms;
    }
}

export default new PDDieuService() as PDDieuService;
