export interface QuestionModel {
    email: string;
    id: number;
    question: string;
    response: string;
    updatedAt: Date;
    answer: AnswerModel[];
}

export interface AnswerModel {
    mapc: string;
    noidung: string;
    ten: string;
}
