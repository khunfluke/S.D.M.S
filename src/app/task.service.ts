import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

  private actionUrl: string;
  private serverUrl: string;

  constructor(private http:Http) { 
    var full_url = (window.location.href).toString();
    var port_cut = full_url.search(':4200');
    var url = full_url.substr(0,port_cut);
    this.serverUrl = url+":3500";
  }

  show_task_status(){
    var data = {
    }
    var result = this.http.post(this.serverUrl+'/task/show_task_status',data).map(res=>res.json());
    return result;
  }//show_task_status

  show_requirement_by_open_task(){
    var data = {

    }
    var result = this.http.post(this.serverUrl+'/task/show_requirement_by_open_task',data).map(res=>res.json());
    return result;
  }//show_requirement_by_open_task

  add_task(requirement_id,status,import_date,expect_start_date,expect_end_date,deadline,primary_responsibility,difficulty_level){
    var data = {
      requirement_id : requirement_id,
      status : status,
      import_date : import_date,
      expect_start_date : expect_start_date,
      expect_end_date : expect_end_date,
      deadline : deadline,
      primary_responsibility : primary_responsibility,
      difficulty_level : difficulty_level
    }
    var result = this.http.post(this.serverUrl+'/task/add_task',data).map(res=>res.json());
    return result;
  }//add_task

  add_sub_task(sub_task,task_id){
    var data = {
      sub_task : sub_task,
      task_id : task_id
    }
    var result = this.http.post(this.serverUrl+'/task/add_sub_task',data).map(res=>res.json());
    return result;
  }//add_sub_task

  show_task(){
    var data = {
    }
    var result = this.http.post(this.serverUrl+'/task/show_task',data).map(res=>res.json());
    return result;
  }//show_task

  show_task_by_reject(task_id){
    var data = {
      task_id : task_id
    }
    var result = this.http.post(this.serverUrl+'/task/show_task_by_reject',data).map(res=>res.json());
    return result;
  }//show_task_by_reject

  show_task_by_update(task_id){
    var data = {
      task_id : task_id
    }
    var result = this.http.post(this.serverUrl+'/task/show_task_by_update',data).map(res=>res.json());
    return result;
  }//show_task_by_update

  update_status_task(task_id,status){
    var data = {
      task_id : task_id,
      status : status
    }
    var result = this.http.post(this.serverUrl+'/task/update_status_task',data).map(res=>res.json());
    return result;
  }//update_status_task

  delete_task(task_id){
    var data = {
      task_id : task_id,
    }
    var result = this.http.post(this.serverUrl+'/task/delete_task',data).map(res=>res.json());
    return result;

  }//delete_task

  show_task_id_by_delete_reject(requirement_id,task_id){
    var data = {
      requirement_id : requirement_id,
      task_id : task_id
    }
    var result = this.http.post(this.serverUrl+'/task/show_task_id_by_delete_reject',data).map(res=>res.json());
    return result;
  }//show_task_by_delete_reject

  update_task(task_id,requirement_id,status,import_date,expect_start_date,expect_end_date,deadline,primary_responsibility,difficulty_level){
    var data = {
      task_id : task_id,
      requirement_id : requirement_id,
      status : status,
      import_date : import_date,
      expect_start_date : expect_start_date,
      expect_end_date : expect_end_date,
      deadline : deadline,
      primary_responsibility : primary_responsibility,
      difficulty_level : difficulty_level
    }
    var result = this.http.post(this.serverUrl+'/task/update_task',data).map(res=>res.json());
    return result;
  }//update_task

  delete_sub_task_by_task_id(task_id){
    var data = {
      task_id : task_id
    }
    var result = this.http.post(this.serverUrl+'/task/delete_sub_task_by_task_id',data).map(res=>res.json());
    return result;
  }//delete_sub_task_by_task_id

  show_sub_task_by_employee_id(employee_id){
    var data = {
      employee_id : employee_id
    }
    var result = this.http.post(this.serverUrl+'/task/show_sub_task_by_employee_id',data).map(res=>res.json());
    return result;
  }//show_sub_task_by_employee_id

  show_task_by_status(status){
    var data = {
      status : status
    }
    var result = this.http.post(this.serverUrl+'/task/show_task_by_status',data).map(res=>res.json());
    return result;
  }//show_task_by_status

  show_sub_task_by_task_id(task_id){
    var data = {
      task_id : task_id
    }
    var result = this.http.post(this.serverUrl+'/task/show_sub_task_by_task_id',data).map(res=>res.json());
    return result;
  }

  show_task_by_status_progress(status,progress){
    var data = {
      status : status,
      progress : progress
    }
    var result = this.http.post(this.serverUrl+'/task/show_task_by_status_progress',data).map(res=>res.json());
    return result;
  }//show_task_by_status

  update_sub_task(sub_task_id,test_result){
    var data = {
      sub_task_id : sub_task_id,
      test_result : test_result,
    }
    var result = this.http.post(this.serverUrl+'/task/update_test_result',data).map(res=>res.json());
    return result;
  }//update_task

  show_test_requirement_id(task_id){
     var data = {
      task_id : task_id
     }
     var result = this.http.post(this.serverUrl+'/task/show_test_requirement_id',data).map(res=>res.json());
    return result;
  }//show_test_episode_requirement_id

  show_test_episode_task(requirement_id){
    var data = {
      requirement_id : requirement_id
     }
     var result = this.http.post(this.serverUrl+'/task/show_test_episode_task',data).map(res=>res.json());
     return result;
  }

}
