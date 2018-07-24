import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {DivisionService} from "../division.service";
import {DepartmentService} from "../department.service";
import swal from 'sweetalert2';

@Component({
  selector: 'app-division',
  providers: [DivisionService,DepartmentService],
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent implements OnInit {
  public word;
  public lang:string;
  public division_data;
  public department_data;
  public division_name:string;
  public department_id;
  public check_update = false;
  public division_id:number;
  set_row = [];
  selected = [];
  tempFilter = [];
  timeout: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private router:Router, private divisionService:DivisionService, private departmentService:DepartmentService) { 
    this.show_division();
    this.show_department();
  }


  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
    
  }

  show_division(){
    this.divisionService.show_division().subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].index = i+1;
      }
      this.division_data = res;
      this.fetch((data) => {
        this.selected = [data[2]];
        this.set_row = data;
        this.tempFilter = [...data];
      });
    })
  }//show_division

  check_repeate(){
    for(var i=0;i<this.division_data.length;i++){
      if(this.division_data[i].division_name == this.division_name && this.division_data[i].department_id == this.department_id){
        return false;
      }
    }
    return true;
  }//check_repeate

  add_division(event){
    if((this.division_name == ""||this.division_name == undefined) || (this.department_id == null || this.department_id == undefined)){
      this.closeMyModal(event);
      swal({
        title: this.word.warning[this.lang],
        text: this.word.pleas_enter_data[this.lang],
        type: 'warning',
        confirmButtonText: 'OK',
        allowOutsideClick: true
      });
    }else{
      if(this.check_repeate()){
        this.divisionService.add_division(this.division_name,this.department_id).subscribe(res=>{
          swal({
            title: this.word.succrss[this.lang],
            text: this.word.add_succrss[this.lang],
            type: 'success',
            confirmButtonText: 'OK',
            allowOutsideClick: true
          });
          this.show_division();
          this.closeMyModal(event);
        })
      }else{
        this.closeMyModal(event);
        swal({
          title: this.word.warning[this.lang],
          text: this.word.duplicate[this.lang],
          type: 'warning',
          confirmButtonText: 'OK',
          allowOutsideClick: true
        });
      }
    }

  }//add_division

  delete_division(event,id){
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
    }).then(function(isConfirm){
      thisx.divisionService.delete_division(id).subscribe(res=>{
        swal({
          title: thisx.word.succrss[thisx.lang],
          text: thisx.word.delete_succrss[thisx.lang],
          type: 'success',
          confirmButtonText: 'OK',
        });
        thisx.show_division();
      });
    })
    .catch(swal.noop);
  }//delete_division

  check_add(event){
    this.check_update = false; 
    this.openMyModal(event);
  }

  set_value_update(event,division_id,division_name,department_id){
    this.openMyModal(event);
    this.check_update = true; 
    this.division_id = division_id;
    this.division_name = division_name;
    this.department_id = [department_id];
  }//set_value_update

  update_division(event){
    if((this.division_name==""||this.division_name==undefined)||(this.division_id==null||this.division_id==undefined)){
      this.closeMyModal(event);
      swal({
        title: this.word.warning[this.lang],
        text: this.word.pleas_enter_data[this.lang],
        type: 'warning',
        confirmButtonText: 'OK',
        allowOutsideClick: true
      });
    }else{
      if(this.check_repeate()){
        this.divisionService.update_division(this.division_id,this.division_name,this.department_id).subscribe(res=>{
          swal({
            title: this.word.succrss[this.lang],
            text: this.word.update_succrss[this.lang],
            type: 'success',
            confirmButtonText: 'OK',
          });
          this.closeMyModal(event);
          this.show_division();
        })
      }else{
        this.closeMyModal(event);
        swal({
          title: this.word.warning[this.lang],
          text: this.word.duplicate[this.lang],
          type: 'warning',
          confirmButtonText: 'OK',
          allowOutsideClick: true
        });
      }
    }
  }//update_division

  // show_department(){
  //   this.departmentService.show_department().subscribe(res=>{
  //     this.department = res;
  //   })
  // }//show_department
  show_department(){
    this.departmentService.show_department().subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].value = res[i].department_id;
        res[i].label = res[i].department_name;
      }
      this.department_data = res;
    })
  }

  fetch(cb){
    var data_json_str = JSON.stringify(this.division_data);
    cb(JSON.parse(data_json_str));
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data

    const temp = this.tempFilter.filter(function(d) {
      return d.division_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.set_row = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
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
    this.division_name = "";
    this.department_id = null;
    this.check_update = false; 
    this.division_id = null;
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

}
