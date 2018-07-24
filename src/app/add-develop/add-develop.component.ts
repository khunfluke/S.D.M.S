import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router } from '@angular/router';
import {IOption} from "ng-select";
import {SelectOptionService} from "../shared/elements/select-option.service";
import {TaskService} from "../task.service";
import {DevelopService} from "../develop.service";
import swal from 'sweetalert2';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-add-develop',
  providers: [TaskService,DevelopService],
  templateUrl: './add-develop.component.html',
  styleUrls: ['./add-develop.component.css']
})
export class AddDevelopComponent implements OnInit {

  public word;
  public lang:string;
  public task_data;
  public task_id;
  public check_update;
  public program_name;
  public sub_task = [];
  simpleOption: Array<IOption> = this.selectOptionService.getCharacters();

  constructor(private route: ActivatedRoute,private developService:DevelopService,private taskService:TaskService,private router:Router,public selectOptionService: SelectOptionService) { 
    this.show_task();
    this.route.queryParams.subscribe(res=>{
      if(res.id != undefined){
        this.task_id = res.id;
        this.check_update = true;
        this.set_page();
      }else{
        this.check_update = false;
      }
    })
  }

  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
  }

  set_page(){
    this.taskService.show_task_by_update(this.task_id).subscribe(res=>{
      this.program_name = res[0].program_name;
    })
    this.taskService.show_sub_task_by_task_id(this.task_id).subscribe(res=>{
      //console.log(res);
      for(var i=0;i<res.length;i++){
        res[i].operator_name = res[i].first_name + ' '+res[i].last_name;
        res[i].actual_start_date = moment(res[i].st_actual_start_date).tz('Asia/Bangkok').format('YYYY-MM-DD');
        res[i].actual_end_date = moment(res[i].st_actual_end_date).tz('Asia/Bangkok').format('YYYY-MM-DD');

      }
      this.sub_task = res;
    })
  }//set_page

  show_task(){
    this.taskService.show_task_by_status(2).subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].value = res[i].task_id;
        res[i].label = res[i].program_name
      }
      this.task_data = res;
    });
  }//show_task

  show_sub_task(task_id){
    this.taskService.show_sub_task_by_task_id(task_id).subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].operator_name = res[i].first_name + ' '+res[i].last_name;
        res[i].actual_start_date = moment(res[i].st_actual_start_date).tz('Asia/Bangkok').format('YYYY-MM-DD');
        res[i].actual_end_date = moment(res[i].st_actual_end_date).tz('Asia/Bangkok').format('YYYY-MM-DD');
      }
      this.sub_task = res;
    })
  }//show_sub_task

  check_validate(){
    for(var i=0;i<this.sub_task.length;i++){
      if(this.sub_task[i].actual_start_date == null || this.sub_task[i].actual_start_date == ""){
        return false;
      }
      if(this.sub_task[i].actual_end_date == null || this.sub_task[i].actual_end_date == ""){
        return false;
      }
      if(this.sub_task[i].progress == null || this.sub_task[i].progress == undefined){
        return false;
      }
    }
    return true;
  }//check_validate

  add_develop(){
    if(this.check_validate()){
      this.developService.add_develop(this.sub_task).subscribe(res=>{
        this.taskService.update_status_task(this.task_id,3).subscribe(res2=>{
          swal({
            title: this.word.succrss[this.lang],
            text: this.word.add_succrss[this.lang],
            type: 'success',
            confirmButtonText: 'OK',
            allowOutsideClick: true
          });
          this.router.navigateByUrl('/develop');
        })
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
  }//add_develop

  check_progress(event,index){
    if(event.key == '-'){
      this.sub_task[index].progress = 0;
    }
    if(this.sub_task[index].progress > 100){
      this.sub_task[index].progress = 100;
    }
  }

  update_develop(){
    if(this.check_validate()){
      this.developService.add_develop(this.sub_task).subscribe(res=>{
        this.taskService.update_status_task(this.task_id,3).subscribe(res2=>{
          swal({
            title: this.word.succrss[this.lang],
            text: this.word.update_succrss[this.lang],
            type: 'success',
            confirmButtonText: 'OK',
            allowOutsideClick: true
          });
          this.router.navigateByUrl('/develop');
        })
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
  }//update_develop

}
