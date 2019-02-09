import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Category extends BaseResourceModel {
    constructor(
        public id?: Number,
        public name?: String,
        public description?: String
    ) {
        super();
    }
}
