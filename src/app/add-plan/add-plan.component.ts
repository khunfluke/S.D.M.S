import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router } from '@angular/router';
import {IOption} from "ng-select";
import {SelectOptionService} from "../shared/elements/select-option.service";
import {PlanService} from "../plan.service";
import {StaffService} from "../staff.service";
import {TaskService} from "../task.service"
import swal from 'sweetalert2';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-add-plan',
  providers: [PlanService,StaffService,TaskService],
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css']
})
export class AddPlanComponent implements OnInit {

  public word;
  public lang:string;
  public program_name:string;
  public task_data;
  // public sub_task_data = [{
  //   sub_task_name : '',
  //   previous_task : null,
  //   operator : null,
  //   expect_start_date : '',
  //   expect_end_date : ''
  // }];
  public sub_task_data = [];
  public sub_task_datas = [];
  public expect_start_date;
  public expect_end_date;
  public task_id;
  public employee_data;
  public check_change_expect_start_date = [];
  public check_update:boolean;
  simpleOption: Array<IOption> = this.selectOptionService.getCharacters();

  constructor(private route: ActivatedRoute,private taskService:TaskService,private staffService:StaffService,private router:Router,public selectOptionService: SelectOptionService,private planService:PlanService) { 
    this.show_task_by_add_plan();
    this.route.queryParams.subscribe(res=>{
      this.task_id = res.id;
      if(res.id != undefined){
        this.check_update = true;
        this.set_page();
      }else{
        this.check_update = false;
      }
      
    });
  }

  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
  }

  set_page(){
    this.planService.show_sub_task_by_update_plan(this.task_id).subscribe(res=>{
      this.program_name = res[0].program_name;
      this.expect_start_date = moment(res[0].expect_start_date).tz('Asia/Bangkok').format('YYYY-MM-DD');
      this.expect_end_date = moment(res[0].expect_end_date).tz('Asia/Bangkok').format('YYYY-MM-DD');
      this.show_employee();
      //console.log(res);
      for(var i=0;i<res.length;i++){
        res[i].value = res[i].sub_task_id;
        res[i].label = res[i].sub_task_name;
      }
      this.sub_task_datas = res;
      for(var i=0;i<res.length;i++){
        this.sub_task_data.push({
          sub_task_id : res[i].sub_task_id,
          sub_task_name : res[i].sub_task_name,
          previous_task : [res[i].previous_task],
          operator : [res[i].operator],
          expect_start_date : moment(res[i].st_expect_start_date).tz('Asia/Bangkok').format('YYYY-MM-DD'),
          expect_end_date : moment(res[i].st_expect_end_date).tz('Asia/Bangkok').format('YYYY-MM-DD')
        })
        this.check_change_expect_start_date.push(false);
      }
     
    })
  }//set_page

  show_task_by_add_plan(){
    this.planService.show_task_by_add_plan().subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].value = res[i].task_id;
        res[i].label = res[i].program_name
      }
      this.task_data = res;
    })
  }//show_task_by_plan

  change_expect_start_date(index){
    this.check_change_expect_start_date[index] = true
  }//change_expect_start_date

  check_date(){
    for(var i=0;i<this.sub_task_data.length;i++){
      if(this.sub_task_data[i].expect_start_date > this.sub_task_data[i].expect_end_date){
        return false;
      }
    }
    return true
  }//check_date

  show_sub_task(task_id){
    
    for(var i=0;i<this.task_data.length;i++){
      if(task_id == this.task_data[i].task_id){
        this.expect_start_date = moment(this.task_data[i].expect_start_date).tz('Asia/Bangkok').format('YYYY-MM-DD');
        this.expect_end_date = moment(this.task_data[i].expect_end_date).tz('Asia/Bangkok').format('YYYY-MM-DD');
      }
    }
    this.planService.show_sub_task_by_add_plan(task_id).subscribe(res=>{
      //console.log(res);
      for(var i=0;i<res.length;i++){
        res[i].value = res[i].sub_task_id;
        res[i].label = res[i].sub_task_name;
        this.check_change_expect_start_date.push(false);
      }
      this.sub_task_data = res;
      this.sub_task_datas = res;
    })
    this.show_employee();
  }//set_page

  show_employee(){
    this.staffService.show_staff().subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].value = res[i].employee_id;
        res[i].label = res[i].first_name+' '+res[i].last_name;
      }
      this.employee_data = res;
    })
  }//show_employee

  check_validate(){
    if(this.task_id == undefined || this.task_id == null){
      return false;
    }
    for(var i=0;i<this.sub_task_data.length;i++){
      if(this.sub_task_data[i].operator == null){
        return false;
      } 
      if(this.sub_task_data[i].expect_start_date == null){
        return false;
      }
      if(this.sub_task_data[i].expect_end_date == null){
        return false;
      }
    }
    return true;
  }//check_validate

  add_plan(){
    if(this.check_validate()){
      if(this.check_date()){
        this.planService.add_plan(this.sub_task_data).subscribe(res=>{
          //console.log(res);
          this.taskService.update_status_task(this.task_id,2).subscribe(res2=>{
            swal({
              title: this.word.succrss[this.lang],
              text: this.word.add_succrss[this.lang],
              type: 'success',
              confirmButtonText: 'OK',
              allowOutsideClick: true
            });
            this.router.navigateByUrl('/plan/plan');
          });
        })
      }else{
        swal({
          title: this.word.warning[this.lang],
          text: this.word.error_information[this.lang],
          type: 'warning',
          confirmButtonText: 'OK',
          allowOutsideClick: true
        });
      }
    }else{
      swal({
        title: this.word.warning[this.lang],
        text: this.word.pleas_enter_data[this.lang],
        type: 'warning',
        confirmButtonText: 'OK',
        allowOutsideClick: true
      });
    }
  }//add_plan

  // update_plan(){
  //   for(var i=0;i<this.sub_task_data.length;i++){
  //     this.sub_task_data[i].previous_task = this.sub_task_data[i].previous_task[0];
  //     this.sub_task_data[i].operator = this.sub_task_data[i].operator[0];
  //   }
  //   console.log(this.sub_task_data)
  // }//update_plan


}
