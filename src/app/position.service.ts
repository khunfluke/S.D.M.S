import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class PositionService {

  private actionUrl: string;
  private serverUrl: string;

  constructor(private http:Http) { 
    var full_url = (window.location.href).toString();
    var port_cut = full_url.search(':4200');
    var url = full_url.substr(0,port_cut);
    this.serverUrl = url+":3500";
  }

  add_position(position_name){
    var data = {
      position_name : position_name
    }
    var result = this.http.post(this.serverUrl+'/position/add_position',data).map(res=>res);
    return result;
  }//add_position

  show_position(){
    var data = {
    }
    var result = this.http.post(this.serverUrl+'/position/show_position',data).map(res=>res.json());
    return result;
  }//show_position

  delete_position(position_id){
    var data = {
      position_id : position_id
    }
    var result = this.http.post(this.serverUrl+'/position/delete_position',data).map(res=>res.json());
    return result;
  }//delete_position

  update_position(position_id,position_name){
    var data = {
      position_id : position_id,
      position_name : position_name
    }
    var result = this.http.post(this.serverUrl+'/position/update_position',data).map(res=>res.json());
    return result;
  }

}
