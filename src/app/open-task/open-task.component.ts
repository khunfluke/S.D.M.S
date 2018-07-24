import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {TaskService} from "../task.service"

@Component({
  selector: 'app-open-task',
  providers: [TaskService],
  templateUrl: './open-task.component.html',
  styleUrls: ['./open-task.component.css']
})
export class OpenTaskComponent implements OnInit {

  public word;
  public lang:string;
  public requirement_data;
  set_row = [];
  selected = [];
  tempFilter = [];
  timeout: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  
  constructor(private router:Router,private taskService:TaskService) { 
    this.show_requirement();
  }

  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
  }

  show_requirement(){
    this.taskService.show_requirement_by_open_task().subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].index = i+1;
      }
      this.requirement_data = res;
      this.fetch((data) => {
        this.selected = [data[2]];
        this.set_row = data;
        this.tempFilter = [...data];
      });
    });
  }//show_requirement

  open_work(id,status,task_id){
    var action:string;
    if(status == 'อนุมัติ'){
      action = "open";
      this.router.navigate(['/add-import-development'], { queryParams: { id:id,action:action} });
    }else{
      action = "reject";
      this.router.navigate(['/add-import-development'], { queryParams: { id:id,action:action,t_id:task_id} });
    }
  
    
  }//open_work

  fetch(cb){
    var data_json_str = JSON.stringify(this.requirement_data);
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
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

}
