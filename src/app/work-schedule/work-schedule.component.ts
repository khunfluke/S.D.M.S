import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {StaffService} from "../staff.service";

@Component({
  selector: 'app-work-schedule',
  providers : [StaffService],
  templateUrl: './work-schedule.component.html',
  styleUrls: ['./work-schedule.component.css']
})
export class WorkScheduleComponent implements OnInit {

  public word;
  public lang:string;
  public employee_data;
  set_row = [];
  selected = [];
  tempFilter = [];
  timeout: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private router:Router,private staffService:StaffService) { 
    this.show_staff();
  }

  show_staff(){
    this.staffService.show_staff().subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].index = i+1;
      }
      this.employee_data = res;
      this.fetch((data) => {
        this.selected = [data[2]];
        this.set_row = data;
        this.tempFilter = [...data];
      });
    })
  }//show_staff

  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
  }

  table_work(id){
    this.router.navigate(['/plan/table-work-schedule'], { queryParams: { id: id } });
  }//table_work

  fetch(cb){
    var data_json_str = JSON.stringify(this.employee_data);
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
      return ((d.first_name.toLowerCase().indexOf(val) !== -1 || !val)||(d.last_name.toLowerCase().indexOf(val) !== -1 || !val));
    });

    // update the rows
    this.set_row = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
