import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {IOption} from "ng-select";
import {SelectOptionService} from "../shared/elements/select-option.service";
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {StaffService} from "../staff.service";
import {Http} from "@angular/http";
import swal from 'sweetalert2';
@Component({
  selector: 'app-staff',
  providers: [StaffService],
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  public word;
  public lang:string;
  public staff_data;
  set_row = [];
  selected = [];
  tempFilter = [];
  timeout: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private router:Router, private staffService:StaffService) { 
    this.show_staff();
  }

  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
  }

  show_staff(){
    this.staffService.show_staff().subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].index = i+1;
      }
      this.staff_data = res;
      this.fetch((data) => {
        this.selected = [data[2]];
        this.set_row = data;
        this.tempFilter = [...data];
      });
    });
  }//show_staff

  delete_staff(id){
    
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
      thisx.staffService.delete_staff(id).subscribe(res=>{
        swal({
          title: thisx.word.succrss[thisx.lang],
          text: thisx.word.delete_succrss[thisx.lang],
          type: 'success',
          confirmButtonText: 'OK',
        });
        thisx.show_staff();
      });
    })
    .catch(swal.noop);
  }//delete_staff

  update_staff(id){
    this.router.navigate(['/basic-data/add-staff'], { queryParams: { id: id } });
  }//update_staff

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data

    const temp = this.tempFilter.filter(function(d) {
      if((d.first_name.toLowerCase().indexOf(val) !== -1 || !val)||(d.last_name.toLowerCase().indexOf(val) !== -1 || !val)){
        return true;
      }else{
        return false;
      }
    });

    // update the rows
    this.set_row = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  fetch(cb){
    var data_json_str = JSON.stringify(this.staff_data);
    cb(JSON.parse(data_json_str));
  }

  onSelect({ selected }) {

  }

  onActivate(event) {

  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  openMyModal(event) {
    document.querySelector("#"+event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
 
}
