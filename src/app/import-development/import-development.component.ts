import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {TaskService} from "../task.service";
import {RequirementService} from "../requirement.service";
import swal from 'sweetalert2';

@Component({
  selector: 'app-import-development',
  providers:[TaskService,RequirementService],
  templateUrl: './import-development.component.html',
  styleUrls: ['./import-development.component.css']
})
export class ImportDevelopmentComponent implements OnInit {

  public word;
  public lang:string;
  public task_data;
  set_row = [];
  selected = [];
  tempFilter = [];
  timeout: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private router:Router,private taskService:TaskService,private requirementService:RequirementService) { 
    this.show_task();
  }

  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
  }

  show_task(){
    this.taskService.show_task().subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].index = i+1;
      }
      this.task_data = res;
      this.fetch((data) => {
        this.selected = [data[2]];
        this.set_row = data;
        this.tempFilter = [...data];
      });
    });
  }//show_task

  delete_task(t_id,status,re_id){
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
      if(status == 1){
        thisx.taskService.delete_task(t_id).subscribe(res=>{
          thisx.requirementService.update_status(2,re_id).subscribe(res=>{
            swal({
              title: thisx.word.succrss[thisx.lang],
              text: thisx.word.delete_succrss[thisx.lang],
              type: 'success',
              confirmButtonText: 'OK',
            });
            thisx.show_task();
          })
        })
      }else if(status == 7){
        thisx.taskService.show_task_id_by_delete_reject(re_id,t_id).subscribe(res=>{
          var max_task_id = res[0].max_task_id;
          thisx.taskService.delete_task(t_id).subscribe(res2=>{
            thisx.taskService.update_status_task(max_task_id,5).subscribe(res3=>{
              swal({
                title: thisx.word.succrss[thisx.lang],
                text: thisx.word.delete_succrss[thisx.lang],
                type: 'success',
                confirmButtonText: 'OK',
              });
              thisx.show_task();
            })
          });
        });
      }else{
        swal({
          title: thisx.word.data_can_not_delete[thisx.lang],
          text: thisx.word.data_status_can_not_delete[thisx.lang],
          type: 'warning',
          confirmButtonText: 'OK',
        });
      }
    })
    .catch(swal.noop);
  }//delete_task

  edit_task(t_id,status,re_id){
    this.router.navigate(['/add-import-development'], { queryParams: { id:re_id,action:"update",t_id:t_id} });
  }//edit_task

  fetch(cb){
    var data_json_str = JSON.stringify(this.task_data);
    cb(JSON.parse(data_json_str));
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

  onSelect({ selected }) {}

  onActivate(event) {}

  onPage(event) {
    clearTimeout(this.timeout);
    console.log(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

}
