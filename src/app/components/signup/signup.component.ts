import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms'
 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {

  @Output() createuser = new EventEmitter<any>();
  frm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { this.createFrm() }

  ngOnInit(): void {
  }

  createFrm() {
    this.frm = this.formBuilder.group({
      nickname: [null, [Validators.minLength(7), Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4)]],
    });

  }

  getFormValidationErrors(key: string):string {
    const control = this.frm.get(key);
    const controlErrors = control?.errors;
    if (controlErrors != null && control?.invalid && control?.touched) {
      let err:string = ""
      Object.keys(controlErrors).forEach(keyError => {
        // console.log('Key control: ' + key + ', : ' + keyError + ', err value: ', controlErrors[keyError]);
        return "Requerido"
      });
      return "Requerido";
    }
    return "";
  }

  onAuth() {
    this.createuser.emit(this.frm.value);
  }


}
