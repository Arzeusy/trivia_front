import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AuthService} from 'src/app/services/auth.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
 
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
    private _snackBar: MatSnackBar
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

  async onAuth() {
    let authenticated = await this.authService.signin(this.frmAuth.value.email, this.frmAuth.value.password);
    
    if (authenticated) {
      let user = await this.authService.infoUser();
      this.route.navigate(["/"]);
    } else {
       this._snackBar.open('Error de autenticacion, Email o  Contraseña', 'Cerrar', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 5 * 1000,
      });
    }
  }

  cancelarfrm() {
    this.createFrm();
    this.authenticate.emit(true);

  }
}
