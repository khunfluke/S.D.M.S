import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class DepartmentService {

  private actionUrl: string;
  private serverUrl: string;
  constructor(private http:Http) { 
    var full_url = (window.location.href).toString();
    var port_cut = full_url.search(':4200');
    var url = full_url.substr(0,port_cut);
    this.serverUrl = url+":3500";
  }

  show_department(){
    var data = {
    }
    var result = this.http.post(this.serverUrl+'/department/show_department',data).map(res=>res.json());
    return result;
  }

  add_department(department:string){
    var data = {
      department : department
    }
    var result = this.http.post(this.serverUrl+'/department/add_department',data).map(res=>res);
    return result;
  }

  delete_department(id:number){
    var data = {
      id : id
    }
    var result = this.http.post(this.serverUrl+'/department/delete_department',data).map(res=>res);
    return result;
  }

  update_department(id:number, name:string){
    var data = {
      id : id,
      name : name
    }
    var result = this.http.post(this.serverUrl+'/department/update_department',data).map(res=>res);
    return result;
  }//update_department


}
