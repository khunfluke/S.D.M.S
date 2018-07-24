import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class ApproveService {

  private actionUrl: string;
  private serverUrl: string;

  constructor(private http:Http) { 
    var full_url = (window.location.href).toString();
    var port_cut = full_url.search(':4200');
    var url = full_url.substr(0,port_cut);
    this.serverUrl = url+":3500";
  }

  add_approve(requirement_id,expected_to_take,expenses,endorser,approval_results,detail,date_of_permit){
    //console.log(requirement_id+'-'+expected_to_take+'-'+expenses+'-'+endorser+'-'+approval_results+'-'+detail)
    var data = {
      requirement_id : requirement_id,
      expected_to_take : expected_to_take,
      expenses : expenses,
      endorser : endorser,
      approval_results : approval_results,
      detail : detail,
      date_of_permit : date_of_permit
    }
    var result = this.http.post(this.serverUrl+'/approve/add_approve',data).map(res=>res.json());
    return result;
  }//add_approve

  show_approve(){
    var data = {

    }
    var result = this.http.post(this.serverUrl+'/approve/show_approve',data).map(res=>res.json());
    return result;
  }//show_approve

  show_approve_by_id(premit_id){
    var data = {
      premit_id : premit_id
    }
    var result = this.http.post(this.serverUrl+'/approve/show_approve_by_id',data).map(res=>res.json());
    return result;
  }//show_approve_by_id

  update_approve(permit_id,requirement_id,expected_to_take,expenses,endorser,approval_results,detail,date_of_permit){
    var data = {
      permit_id : permit_id,
      requirement_id : requirement_id,
      expected_to_take : expected_to_take,
      expenses : expenses,
      endorser : endorser,
      approval_results : approval_results,
      detail : detail,
      date_of_permit : date_of_permit
    }
    var result = this.http.post(this.serverUrl+'/approve/update_approve',data).map(res=>res.json());
    return result;
  }//update_approve


}
