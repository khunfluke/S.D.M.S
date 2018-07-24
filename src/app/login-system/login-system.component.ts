import { Component, OnInit } from '@angular/core';
import { Text } from '@angular/compiler';
import {LoginSystemService} from '../login-system.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-login-system',
  providers: [LoginSystemService],
  templateUrl: './login-system.component.html',
  styleUrls: ['./login-system.component.css']
})
export class LoginSystemComponent implements OnInit {

  public username: string;
  public password: string;
  constructor(private loginSystemService:LoginSystemService,private router:Router) { }

  ngOnInit() {
    var i = localStorage.length;
      while(i--) {
        var key = localStorage.key(i);
        localStorage.removeItem(key);

    }
    
    this.loginSystemService.getLanguage().subscribe(res2=>{
      localStorage.setItem('Word', JSON.stringify(res2.json()));
      localStorage.setItem('Lang', 'en');
    })
  }

  login(){
    this.loginSystemService.checkLogin(this.username,this.password).subscribe(res=>{
      if(res == ''){
        swal({
          title: 'warning!',
          text: 'Please check your username and password again.',
          type: 'warning',
          confirmButtonText: 'OK',
          allowOutsideClick: true
        });
      }else{
        localStorage.setItem('Username',res[0].username);
        localStorage.setItem('Employee_id',res[0].employee_id);
        localStorage.setItem('First_name',res[0].first_name);
        localStorage.setItem('Last_name',res[0].last_name);
        this.router.navigateByUrl('/requirement');
      }
      
    })
  }

}
