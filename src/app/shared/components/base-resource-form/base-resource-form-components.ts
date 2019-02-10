import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import toastr from 'toastr';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

    currentAction: string;
    resourceForm: FormGroup;
    pageTitle: string;
    serverErrorMessagens: string[] = null;
    submittingForm: Boolean = false;

    protected route: ActivatedRoute;
    protected router: Router;
    protected formBuilder: FormBuilder;

    constructor(
        protected injector: Injector,
        public resource: T,
        protected resourceService: BaseResourceService<T>,
        protected jsonDataToResourceFn: (jsonData) => T
    ) {
        this.route = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
        this.formBuilder = injector.get(FormBuilder);
    }

    ngOnInit() {
        this.setCurrentAction();
        // this.builderResourceForm();
        this.loadResource();
    }

    ngAfterContentChecked(): void {
        this.setPageTitle();
    }

    submitForm() {
        this.submittingForm = true;
        if (this.currentAction === 'new') {
            this.createResource();
        } else {
            this.updateResource();
        }
    }

    /* PRIVATE METHODS */

    protected setCurrentAction(): any {
        if (this.route.snapshot.url[0].path === 'new') {
            this.currentAction = 'new';
        } else {
            this.currentAction = 'edit';
        }
    }

    protected loadResource(): any {
        if (this.currentAction === 'edit') {
            this.route.paramMap.pipe(
                switchMap(params => this.resourceService.getById(+params.get('id')))
            ).subscribe(
                (resource) => {
                    this.resource = resource;
                    this.resourceForm.patchValue(resource);
                },
                (error) => alert('Ocorreu um error no servidor, tente mais tarde!')
            );
        }
    }

    protected setPageTitle(): any {
        if (this.currentAction === 'new') {
            this.pageTitle = this.creationPageTitle();
        } else {
            this.pageTitle = this.editionPageTitle();
        }
    }

    protected creationPageTitle(): string {
        return 'Novo';
    }

    protected editionPageTitle(): string {
        return 'Edição';
    }

    protected createResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value.bind(this));
        this.resourceService.create(resource)
            .subscribe(
                // tslint:disable-next-line:no-shadowed-variable
                resource => this.actionsForSuccess(resource),
                error => this.actionsForError(error)
            );
    }

    protected updateResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value.bind(this));
        this.resourceService.update(resource)
            .subscribe(
                newResource => this.actionsForSuccess(newResource),
                error => this.actionsForError(error)
            );
    }

    protected actionsForSuccess(resource: T) {
        toastr.success('Solicitação processada com sucesso!');
        const baseComponentPath: string = this.route.snapshot.parent.url[0].path;
        this.router.navigateByUrl(baseComponentPath, { skipLocationChange: true }).then(
            () => this.router.navigate([baseComponentPath, resource.id, 'edit'])
        );
    }

    protected actionsForError(error: any): void {
        toastr.error('Ocorreu um erro ao processar sua solicitação!');
        this.submittingForm = false;

        if (error.status === 422) {
            this.serverErrorMessagens = JSON.parse(error._body).errors;
        } else {
            this.serverErrorMessagens = ['Falha na comunicação com o servidor. Por favor tente mais tarde'];
        }
    }

    protected abstract builderResourceForm(): void;
}
