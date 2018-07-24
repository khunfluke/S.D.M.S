import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RouterStateSnapshot,Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginSystemService {

  private actionUrl: string;
  private serverUrl: string;
  constructor(private http:Http,private router:Router) { 
    var full_url = (window.location.href).toString();
    var port_cut = full_url.search(':4200');
    var url = full_url.substr(0,port_cut);
    this.serverUrl = url+":3500";
  }
  
  checkLogin(username:string,password:string){
    var data = {
      username : username,
      password : password
    }
    var result = this.http.post(this.serverUrl+'/login/check_login',data).map(res=>res.json());
    return result;
  }

  getLanguage(){
    var data = {
    }
    return this.http.post(this.serverUrl+'/api/lang',data);
  }

}
