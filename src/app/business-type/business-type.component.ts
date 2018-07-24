import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {BusunessTypeService} from "../busuness-type.service";
import swal from 'sweetalert2';

@Component({
  selector: 'app-business-type',
  templateUrl: './business-type.component.html',
  styleUrls: ['./business-type.component.css'],
  providers: [BusunessTypeService]
})
export class BusinessTypeComponent implements OnInit {

  public word;
  public lang:string;
  public business_type:string;
  public check_update = false;
  private business_type_data;
  public business_type_id:number;
  set_row = [];
  selected = [];
  tempFilter = [];
  timeout: any;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private router:Router,private busunessTypeService:BusunessTypeService) { 
    this.show_business_type();
  }

  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
  }

  show_business_type(){
    this.busunessTypeService.show_business_type().subscribe(res=>{
  
      for(var i=0;i<res.length;i++){
        res[i].index = i+1;
      }
      this.business_type_data = res;
      this.fetch((data) => {
        this.selected = [data[2]];
        this.set_row = data;
        this.tempFilter = [...data];
      });
    })
  }

  check_repeate(){
    for(var i=0;i<this.business_type_data.length;i++){
      if(this.business_type == this.business_type_data[i].business_type_name){
        return false;
      }
    }
    return true;
  }//check_repeate

  add_business_type(event){ 
    this.check_update=false;
    var check_business_type_name;
    if(this.business_type == undefined || this.business_type == ""){
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
        this.busunessTypeService.add_business_type(this.business_type).subscribe(res=>{
          swal({
            title: this.word.succrss[this.lang],
            text: this.word.add_succrss[this.lang],
            type: 'success',
            confirmButtonText: 'OK',
            allowOutsideClick: true
        });
          this.show_business_type();
          this.closeMyModal(event);
      });
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
  }

  check_delete_business_type(event,id){
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
      thisx.delete_business_type(event,id);
    })
    .catch(swal.noop);
  }//check_delete_business_type

  delete_business_type(event,id:number){
    this.busunessTypeService.delete_business_type(id).subscribe(res=>{
      swal({
        title: this.word.succrss[this.lang],
        text: this.word.delete_succrss[this.lang],
        type: 'success',
        confirmButtonText: 'OK',
      });
      this.show_business_type();
    })
  }//delete_department

  check_update_business_type(event, id, name, openmodal){
     this.check_update = true;
    this.business_type_id = id;
    this.business_type = name;
    this.openMyModal(openmodal);
  }//check_update_department

  check_add_department(event){
    this.check_update = false;
    this.openMyModal(event);
  }

  update_business_type(event){
    if(this.business_type == undefined || this.business_type == ""){
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
        this.busunessTypeService.update_business_type(this.business_type_id,this.business_type).subscribe(res=>{
          swal({
            title: this.word.succrss[this.lang],
            text: this.word.update_succrss[this.lang],
            type: 'success',
            confirmButtonText: 'OK',
          });
          this.closeMyModal(event);
          this.show_business_type();
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
    var data_json_str = JSON.stringify(this.business_type_data);
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
      //  filter our data

      const temp = this.tempFilter.filter(function(d) {
        return d.business_type_name.toLowerCase().indexOf(val) !== -1 || !val;
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
    this.business_type = "";
  }

}
