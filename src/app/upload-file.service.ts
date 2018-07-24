import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
import { FormControl } from '@angular/forms';

@Injectable()
export class UploadFileService {

  private actionUrl: string;
  private serverUrl: string;

  constructor(private http:Http) { 
    var full_url = (window.location.href).toString();
    var port_cut = full_url.search(':4200');
    var url = full_url.substr(0,port_cut);
    this.serverUrl = url+":3500";
  }

  upload_file(file,file_name){
      let formData = new FormData();
      formData.append('document', file,file_name);
      var result = this.http.post(this.serverUrl+'/upload/upload_file_bymeeting',formData).map(res=>res.json());
      return result;
  }

}
