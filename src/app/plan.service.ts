import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class PlanService {

  private actionUrl: string;
  private serverUrl: string;

  constructor(private http:Http) { 
    var full_url = (window.location.href).toString();
    var port_cut = full_url.search(':4200');
    var url = full_url.substr(0,port_cut);
    this.serverUrl = url+":3500";
  }

  show_task_by_add_plan(){
    var data = {

    }
    var result = this.http.post(this.serverUrl+'/task/show_task_by_add_plan',data).map(res=>res.json());
    return result;
  }//show_task_by_plan

  show_sub_task_by_add_plan(task_id){
    var data = {
      task_id : task_id
    }
    var result = this.http.post(this.serverUrl+'/task/show_sub_task_by_add_plan',data).map(res=>res.json());
    return result;
  }//show_sub_task_by_add_plan

  add_plan(sub_task){
    var data = {  
      sub_task : sub_task
    }
    var result = this.http.post(this.serverUrl+'/task/add_plan',data).map(res=>res.json());
    return result;
  }//add_plan

  show_task_by_status(status){
    var data = {
      status : status
    }
    var result = this.http.post(this.serverUrl+'/task/show_task_by_status',data).map(res=>res.json());
    return result;
  }//show_task_by_status

  delete_plan(task_id,requirement_id){
    var data = {
      task_id : task_id,
      requirement_id : requirement_id
    }
    var result = this.http.post(this.serverUrl+'/task/delete_plan',data).map(res=>res.json());
    return result;
  }//delete_plan

  show_sub_task_by_update_plan(task_id){
    var data = {
      task_id : task_id,
    }
    var result = this.http.post(this.serverUrl+'/task/show_sub_task_by_update_plan',data).map(res=>res.json());
    return result;
  }//show_sub_task_by_update_plan

}
