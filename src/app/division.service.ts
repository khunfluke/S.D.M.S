import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class DivisionService {

  private actionUrl: string;
  private serverUrl: string;

  constructor(private http:Http) { 
    var full_url = (window.location.href).toString();
    var port_cut = full_url.search(':4200');
    var url = full_url.substr(0,port_cut);
    this.serverUrl = url+":3500";
  }

  show_division(){
    var data = {};
    var result = this.http.post(this.serverUrl+'/division/show_division',data).map(res=>res.json());
    return result;
  }//show_division

  add_division(division_name,department_id){
    var data = {
      division_name : division_name,
      department_id : department_id
    }
    var result = this.http.post(this.serverUrl+'/division/add_division',data).map(res=>res);
    return result;
  }//add_division

  delete_division(division_id){
    var data = {
      division_id : division_id
    }
    var result = this.http.post(this.serverUrl+'/division/delete_division',data).map(res=>res);
    return result;
  }//delete_division

  update_division(division_id,division_name,department_id){
    var data = {
      division_id : division_id,
      division_name : division_name,
      department_id : department_id
    }
    var result = this.http.post(this.serverUrl+'/division/update_division',data).map(res=>res);
    return result;
  }//update_division

}
