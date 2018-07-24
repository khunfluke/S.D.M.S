import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {RequirementService} from "../requirement.service";
import swal from 'sweetalert2';

@Component({
  selector: 'app-requirement',
  providers: [RequirementService],
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.css']
})
export class RequirementComponent implements OnInit {

  public word;
  public lang:string;
  public requirement_data;
  set_row = [];
  selected = [];
  timeout: any;
  tempFilter = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private router:Router,private requirementService:RequirementService) { 
    this.show_requirement();
  }

  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
  }

  show_requirement(){
    this.requirementService.show_requirement().subscribe(res=>{
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

  update_requirement(id){
    this.router.navigate(['add-requirement'], { queryParams: { id: id } });
  }//update_requirement

  delete_requirement(id,event){
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
      thisx.requirementService.delete_requirement(id).subscribe(res=>{
        swal({
          title: thisx.word.succrss[thisx.lang],
          text: thisx.word.delete_succrss[thisx.lang],
          type: 'success',
          confirmButtonText: 'OK',
        });
        thisx.remove_file(res[0].file);
        //console.log(res)
        thisx.show_requirement();
      });
    })
    .catch(swal.noop);
  }//delete_requirement

  remove_file(file_name){
    if(file_name != ''){
      this.requirementService.remove_file(file_name).subscribe(res=>{
        console.log('remove file secess');
      })
    }
  }//remove_file

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
