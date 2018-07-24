import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class StaffService {
  
  private actionUrl: string;
  private serverUrl: string;

  constructor(private http:Http) { 
    var full_url = (window.location.href).toString();
    var port_cut = full_url.search(':4200');
    var url = full_url.substr(0,port_cut);
    this.serverUrl = url+":3500";
  }

  show_staff(){
    var data = {
    }
    var result = this.http.post(this.serverUrl+'/staff/show_staff',data).map(res=>res.json());
    return result;
  }//show_staff

  show_staff_by_id(id){
    var data = {
      employee_id : id
    }
    var result = this.http.post(this.serverUrl+'/staff/show_staff_by_id',data).map(res=>res.json());
    return result;
  }//show_staff_by_id

  add_staff(fname,lname,ecode,dv_id,dp_id,p_id,address,phone_num,email,username,password){
    var data = {
      first_name : fname,
      last_name : lname,
      employee_code : ecode,
      division_id : dv_id,
      address : address,
      phone_number : phone_num,
      email : email,
      username : username,
      password: password,
      position_id : p_id
    }
    var result = this.http.post(this.serverUrl+'/staff/add_staff',data).map(res=>res.json());
    return result;
  }//add_staff

  update_staff(em_id,fname,lname,ecode,dv_id,dp_id,p_id,address,phone_num,email,username,password){
    var data = {
      employee_id : em_id,
      first_name : fname,
      last_name : lname,
      employee_code : ecode,
      division_id : dv_id,
      address : address,
      phone_number : phone_num,
      email : email,
      username : username,
      password: password,
      position_id : p_id
    }
    var result = this.http.post(this.serverUrl+'/staff/update_staff',data).map(res=>res.json());
    return result;
  }//update_staff

  delete_staff(employee_id){
    var data = {
      employee_id : employee_id
    }
    var result = this.http.post(this.serverUrl+'/staff/delete_staff',data).map(res=>res.json());
    return result;
  }//delete

}
