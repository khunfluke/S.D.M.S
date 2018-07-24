import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {IOption} from "ng-select";
import {SelectOptionService} from "../shared/elements/select-option.service";
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {Http} from "@angular/http";
import {MeetingService} from "../meeting.service";
import swal from 'sweetalert2';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css'],
  providers : [MeetingService]
})
export class MeetingComponent implements OnInit {
  public word;
  public lang:string;
  public meeting_data;
  
  start_time_end = [];
  set_row = [];
  selected = [];
  tempFilter = [];
  timeout: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private router:Router,private meetingService:MeetingService) { 
  this.show_meeting();
  }
  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
  }

  show_meeting(){
    this.meetingService.show_meeting().subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].index = i+1;
        res[i].label = moment(res[i].start_time,"HH:mm:ss").format("HH:mm")+' - '+ moment(res[i].end_time,"HH:mm:ss").format("HH:mm");
      }
      this.meeting_data = res;
      this.fetch((data) => {
        this.selected = [data[2]];
        this.set_row = data;
        this.tempFilter = [...data];
      });
    });
  }//show_requirement

  delete_meeting(id,event){
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
      thisx.meetingService.delete_meeting(id).subscribe(res=>{
        swal({
          title: thisx.word.succrss[thisx.lang],
          text: thisx.word.delete_succrss[thisx.lang],
          type: 'success',
          confirmButtonText: 'OK',
        });
        thisx.remove_file_by_meeting(res[0].file);
        thisx.show_meeting();
      });
    })
    .catch(swal.noop);
  }//delete_meeting

  remove_file_by_meeting(file_name){
    if(file_name != ''){
      this.meetingService.remove_file_by_meeting(file_name).subscribe(res=>{
        console.log('remove file secess');
      })
    }
  }//remove_file

  update_meeting(id){
    this.router.navigate(['add-meeting'], { queryParams: { id: id } });
  }//update_meeting

fetch(cb){

  var data_json_str = JSON.stringify(this.meeting_data);
  cb(JSON.parse(data_json_str));
}

// fetch(cb){
//   var data_json = [
//     {no:0,program_name:'SDMS',compane:'30%',name:'Thapussan Sukvisit'},
//     {no:1,program_name:'FMS',compane:'90%',name:'Thapussan Sukvisit'}
//   ];
//   var data_json_str = JSON.stringify(data_json);
//   cb(JSON.parse(data_json_str));
// }
  onSelect({ selected }) {}

  onActivate(event) {}

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
  
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.tempFilter.filter(function(d) {
      return d.conference_topics.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.set_row = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
}

}
