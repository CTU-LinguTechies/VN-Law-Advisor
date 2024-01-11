export interface VBQPPLModel {
    id: number;
    noidung: string;
    loai: string;
    ten: string;
}

export interface DieuVBQPPLChuaPDModel {
    id: number;
    noidung: string;
    ten: string;
    loai: string;
    vbpl: {
        id: number;
        ten: string;
        noidung: string;
        loai: string;
    };
}
