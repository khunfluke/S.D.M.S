import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {IOption} from "ng-select";
import {SelectOptionService} from "../shared/elements/select-option.service";
import {RequirementService} from "../requirement.service";
import {TaskService} from "../task.service";
import swal from 'sweetalert2';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-add-import-development',
  providers: [RequirementService,TaskService],
  templateUrl: './add-import-development.component.html',
  styleUrls: ['./add-import-development.component.css']
})
export class AddImportDevelopmentComponent implements OnInit {

  public word;
  public lang:string;
  public task_status_data;
  public program_name:string;
  public status_name:string;
  public status;
  public expect_start_date;
  public expect_end_date;
  public deadline;
  public task_id;
  public check_change_date;
  public sub_task = [
    {
      sub_task_name : "",
      difficulty_level : 'ง่าย'
    }
  ];
  public primary_responsibility;
  public import_date;
  public requirement_id;
  public priorities;
  public primary_responsibility_id;
  public action:string;
  public check_update:boolean;
  private today;
  simpleOption: Array<IOption> = this.selectOptionService.getCharacters();

  constructor(private route: ActivatedRoute,private router:Router,public selectOptionService: SelectOptionService,private requirementService:RequirementService,private taskService:TaskService) { 
    
    this.route.queryParams.subscribe(res=>{
      this.requirement_id = res.id;
      this.action = res.action;
      this.task_id = res.t_id;
      var that = this;
      if(this.action == 'update'){
        this.check_update = true;
      }else{
        this.check_update = false;
      }
      this.show_task_status();
    });
  }

  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    var month;
    var day;
    if(m < 10){
      month = '0'+m;
    }else{
      month = m;
    }
    if(d < 10){
      day = '0'+d;
    }else{
      day = d
    }
    this.today = y+'-'+month+'-'+day;
  }

  set_page(){
    if(this.action == 'open'){
      this.requirementService.show_requirement_by_import_development(this.requirement_id).subscribe(res=>{
        this.program_name = res[0].program_name;
        this.status_name = this.task_status_data[0].task_status_name;
        this.status = this.task_status_data[0].task_status_id;
        this.import_date = this.today;
        this.expect_start_date = this.today;
        this.primary_responsibility = res[0].first_name+' '+res[0].last_name;
        this.primary_responsibility_id = res[0].employee_id;
      });
    }else if(this.action == 'reject'){
      this.taskService.show_task_by_reject(this.task_id).subscribe(res=>{
        this.program_name = res[0].program_name;
        this.status_name = this.task_status_data[6].task_status_name;
        this.status = this.task_status_data[6].task_status_id;
        this.import_date = this.today;
        this.expect_start_date = this.today;
        this.primary_responsibility = res[0].first_name+' '+res[0].last_name;
        this.primary_responsibility_id = res[0].employee_id;
        this.sub_task.splice(0,1);
        for(var i=0;i<res.length;i++){
          this.sub_task.push({
            sub_task_name : res[i].sub_task_name,
            difficulty_level : res[i].difficulty_level
          })
        }
      })
    }else if(this.action == 'update'){
      this.taskService.show_task_by_update(this.task_id).subscribe(res=>{
        this.program_name = res[0].program_name;
        this.status_name = res[0].task_status_name;
        this.status = res[0].task_status_id;
        this.import_date = moment(res[0].import_date).tz('Asia/Bangkok').format('YYYY-MM-DD');
        this.expect_start_date = moment(res[0].t_expect_start_date).tz('Asia/Bangkok').format('YYYY-MM-DD');
        this.expect_end_date = moment(res[0].t_expect_end_date).tz('Asia/Bangkok').format('YYYY-MM-DD');
        this.deadline = moment(res[0].deadline).tz('Asia/Bangkok').format('YYYY-MM-DD');
        this.primary_responsibility = res[0].first_name+' '+res[0].last_name;
        this.primary_responsibility_id = res[0].employee_id;
        this.sub_task.splice(0,1);
        for(var i=0;i<res.length;i++){
          this.sub_task.push({
            sub_task_name : res[i].sub_task_name,
            difficulty_level : res[i].difficulty_level
          })
        }
        this.priorities = res[0].t_difficulty_level;
      })
    }
  }//set_page

  add_sub_task(){
    this.sub_task.push({
      sub_task_name : "",
      difficulty_level : 'ง่าย'
    })
  }//add_sub_task

  del_sub_task(index){
    if(this.sub_task.length > 1){
      this.sub_task.splice(index,1);
    }
  }//del_sub_task

  show_task_status(){
    this.taskService.show_task_status().subscribe(res=>{
      this.task_status_data = res;
      this.set_page();
    })
  }//show_task_status

  check_validate(){
    if(this.requirement_id == undefined){
      return false;
    }if(this.status == undefined){
      return false;
    }if(this.import_date == undefined || this.import_date == ""){
      return false;
    }if(this.expect_start_date == undefined || this.expect_start_date == ""){
      return false;
    }if(this.expect_end_date == undefined || this.expect_end_date == ""){
      return false;
    }if(this.deadline == undefined || this.deadline == ""){
      return false;
    }if(this.priorities == undefined || this.priorities == ""){
      return false;
    }
    for(var i=0;i<this.sub_task.length;i++){
      if(this.sub_task[i].sub_task_name == "" || this.sub_task[i].sub_task_name == undefined){
        return false;
      }
      if(this.sub_task[i].difficulty_level == null || this.sub_task[i].difficulty_level == undefined){
        return false;
      }
    }
    return true;
  }//check_validate

  add_task(){
    if(this.check_validate()){
      this.taskService.add_task(this.requirement_id,this.status,this.import_date,this.expect_start_date,this.expect_end_date,this.deadline,this.primary_responsibility_id,this.priorities).subscribe(res=>{
        if(this.action == 'open'){
          this.add_sub_tasks(res[0].task_id);
          this.update_status_requirement(4,res[0].requirement_id);
        }
        else if(this.action == 'reject'){
          this.taskService.update_status_task(this.task_id,6).subscribe(res2=>{
            this.add_sub_tasks(res[0].task_id);
            this.update_status_requirement(4,res[0].requirement_id);
          })
        }
      })
    }else{
      swal({
        title: this.word.warning[this.lang],
        text: this.word.pleas_enter_data[this.lang],
        type: 'warning',
        confirmButtonText: 'OK',
        allowOutsideClick: true
      });
    }
  }//add_task

  update_task(){
    if(this.check_validate()){
      this.taskService.update_task(this.task_id,this.requirement_id,this.status,this.import_date,this.expect_start_date,this.expect_end_date,this.deadline,this.primary_responsibility_id,this.priorities).subscribe(res=>{
       this.taskService.delete_sub_task_by_task_id(this.task_id).subscribe(res2=>{
        this.add_sub_tasks(this.task_id);
        swal({
          title: this.word.succrss[this.lang],
          text: this.word.update_succrss[this.lang],
          type: 'success',
          confirmButtonText: 'OK',
          allowOutsideClick: true
        });
        this.router.navigateByUrl('/import-development/task-management');
       }) 
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
  }//update_task

  add_sub_tasks(task_id){
    this.taskService.add_sub_task(this.sub_task,task_id).subscribe(res=>{
      console.log("add sub task sucess");
    });
  }//add_sub_task

  update_status_requirement(status,requirement_id){
    this.requirementService.update_status(status,requirement_id).subscribe(res=>{
      swal({
        title: this.word.succrss[this.lang],
        text: this.word.add_succrss[this.lang],
        type: 'success',
        confirmButtonText: 'OK',
        allowOutsideClick: true
      });
      this.router.navigateByUrl('/import-development/open-task');
    })
  }

}
