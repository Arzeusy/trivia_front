import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  visiblefrm = false;

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger ;
  
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(event: any) {
    console.log(event)
    this.trigger.closeMenu(); 
  }
}
