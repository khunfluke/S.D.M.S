import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {RequirementService} from "../requirement.service"

@Component({
  selector: 'app-approve',
  providers: [RequirementService],
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {

  public word;
  public lang:string;
  public requirement_data;
  set_row = [];
  selected = [];
  timeout: any;
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private router:Router,private requirementService:RequirementService) { 
    
  }

  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
    this.show_requirement();
  }

  show_requirement(){
    this.requirementService.show_requirement_by_approve().subscribe(res=>{
        for(var i=0;i<res.length;i++){
          res[i].index = i+1;
        }
        this.requirement_data = res;
        this.fetch((data) => {
          this.selected = [data[2]];
          this.set_row = data;
          this.tempFilter = [...data];
        });
    })
  }//show_requirement

  approve(id){
    this.router.navigate(['add-approve'], { queryParams: { id: id,action:'approve' } });
  }//approve

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
