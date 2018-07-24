import { Injectable } from '@angular/core';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import { RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';



@Injectable()
export class MeetingService {
  private actionUrl: string;
  private serverUrl: string;

  constructor(private http:Http) { 
    var full_url = (window.location.href).toString();
    var port_cut = full_url.search(':4200');
    var url = full_url.substr(0,port_cut);
    this.serverUrl = url+":3500";
  }

  show_meeting(){
    var data = { }
    var result = this.http.post(this.serverUrl+'/meeting/show_meeting',data).map(res=>res.json());
    return result;
  }

  add_meeting(conference_topics,meeting_no,meeting_date,start_time,end_time,place,description,file,secretary){
    var data = {
      conference_topics : conference_topics,
      meeting_no : meeting_no,
      meeting_date : meeting_date,
      start_time : start_time,
      end_time : end_time,
      place : place,
      description : description,
      file : file,
      secretary : secretary
    }
    var result = this.http.post(this.serverUrl+'/meeting/add_meeting',data).map(res=>res.json());
    console.log(result);
    return result;
    
  }

  update_file(id,file_name){
    var data = {
      id : id,
      file : file_name
    }
    var result = this.http.post(this.serverUrl+'/meeting/update_file',data).map(res=>res.json());
      return result;
  }

  delete_meeting(meeting_id){
    var data = {
      meeting_id : meeting_id
    }
    var result = this.http.post(this.serverUrl+'/meeting/delete_meeting',data).map(res=>res.json());
    return result;
  }//delete_requirement

  remove_file_by_meeting(file_name){
    var data = {
      file_name : file_name
    }
    var result = this.http.post(this.serverUrl+'/upload/remove_file_by_meeting',data).map(res=>res.json());
    return result;
  }//remove_file_by_meeting

  show_meeting_by_id(id){
    var data = {
      id : id
    }
    var result = this.http.post(this.serverUrl+'/meeting/show_meeting_by_id',data).map(res=>res.json());
    return result;
  }//show_meeting_by_id

  show_attendees_by_id(id){
    var data = {
      id : id
    }
    var result = this.http.post(this.serverUrl+'/meeting/show_attendees_by_id',data).map(res=>res.json());
    return result;
  }//show_meeting_by_id

  download(file_name){
    var data = {
      file_name : file_name
    }
    var headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    var options: RequestOptions = new RequestOptions({ headers: headers,responseType: 3});
    var result = this.http.post(this.serverUrl+'/upload/download_meeting',data,options);
    return result;
  }//download

  update_meeting(meeting_id,conference_topics,meeting_no,meeting_date,start_time,end_time,place,description,file,secretary){
    var data = {
      meeting_id : meeting_id,
      conference_topics: conference_topics,
      meeting_no: meeting_no,
      meeting_date: meeting_date,
      start_time: start_time,
      end_time: end_time,
      place: place,
      description: description,
      file : file,
      secretary: secretary,
    }
    var result = this.http.post(this.serverUrl+'/meeting/update_meeting',data).map(res=>res.json());
    return result;
  }//update_meeting

}
