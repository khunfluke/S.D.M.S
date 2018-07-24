import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class ReportService {

  private actionUrl: string;
  private serverUrl: string;

  constructor(private http:Http) { 
    var full_url = (window.location.href).toString();
    var port_cut = full_url.search(':4200');
    var url = full_url.substr(0,port_cut);
    this.serverUrl = url+":3500";
  }

  repoet_performance(start_date,end_date){
    var data = {
      start_date : start_date,
      end_date : end_date
    }
    var result = this.http.post(this.serverUrl+'/report/repoet_performance',data).map(res=>res.json());
    return result;
  }//add_position

  report_task_by_period(start_date,end_date){
    var data = {
      start_date : start_date,
      end_date : end_date
    }
    var result = this.http.post(this.serverUrl+'/report/report_task_by_period',data).map(res=>res.json());
    return result;
  }//report_task_by_period

  report_track(start_date,end_date){
    var data = {
      start_date : start_date,
      end_date : end_date
    }
    var result = this.http.post(this.serverUrl+'/report/report_track',data).map(res=>res.json());
    return result;
  }//report_track

  report_requirement(start_date,end_date){
    var data = {
      start_date : start_date,
      end_date : end_date
    }
    var result = this.http.post(this.serverUrl+'/report/report_requirement',data).map(res=>res.json());
    return result;
  }//report_requirement

  show_sub_task_by_employee_id(start_date,end_date,employee_id){
    var data = {
      start_date : start_date,
      end_date : end_date,
      employee_id : employee_id
    }
    var result = this.http.post(this.serverUrl+'/report/show_sub_task_by_employee_id',data).map(res=>res.json());
    return result;
  }//report_requirement

  show_requirement_by_customer_id(customer_id,start_date,end_date){
    var data = {
      customer_id : customer_id,
      start_date : start_date,
      end_date : end_date,
    }
    var result = this.http.post(this.serverUrl+'/report/show_requirement_by_customer_id',data).map(res=>res.json());
    return result;
  }//show_requirement_by_customer_id

}
