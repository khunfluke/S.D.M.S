import { Injectable } from '@angular/core';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import { RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class TestingService {

  private actionUrl: string;
  private serverUrl: string;

  constructor(private http:Http) { 
    var full_url = (window.location.href).toString();
    var port_cut = full_url.search(':4200');
    var url = full_url.substr(0,port_cut);
    this.serverUrl = url+":3500";
  }

  show_testing(){
    var data = { }
    var result = this.http.post(this.serverUrl+'/testing/show_testing',data).map(res=>res.json());
    return result;
  }

  show_testing_by_update(test_id){
    var data = {
      test_id : test_id
    }
    var result = this.http.post(this.serverUrl+'/testing/show_testing_by_update',data).map(res=>res.json());
    return result;
  }//show_testing_by_update

  add_testing(task_id,test_no,date_test,tester,description,file){
    var data = {
      task_id : task_id,
      test_no : test_no,
      date_test : date_test,
      tester : tester,
      description : description,
      file : file
    }
    var result = this.http.post(this.serverUrl+'/testing/add_testing',data).map(res=>res.json());
    console.log(result);
    return result; 
  }

  update_testing(test_id,task_id,test_no,date_test,tester,description,file){
    var data = {
      test_id : test_id,
      task_id: task_id,
      test_no: test_no,
      date_test: date_test,
      tester: tester,
      description: description,
      file: file 
    }
    var result = this.http.post(this.serverUrl+'/testing/update_testing',data).map(res=>res.json());
    return result;
  }//update_meeting

upload_file(file,file_name){
  let formData = new FormData();
  formData.append('document', file,file_name);
  var result = this.http.post(this.serverUrl+'/upload/upload_file_by_testing',formData).map(res=>res.json());
  return result;
}

upload_file_testing(id,file){
  var data = {
    id : id,
    file : file
  }
  var result = this.http.post(this.serverUrl+'/testing/upload_file_testing',data).map(res=>res.json());
  return result;
}//upload_file

download(file_name){
  var data = {
    file_name : file_name
  }
  var headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  var options: RequestOptions = new RequestOptions({ headers: headers,responseType: 3});
  var result = this.http.post(this.serverUrl+'/upload/download_testing',data,options);
  return result;
}//download

remove_file_by_testing(file_name){
  var data = {
    file_name : file_name
  }
  var result = this.http.post(this.serverUrl+'/upload/remove_file_by_testing',data).map(res=>res.json());
  return result;
}//remove_file_by_meeting

delete_testing(test_id){
  var data = {
    test_id : test_id
  }
  var result = this.http.post(this.serverUrl+'/testing/delete_testing',data).map(res=>res.json());
  return result;
}//delete_requirement

}