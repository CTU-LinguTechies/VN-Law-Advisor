export interface DieuModel {
    mapc: string;
    ten: string;
    stt: number;
    noidung: string;
    chimuc: number;
    vbqppl: string;
    vbqpplLink: string;
    bangs: PDBangModel[];
    files: PDFileModel[];
}

export interface PDFileModel {
    link: string;
    path: string;
}
export interface PDBangModel {
    id: string;
    html: string;
}

export interface PureDieuModel {
    mapc: string;
    ten: string;
    stt: number;
    noidung: string;
    chimuc: number;
    vbqppl: string;
    vbqpplLink: string;
}
