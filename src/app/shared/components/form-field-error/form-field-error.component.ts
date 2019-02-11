import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{ errorMessage }}
    </p>
  `,
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('form-control') formControl: FormControl;

  constructor() { }

  ngOnInit() {
  }

  public get errorMessage(): string | null {
    if (this.mustShowWeeoeMessage()) {
      return this.getErrorMensage();
    } else {
      return null;
    }
  }

  private mustShowWeeoeMessage(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  getErrorMensage(): string | null {
    if (this.formControl.errors.required) {
      return 'Dado obrigatorio';
    } else if (this.formControl.errors.minlength) {
      const requiredLength = this.formControl.errors.minlength.requiredLength;
      return `deve ter no minimo ${requiredLength} caracteres`;
    } else if (this.formControl.errors.maxlength) {
      const requiredLength = this.formControl.errors.maxlength.requiredLength;
      return `deve ter no minimo ${requiredLength} caracteres`;
    } else if (this.formControl.errors.email) {
      return `E-mail invalido`;
    }
  }
}
