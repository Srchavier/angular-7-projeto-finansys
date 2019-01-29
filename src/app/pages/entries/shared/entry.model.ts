import { Category } from '../../categories/shared/category.model';

export class Entry {
    constructor(
        public id?: number,
        public nome?: string,
        public description?: string,
        public type?: string,
        public amountd?: string,
        public date?: string,
        public paid?: boolean,
        public categoryId?: number,
        public category?: Category,
    ) {}

    static type = {
        expense: 'Despesa',
        renevue: 'Receita'
    };

    get paidText(): string {
        return this.paid ? 'Pago' : 'Pedente';
    }
}