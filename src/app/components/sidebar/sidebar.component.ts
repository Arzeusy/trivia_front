import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger ;
  
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.trigger.closeMenu(); 
  }
}
