import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataBase implements InMemoryDbService {

    createDb() {
        const categories = [
            {id: 1, name: 'Lazer', description: 'Pagamentos de Contas'},
            {id: 2, name: 'Saúde', description: 'Plano de Saúde e Remédios'},
            {id: 3, name: 'Moradia', description: 'Cimena, parques, festa etc.'},
            {id: 4, name: 'Salário', description: 'Recebimento do salário'},
            {id: 5, name: 'Freelas', description: 'Trabalhando como freelancer'},
        ];

        return { categories };
    }
}
