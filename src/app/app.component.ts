import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet><spinner></spinner></router-outlet>'
})
export class AppComponent {

  private username;

  constructor(private router:Router) {
    this.username = localStorage.getItem('Username');
    if(this.username == null){
      this.router.navigateByUrl('/');
    }
  }
}