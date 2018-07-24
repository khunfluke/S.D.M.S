import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {TestingService} from "../testing.service";
import {TaskService} from "../task.service";
import swal from 'sweetalert2';
import { StaffService } from 'app/staff.service';
import {RequirementService} from "../requirement.service";

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css'],
  providers : [TaskService,TestingService,StaffService,RequirementService]
})
export class TestingComponent implements OnInit {
  public word;
  public lang:string;
  public testing_data;
  public task_data;
  public task_id;
  public requirement_id;
  public staff_data;
  set_row = [];
  selected = [];
  tempFilter = [];
  timeout: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private router:Router,private testingService:TestingService,private taskService:TaskService,private staffService:StaffService,private requirementService:RequirementService) {
    this.show_testing();

  }
  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
  }

  show_testing(){
    this.testingService.show_testing().subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].index = i+1;
        res[i].label = res[i].first_name+' '+res[i].last_name;
      }
      this.testing_data = res;
      this.fetch((data) => {
        this.selected = [data[2]];
        this.set_row = data;
        this.tempFilter = [...data];
      });

    });
  }//show_testing

  show_task(){
    this.taskService.show_task_by_status_progress(3,100).subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].value = res[i].task_id;
        res[i].label = res[i].program_name
        
      }
     
      this.task_data = res;
    });
  }//show_task

  delete_testing(id,task_id,event){
    var thisx = this;
    this.taskService.update_status_task(task_id,3).subscribe(res=>{})
    this.taskService.show_test_requirement_id(task_id).subscribe(res=>{
      for(var i=0;i<res.length;i++){
       this.requirement_id = res[i].requirement_id;
      }
      this.requirementService.update_status(4,this.requirement_id).subscribe(res=>{})
    }) 
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
      thisx.testingService.delete_testing(id).subscribe(res=>{
        swal({
          title: thisx.word.succrss[thisx.lang],
          text: thisx.word.delete_succrss[thisx.lang],
          type: 'success',
          confirmButtonText: 'OK',
        });
        thisx.remove_file_by_testing(res[0].file);
        thisx.show_testing();
      });
    })
    .catch(swal.noop);
  }//delete_meeting

  remove_file_by_testing(file_name){
    if(file_name != ''){
      this.testingService.remove_file_by_testing(file_name).subscribe(res=>{
        console.log('remove file secess');
      })
    }
  }//remove_file
  
  fetch(cb){
    var data_json_str = JSON.stringify(this.testing_data);
    cb(JSON.parse(data_json_str));
  }

  update_testing(id){
    this.router.navigate(['add-testing'], { queryParams: { id: id } });
  }//update_meeting

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
