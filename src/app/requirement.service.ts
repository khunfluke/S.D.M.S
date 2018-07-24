import { Injectable } from '@angular/core';
import { Http, Headers,Response,RequestOptions} from '@angular/http';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { RouterStateSnapshot } from '@angular/router';
import {Observable} from 'rxjs'
import 'rxjs/add/operator/map';
import 'rxjs/Rx' ;

@Injectable()
export class RequirementService {

  private actionUrl: string;
  private serverUrl: string;

  constructor(private http:Http) { 
    var full_url = (window.location.href).toString();
    var port_cut = full_url.search(':4200');
    var url = full_url.substr(0,port_cut);
    this.serverUrl = url+":3500";
  }

  show_requirement(){
    var data = {
    }
    var result = this.http.post(this.serverUrl+'/requirement/show_requirement',data).map(res=>res.json());
    return result;
  }//show_requirement

  add_requirement(program_name,version,want,date_of_notification,detail,document,company_id,employee_id,requirement_no,program_support){
    var data = {
      program_name: program_name,
      version: version,
      want: want,
      date_of_notification: date_of_notification,
      detail: detail,
      document: document,
      company_id: company_id,
      employee_id: employee_id,
      requirement_no: requirement_no,
      program_support: program_support
    }
    var result = this.http.post(this.serverUrl+'/requirement/add_requirement',data).map(res=>res.json());
    return result;
  }//add_requirement

  upload_file(id,file){
    var data = {
      id : id,
      file : file
    }
    var result = this.http.post(this.serverUrl+'/requirement/upload_file',data).map(res=>res.json());
    return result;
  }//upload_file

  show_requirement_by_id(id){
    var data = {
      id : id
    }
    var result = this.http.post(this.serverUrl+'/requirement/show_requirement_by_id',data).map(res=>res.json());
    return result;
  }//show_requirement_by_id

  update_requirement(require_id,program_name,version,want,date_of_notification,detail,document,company_id,employee_id,requirement_no,program_support){
    var data = {
      require_id : require_id,
      program_name: program_name,
      version: version,
      want: want,
      date_of_notification: date_of_notification,
      detail: detail,
      document: document,
      company_id: company_id,
      employee_id: employee_id,
      requirement_no: requirement_no,
      program_support: program_support
    }
    var result = this.http.post(this.serverUrl+'/requirement/update_requirement',data).map(res=>res.json());
    return result;
  }//update_requirement

  delete_requirement(requirement_id){
    var data = {
      requirement_id : requirement_id
    }
    var result = this.http.post(this.serverUrl+'/requirement/delete_requirement',data).map(res=>res.json());
    return result;
  }//delete_requirement

  show_requirement_by_approve(){
    var data = {
    }
    var result = this.http.post(this.serverUrl+'/requirement/show_requirement_by_approve',data).map(res=>res.json());
    return result;
  }//show_requirement_by_approve

  remove_file(file_name){
    var data = {
      file_name : file_name
    }
    var result = this.http.post(this.serverUrl+'/upload/remove_file',data).map(res=>res.json());
    return result;
  }//remove_file

  download(file_name){
    var data = {
      file_name : file_name
    }
    var headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    var options: RequestOptions = new RequestOptions({ headers: headers,responseType: 3});
    var result = this.http.post(this.serverUrl+'/upload/download',data,options);
    return result;
  }//download

  update_status(status,requirement_id){
    var data = {
      status : status,
      requirement_id : requirement_id
    }
    var result = this.http.post(this.serverUrl+'/requirement/update_status',data).map(res=>res.json());
    return result;

  }//update_status

  show_requirement_by_import_development(requirement_id){
    var data = {
      requirement_id: requirement_id
    }
    var result = this.http.post(this.serverUrl+'/requirement/show_requirement_by_import_development',data).map(res=>res.json());
    return result;
  }//show_requirement_by_import_development

  show_max_requirement_id(){
    var data = {
    }
    var result = this.http.post(this.serverUrl+'/requirement/show_max_requirement_id',data).map(res=>res.json());
    return result;
  }//show_max_requirement_id

  update_status_test_requirement(requirement_id,status){
    var data = {
      requirement_id : requirement_id,
      status : status
    }
    var result = this.http.post(this.serverUrl+'/requirement/update_status_test_requirement',data).map(res=>res.json());
    return result;
  }//show_max_requirement_id

}
