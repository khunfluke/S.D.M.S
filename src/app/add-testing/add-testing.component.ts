import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {IOption} from "ng-select";
import {SelectOptionService} from "../shared/elements/select-option.service";
import {TaskService} from "../task.service";
import * as moment from 'moment-timezone';
import swal from 'sweetalert2';
import {TestingService} from "../testing.service";
import { StaffService } from 'app/staff.service';
import { Http, Response } from '@angular/http';
import { saveAs } from 'file-saver';
import {RequirementService} from "../requirement.service";

//const URL = 'http://localhost:3500/upload/upload_file_by_testing';
var full_url = (window.location.href).toString();
var port_cut = full_url.search(':4200');
var url = full_url.substr(0,port_cut);
const URL = url+":3500/upload/upload_file_by_testing";

@Component({
  selector: 'app-add-testing',
  templateUrl: './add-testing.component.html',
  providers: [TaskService,TestingService,StaffService,RequirementService],
  styleUrls: ['./add-testing.component.css']
})
export class AddTestingComponent implements OnInit {
  public word;
  public lang:string;
  public program_name;
  public task_data;
  public tast_id;
  public test_no;
  public date_test;
  public tester;
  public description;
  public task_id;
  public test_id
  public check_update;
  public staff_data;
  public file;
  public old_file;
  public te_test_id;
  public sub_task_id;
  public test_result =[];
  public past = [];
  public fail =[];
  public sub_task = [];
  public today;
  public requirement_id;
  public test_no_show;
  simpleOption: Array<IOption> = this.selectOptionService.getCharacters();

