import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {PlanService} from "../plan.service";
import {TaskService} from "../task.service"
import swal from 'sweetalert2';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-plan',
  providers : [PlanService,TaskService],
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  public word;
  public lang:string;
  public task_data;
  set_row = [];
  selected = [];
  tempFilter = [];
  timeout: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private taskService:TaskService,private planService:PlanService,private router:Router) { 
    this.show_task();
  }

  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
  }

  show_task(){
    this.planService.show_task_by_status(2).subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].index = i+1;
        res[i].num_of_date = (new Date(res[i].expect_end_date).valueOf())-(new Date(res[i].expect_start_date).valueOf());
        res[i].num_of_date = moment(res[i].num_of_date).tz('Asia/Bangkok').format('DD') -1;
        res[i].expect_start_date = moment(res[i].expect_start_date).tz('Asia/Bangkok').format('DD-MM-YYYY');
        res[i].expect_end_date = moment(res[i].expect_end_date).tz('Asia/Bangkok').format('DD-MM-YYYY');
        
      }
      this.task_data = res;
      this.fetch((data) => {
        this.selected = [data[2]];
        this.set_row = data;
        this.tempFilter = [...data];
      });
    })
  }//show_task

  update_plan(task_id){
    this.router.navigate(['/plan/add-plan'], { queryParams: { id: task_id } });
  }//update_task

  delete_plan(task_id,requirement_id){
    var thisx = this;
    swal({
      title: this.word.are_you_sure[this.lang],
      text: this.word.if_delete[this.lang],
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.word.yes[this.lang],
      cancelButtonText: this.word.no_no[this.lang]
    }).then(function(){
      thisx.planService.delete_plan(task_id,requirement_id).subscribe(res=>{
        swal({
          title: thisx.word.succrss[thisx.lang],
          text: thisx.word.delete_succrss[thisx.lang],
          type: 'success',
          confirmButtonText: 'OK',
        });
        var status;
        if(res[0].count == 1){
          status = 1;
        }else{
          status = 7;
        }
        thisx.taskService.update_status_task(task_id,status).subscribe(res2=>{
          //console.log(res);
        thisx.show_task();
        })
      })
    })
    .catch(swal.noop);
    
  }//delete_plan

  fetch(cb){

    var data_json_str = JSON.stringify(this.task_data);
    cb(JSON.parse(data_json_str));
  }

  onSelect({ selected }) {}

  onActivate(event) {}

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data

    const temp = this.tempFilter.filter(function(d) {
      return d.program_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.set_row = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
