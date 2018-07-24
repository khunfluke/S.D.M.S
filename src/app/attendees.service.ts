import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AttendeesService {

  private actionUrl: string;
  private serverUrl: string;
  constructor(private http:Http) { 
    var full_url = (window.location.href).toString();
    var port_cut = full_url.search(':4200');
    var url = full_url.substr(0,port_cut);
    this.serverUrl = url+":3500";
  }

  add_attendeesinto(employee_id,meeting_id){
    var data = {
      employee_id : employee_id,
      meeting_id : meeting_id
    }
    var result = this.http.post(this.serverUrl+'/attendees/add_attendeesinto',data).map(res=>res.json());
    return result;
  }

  delete_attendees(meeting_id){
    var data = {
      meeting_id : meeting_id
    }
    var result = this.http.post(this.serverUrl+'/attendees/delete_attendees',data).map(res=>res.json());
    return result;
  }//delete_attendees

}
