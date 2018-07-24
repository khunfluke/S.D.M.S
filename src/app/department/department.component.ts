import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {Http} from "@angular/http";
import {DepartmentService} from "../department.service";
import swal from 'sweetalert2';

@Component({
  selector: 'app-department',
  providers: [DepartmentService],
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  
  public word;
  public lang:string;
  public department_id:number;
  public department_name:string;
  public check_update = false;
  private department_data;
  set_row = [];
  selected = [];
  tempFilter = [];
  timeout: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private departmentService:DepartmentService,private router:Router) { 
  }

  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
    this.show_department();
  }

  show_department(){
    this.departmentService.show_department().subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].index = i+1;
      }
      this.department_data = res;
      this.fetch((data) => {
        this.selected = [data[2]];
        this.set_row = data;
        this.tempFilter = [...data];
      });
    })
  }

  check_repeate(){
    for(var i=0;i<this.department_data.length;i++){
      if(this.department_data[i].department_name == this.department_name){
        return false;
      }
    }
    return true
  }//check_repeate

  add_department(event){
    var check_department_name;
    if(this.department_name == undefined || this.department_name == ""){
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
        this.departmentService.add_department(this.department_name).subscribe(res=>{
          swal({
            title: this.word.succrss[this.lang],
            text: this.word.add_succrss[this.lang],
            type: 'success',
            confirmButtonText: 'OK',
            allowOutsideClick: true
          });
          this.show_department();
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
  }//add_department

  check_delete_department(event,id){
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
      thisx.delete_department(event,id);
    })
    .catch(swal.noop);
  }//check_delete_department

  delete_department(event,id:number){
    this.departmentService.delete_department(id).subscribe(res=>{
      swal({
        title: this.word.succrss[this.lang],
        text: this.word.delete_succrss[this.lang],
        type: 'success',
        confirmButtonText: 'OK',
      });
      this.show_department();
    })
  }//delete_department

  check_update_department(event, id, name, openmodal){
    this.check_update = true;
    this.department_id = id;
    this.department_name = name;
    this.openMyModal(openmodal);
  }//check_update_department

  check_add_department(event){
    this.check_update = false;
    this.openMyModal(event);
  }

  update_department(event){
    if(this.department_name == undefined || this.department_name == ""){
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
        this.departmentService.update_department(this.department_id,this.department_name).subscribe(res=>{
          swal({
            title: this.word.succrss[this.lang],
            text: this.word.update_succrss[this.lang],
            type: 'success',
            confirmButtonText: 'OK',
          });
          this.closeMyModal(event);
          this.show_department();
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
  }//update_department

  fetch(cb){
    var data_json_str = JSON.stringify(this.department_data);
    cb(JSON.parse(data_json_str));
  }

  onSelect({ selected }) {}

  onActivate(event) {

  }

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
      return d.department_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.set_row = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  openMyModal(event) {
    document.querySelector("#"+event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
    this.department_name = "";
  }
  
}
