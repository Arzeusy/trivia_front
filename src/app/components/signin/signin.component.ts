import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

 
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
 
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit {

  @Output() authenticate = new EventEmitter<any>();

  frmAuth!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createFrm();
  }

  ngOnInit(): void {
  }

  createFrm() {
    this.frmAuth = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
     });
    
  }

  getErrorMessageEmail() {
    if (this.frmAuth.get("email")?.hasError('required')) {
      return 'requerido';
    }
    return this.frmAuth.get("email")?.hasError('email') ? 'Email invalido' : '';
  }

  getErrorMessagePass() {
    if (this.frmAuth.get("password")?.hasError('required')) {
      return 'requerido';
    }
    return this.frmAuth.get("password")?.hasError('minlength') ? 'Password invalido' : '';
  }

  onAuth() {
    this.authenticate.emit(this.frmAuth.value);
  }

}
