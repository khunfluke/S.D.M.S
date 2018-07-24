import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class BusunessTypeService {

  private actionUrl: string;
  private serverUrl: string;

  constructor(private http:Http) { 
    var full_url = (window.location.href).toString();
    var port_cut = full_url.search(':4200');
    var url = full_url.substr(0,port_cut);
    this.serverUrl = url+":3500";
  }


  show_business_type(){
    var data = {
    }
    var result = this.http.post(this.serverUrl+'/business_type/show_business_type',data).map(res=>res.json());
    return result;
  }

  add_business_type(business_type:string){
    var data = {
      business_type : business_type
    }
    var result = this.http.post(this.serverUrl+'/business_type/add_business_type',data).map(res=>res);
    return result;
  }

  delete_business_type(id:number){
    var data = {
      id : id
    }
    var result = this.http.post(this.serverUrl+'/business_type/delete_business_type',data).map(res=>res);
    return result;
  }

  update_business_type(id:number, name:string){
    var data = {
      id : id,
      name : name
    }
    var result = this.http.post(this.serverUrl+'/business_type/update_business_type',data).map(res=>res);
    return result;
  }//update_business_type


}
