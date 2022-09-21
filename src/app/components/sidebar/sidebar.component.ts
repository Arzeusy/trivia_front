import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService} from 'src/app/services/auth.service'

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  visiblefrm = true;

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger ;
  
  constructor(
    private authService: AuthService,
     private route: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(event: any) {
    console.log(event)

    

    this.trigger.closeMenu(); 
  }

  get obtNickname() {
    // console.log("this.authService.localuser", this.authService.localuser)
    return this.authService.localuser ? this.authService.localuser : "";
  }

  verFrm() {
    this.visiblefrm = !this.visiblefrm;
  }

  goRoute(ruta: string) {
    this.route.navigate([ruta]);
  }

}
