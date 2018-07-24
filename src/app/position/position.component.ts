import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {PositionService} from "../position.service";
import swal from 'sweetalert2';

@Component({
  selector: 'app-position',
  providers: [PositionService],
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  public word;
  public lang:string;
  public position_name:string;
  public position_id:number;
  public tempFilter;
  public position_data;
  public check_update = false;
  set_row = [];
  selected = [];
  timeout: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private router:Router, private positionService:PositionService) { 
    this.show_position();
    this.position_name = "";
  }

  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
  }

  check_add_position(event){
    this.openMyModal(event);
  }//check_add_position

  check_repeate(){
    for(var i=0;i<this.position_data.length;i++){
      if(this.position_name == this.position_data[i].position_name){
        return false;
      }
    }
    return true;
  }//check_repeate

  add_position(event){
    if(this.position_name == "" || this.position_name == undefined){
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
        this.positionService.add_position(this.position_name).subscribe(res=>{
          swal({
            title: this.word.succrss[this.lang],
            text: this.word.add_succrss[this.lang],
            type: 'success',
            confirmButtonText: 'OK',
            allowOutsideClick: true
          });
          this.position_name = "";
          this.show_position();
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

  }//add_position

  show_position(){
    this.positionService.show_position().subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].index = i+1;
      }
      this.position_data = res;
      this.fetch((data) => {
        this.selected = [data[2]];
        this.set_row = data;
        this.tempFilter = [...data];
      });
    })
  }//show_position

  delete_position(event,position_id){
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
      thisx.positionService.delete_position(position_id).subscribe(res=>{
        swal({
          title: thisx.word.succrss[thisx.lang],
          text: thisx.word.delete_succrss[thisx.lang],
          type: 'success',
          confirmButtonText: 'OK',
        });
        thisx.show_position();
      });
    })
    .catch(swal.noop);
  }//delete_position

  set_value_for_update(event,id,name){
    this.check_update = true;
    this.position_name = name;
    this.position_id = id;
    this.openMyModal(event);
  }//set_value_for_update  

  update_position(event){
    if(this.position_name == undefined || this.position_name == "" || this.position_id == undefined || this.position_id == null){
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
        this.positionService.update_position(this.position_id,this.position_name).subscribe(res=>{
          swal({
            title: this.word.succrss[this.lang],
            text: this.word.update_succrss[this.lang],
            type: 'success',
            confirmButtonText: 'OK',
          });
          this.closeMyModal(event);
          this.show_position();
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
  }//update_position

  fetch(cb){
    var data_json_str = JSON.stringify(this.position_data);
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

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data

    const temp = this.tempFilter.filter(function(d) {
      return d.position_name.toLowerCase().indexOf(val) !== -1 || !val;
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
    this.check_update = false;
    this.position_name = "";
    this.position_id = null;
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

}