  constructor(private route: ActivatedRoute,private http: Http,private router:Router,public selectOptionService: SelectOptionService,private taskService:TaskService,private testingService:TestingService,private staffService:StaffService,private requirementService:RequirementService) { 
    this.show_task();
    this.show_staff();
    this.route.queryParams.subscribe(res=>{
      if(res.id != undefined){
        this.test_id = res.id;
        this.check_update = true;
        this.set_page();
       
      }else{
        this.check_update = false;
        this.date_test = moment().tz('Asia/Bangkok').format('YYYY-MM-DD');
      }
    })
  }

  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
  }

  show_task(){
    this.taskService.show_task_by_status_progress(3,100).subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].value = res[i].task_id;
        res[i].label = res[i].program_name;
       // console.log(res[i].value);
      }
      this.task_data = res;
      
      //this.show_test_episode_requirement_id(res[i].task_id);
    });
  }//show_task

  show_sub_task(task_id){
    this.taskService.show_sub_task_by_task_id(task_id).subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].value = res[i].sub_task_id;
        res[i].operator_name = res[i].first_name + ' '+res[i].last_name;
      }
      this.sub_task = res;
    })
  }//show_sub_task

  show_test_episode_requirement_id(task_id){
    this.taskService.show_test_requirement_id(task_id).subscribe(res=>{
      for(var i=0;i<res.length;i++){
       this.requirement_id = res[i].requirement_id;
      }
     this.taskService.show_test_episode_task(this.requirement_id).subscribe(res=>{
     this.test_no = res.length;
     })
    })    
  }//show_test_episode_requirement_id

  show_staff(){
    this.staffService.show_staff().subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].value = res[i].employee_id;
        res[i].label = res[i].first_name+' '+res[i].last_name;
      } 
      this.staff_data = res;   
    })
  }//show_staff
 
  set_page(){
  
    this.testingService.show_testing_by_update(this.test_id).subscribe(res=>{
    this.program_name = res[0].program_name;
    this.test_no = res[0].test_no;
    this.tester = [res[0].tester];
    this.task_id = res[0].task_id;
    this.date_test = moment(res[0].date_test).tz('Asia/Bangkok').format('YYYY-MM-DD');
    this.description = res[0].description;
    this.old_file = res[0].te_file;  
      this.taskService.show_sub_task_by_task_id(this.task_id).subscribe(res=>{
        for(var i=0;i<res.length;i++){
        res[i].label = res[i].first_name+' '+res[i].last_name;
        this.test_result[i] = res[i].test_result;
        } 
        this.sub_task = res;
      })
    })    
  }//set_page

  check_test_reult(){
    for(var i =0; i<this.test_result.length ; i++){
      if(this.test_result[i] == false){
        return false ;
      }
     }
     return true ; 
  }

  add_testing(event){
    if((this.task_id == ""||this.task_id == undefined) || (this.test_no == null || this.test_no == undefined) || (this.date_test == null || this.date_test == undefined) || (this.tester == "" || this.tester == undefined) || (this.description == "" || this.description == undefined)){
     this.closeMyModal(event);
     swal({
       title: this.word.warning[this.lang],
       text: this.word.pleas_enter_data[this.lang],
       type: 'warning',
       confirmButtonText: 'OK',
       allowOutsideClick: true
     });
   }else{
     this.testingService.add_testing(this.task_id,this.test_no,this.date_test,this.tester,this.description,"").subscribe(res=>{
     this.upload(res[0].test_id);
     this.update_testing_sub_task(this.sub_task,this.test_result);
      if(this.check_test_reult()){
        this.taskService.update_status_task(this.task_id,6).subscribe(res=>{})
        this.taskService.show_test_requirement_id(this.task_id).subscribe(res=>{
          for(var i=0;i<res.length;i++){
           this.requirement_id = res[i].requirement_id;
          }
          this.requirementService.update_status(5,this.requirement_id).subscribe(res=>{})
        })    
      }else { 
        this.taskService.update_status_task(this.task_id,5).subscribe(res=>{})
        this.taskService.show_test_requirement_id(this.task_id).subscribe(res=>{
          for(var i=0;i<res.length;i++){
           this.requirement_id = res[i].requirement_id;
          }
          this.requirementService.update_status(4,this.requirement_id).subscribe(res=>{})
        })    
       }
      swal({
        title: this.word.succrss[this.lang],
        text: this.word.add_succrss[this.lang],
        type: 'success',
        confirmButtonText: 'OK',
        allowOutsideClick: true
      }); 
      this.router.navigate(['/testing']);
    })
   }
 }//add_testing

 update_testing_sub_task(sub_task,test_result){
   var sub_task_id = [];
   for(var i = 0 ; i < sub_task.length ; i++){
    sub_task_id[i] = sub_task[i].sub_task_id;
  } 
  this.taskService.update_sub_task(sub_task_id,test_result).subscribe(res=>{
    swal({
      title: this.word.succrss[this.lang],
      text: this.word.add_succrss[this.lang],
      type: 'success',
      confirmButtonText: 'OK',
      allowOutsideClick: true
    }); 
   })
 }

 update_testing(){
    if(this.check_validate()){
    this.testingService.update_testing(this.test_id,this.task_id,this.test_no,this.date_test,this.tester,this.description,this.file).subscribe(res=>{
      this.update_testing_sub_task(this.sub_task,this.test_result);
      if(this.check_test_reult()){
        this.taskService.update_status_task(this.task_id,6).subscribe(res=>{})
        this.taskService.show_test_requirement_id(this.task_id).subscribe(res=>{
          for(var i=0;i<res.length;i++){
           this.requirement_id = res[i].requirement_id;
          }
          this.requirementService.update_status(5,this.requirement_id).subscribe(res=>{})
        })    
      }else { 
        this.taskService.update_status_task(this.task_id,5).subscribe(res=>{})
        this.taskService.show_test_requirement_id(this.task_id).subscribe(res=>{
          for(var i=0;i<res.length;i++){
           this.requirement_id = res[i].requirement_id;
          }
          this.requirementService.update_status(4,this.requirement_id).subscribe(res=>{})
        })    
       }
      swal({
        title: this.word.succrss[this.lang],
        text: this.word.update_succrss[this.lang],
        type: 'success',
        confirmButtonText: 'OK',
      });
      if(this.file != undefined && this.file != ""){
        this.testingService.remove_file_by_testing(this.old_file).subscribe(ress=>{
        }); 
      }
      this.upload(this.test_id);
      this.router.navigate(['/testing']);
    });
   }else{
    swal({
      title: this.word.warning[this.lang],
      text: this.word.pleas_enter_data[this.lang],
      type: 'warning',
      confirmButtonText: 'OK',
      allowOutsideClick: true
    });
   }
}//update_meeting

check_validate(){
  if(this.task_id == null || this.task_id == undefined){
    return false
  }
  if(this.test_no == null || this.test_no == undefined){
    return false;
  }
  if(this.date_test == null|| this.date_test == undefined){
    return false;
  }
  if(this.tester == null || this.tester == undefined){
    return false;
  }
  if(this.description == "" || this.description == undefined){
    return false;
  }
  return true;
}//check_validate

 onFileChange(event){
  this.file = event.target.files[0];
 }

upload(file_name) {
  
  if(this.file != undefined && this.file != ""){
    var document_name = this.file.name.toString();
    var dot = document_name.indexOf('.');
    var document_type = document_name.substring(dot);
    var id = file_name;
    file_name = file_name+document_type;
    let formData = new FormData();
    formData.append('document', this.file,file_name);
    this.http.post(URL, formData).map((res:Response) => res.json()).subscribe((success) => {
    this.testingService.upload_file_testing(id,file_name).subscribe(res=>{  
          console.log("Upload file success");
        })
      },(error) =>{
        console.log("Upload file error");
    });
  }
}//upload

download(){
  
  this.testingService.download(this.old_file).subscribe(data=>{
    saveAs(data['_body'],this.old_file);
    //console.log(data['_body']);
  },error=>{
    console.log(error);
  });
}//download

closeMyModal(event) {
  ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
}


}
