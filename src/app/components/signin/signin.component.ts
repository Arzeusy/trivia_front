import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AuthService} from 'src/app/services/auth.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit {

  @Output() authenticate = new EventEmitter<any>();

  frmAuth!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
     private route: Router,
  ) {
    this.createFrm();
  }

  ngOnInit(): void {
  }

  createFrm() {
    this.frmAuth = this.formBuilder.group({
    email: ['paqui@gmail.com', [Validators.email, Validators.required]],
    password: ['12345', [Validators.required, Validators.minLength(4)]],
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

  async onAuth() {
    let authenticated = await this.authService.signin(this.frmAuth.value.email, this.frmAuth.value.password);
    console.log("info", authenticated)
    if (authenticated) {
      let user = await this.authService.infoUser();
      this.route.navigate(["/"]);
    }
  }

}
