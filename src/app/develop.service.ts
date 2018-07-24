import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class DevelopService {

  private actionUrl: string;
  private serverUrl: string;

  constructor(private http:Http) { 
    var full_url = (window.location.href).toString();
    var port_cut = full_url.search(':4200');
    var url = full_url.substr(0,port_cut);
    this.serverUrl = url+":3500";
  }

  add_develop(sub_task){
    var data = {
      sub_task : sub_task
    };
    var result = this.http.post(this.serverUrl+'/task/add_develop',data).map(res=>res.json());
    return result;
  }//add_develop

  show_develop(){
    var data = {
      status : 3
    };
    var result = this.http.post(this.serverUrl+'/task/show_task_by_status',data).map(res=>res.json());
    return result;
  }//add_develop

  delete_develop(task_id){
    var data = {
      task_id : task_id
    };
    var result = this.http.post(this.serverUrl+'/task/delete_develop',data).map(res=>res.json());
    return result;
  }//delete_develop

}
