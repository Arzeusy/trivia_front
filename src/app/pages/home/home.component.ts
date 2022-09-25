import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(
     private route: Router,
     private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  get authenticated() {
    return this.authService.localInfo;
  }

  goRoute(ruta: string) {
    console.log(this.authenticated)
    if (this.authenticated) {
      this.route.navigate([ruta]);
    } else {
      this.route.navigate(["rank"]);
    }
  }



}
