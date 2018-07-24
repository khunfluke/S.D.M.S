import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import {IOption} from "ng-select";
import {SelectOptionService} from "../shared/elements/select-option.service";
import {MeetingService} from "../meeting.service";
import {AttendeesService} from "../attendees.service";
import swal from 'sweetalert2';
import { StaffService } from 'app/staff.service';
import { color } from 'd3';
import {UploadFileService} from "../upload-file.service";
import { saveAs } from 'file-saver';
import * as moment from 'moment-timezone';


@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css'],
  providers : [MeetingService,StaffService,AttendeesService,UploadFileService]
})
export class AddMeetingComponent implements OnInit {
  public word;
  public lang:string;
  public employee_id = [];
  public conference_topics:string;
  public meeting_no:number;
  public meeting_date;
  public start_time;
  public end_time;
  public place:string;
  public description:string;
  public file;
  public secretary;
  public staff_data;
  public first_name;
  public last_name;
  public index;
  public attendees = [];
  public meeting_id;
  public check_update:boolean;
  public today;
  public old_file;
  public attendees_id = [];
  public meeting_id_attendees;
  simpleOption: Array<IOption> = this.selectOptionService.getCharacters();

  constructor(private route: ActivatedRoute,private router:Router,public selectOptionService: SelectOptionService,private meetingService:MeetingService,private staffService:StaffService,private attendeesService:AttendeesService,private uploadFileService:UploadFileService) { 
    this.show_staff();
  }

  ngOnInit() {   
    this.check_update = false;
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
    this.attendees.push(null);
    this.route.queryParams.subscribe(res=>{
      this.meeting_id = res.id;
      this.set_page();
    })
 
  }

  show_staff(){
    this.staffService.show_staff().subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].value = res[i].employee_id;
        res[i].label = res[i].first_name+' '+res[i].last_name;
      }
      this.staff_data = res;
    })
  }//show_staff

  set__staff_id(event){
    var employee_id:number;
    for(var i=0;i<this.staff_data.length;i++){
      if(this.staff_data[i].division_id == event){
        employee_id = +this.staff_data[i].employee_id;
      }
    }
    this.employee_id = [employee_id];
  }//set__staff_id

  add_attendees(){
    this.attendees.push(null);
  }
  del_add_attendees(index){

    if (this.attendees.length > 1 ) {
        this.attendees.splice(index, 1);
        this.employee_id.splice(index, 1);
    }; 
  }

  set_page(){
    if(this.meeting_id != undefined){
      this.check_update = true; 
      this.meetingService.show_meeting_by_id(this.meeting_id).subscribe(res=>{
        this.conference_topics = res[0].conference_topics;
        this.meeting_no = res[0].meeting_no;
        this.meeting_date = moment(res[0].meeting_date).tz('Asia/Bangkok').format('YYYY-MM-DD');
        this.start_time = [res[0].start_time];
        this.end_time = res[0].end_time;
        this.place = res[0].place;
        this.description = res[0].description;
        this.secretary = [res[0].secretary];
        for(var i=0; i < res.length ; i++){
         this.employee_id[i] = [res[i].employee_id];
         if(i < (res.length-1)){
           this.attendees.push(null);
         }
        }
        this.old_file = res[0].file;
      });
      // this.meetingService.show_attendees_by_id(this.meeting_id).subscribe(res=>{
      // //  console.log(this.attendees_id.length);
      //   this.meeting_id_attendees = res[0].meeting_id;
      //  });
    }else{
      this.meeting_date = moment().tz('Asia/Bangkok').format('YYYY-MM-DD');
    }
  }//set_page

  check_validate(){
    if(this.conference_topics == "" || this.conference_topics == undefined){
      return false
    }
    if(this.meeting_no == null || this.meeting_no == undefined){
      return false;
    }
    if(this.meeting_date == null|| this.meeting_date == undefined){
      return false;
    }
    if(this.start_time == null || this.start_time == undefined){
      return false;
    }
    if(this.end_time == "" || this.end_time == undefined){
      return false;
    }
    if(this.place == "" || this.place == undefined){
      return false;
    }
    if(this.description == null || this.description == undefined){
      return false;
    }
    if(this.secretary == null || this.secretary == undefined){
      return false;
    }
    return true;
  }//check_validate

  add_meeting(event){
    if((this.conference_topics == ""||this.conference_topics == undefined) || (this.meeting_no == null || this.meeting_no == undefined) || (this.meeting_date == null || this.meeting_date == undefined) || (this.start_time == null || this.start_time == undefined) || (this.end_time == null || this.end_time == undefined) || (this.place == "" || this.place == undefined)|| (this.description == "" || this.description == undefined) || (this.secretary == "" || this.secretary == undefined)){
     this.closeMyModal(event);
     swal({
       title: this.word.warning[this.lang],
       text: this.word.pleas_enter_data[this.lang],
       type: 'warning',
       confirmButtonText: 'OK',
       allowOutsideClick: true
     });
   }else{
     this.meetingService.add_meeting(this.conference_topics,this.meeting_no,this.meeting_date,this.start_time,this.end_time,this.place,this.description,"",this.secretary).subscribe(res=>{
       this.add_attendeesinto(res[0].meeting_id);
       this.upload(res[0].meeting_id);
       swal({
        title: this.word.succrss[this.lang],
        text: this.word.add_succrss[this.lang],
        type: 'success',
        confirmButtonText: 'OK',
        allowOutsideClick: true
      });
 this.router.navigateByUrl('/meeting');
     })
    }
 }//add_meeting

 onFileChange(event){
  this.file = event.target.files[0] ;
}

upload(file_name) {
  if(this.file != undefined && this.file != ""){
    var document_name = this.file.name.toString();
    var dot = document_name.indexOf('.');
    var document_type = document_name.substring(dot);
    var id = file_name;
    file_name = file_name+document_type;
    this.uploadFileService.upload_file(this.file,file_name).subscribe(res=>{ 
      if(res.success == true){
        this.meetingService.update_file(id,file_name).subscribe(res=>{
          console.log("upload file success");
        })
      }else{
        console.log("upload file error")
      }
    })
  }
}//upload

download(){
  this.meetingService.download(this.old_file).subscribe(data=>{
    saveAs(data['_body'],this.old_file);
    //console.log(data['_body']);
  },error=>{
    console.log(error);
  });
}//download

 add_attendeesinto(meeting_id){
   this.attendeesService.add_attendeesinto(this.employee_id,meeting_id).subscribe(res=>{
   })
}//add_attendees

delete_attendees(meeting_id){
  this.attendeesService.delete_attendees(this.meeting_id).subscribe(res=>{
  })
}//delete_attendees

update_meeting(){
  if(this.check_validate()){
    this.meetingService.update_meeting(this.meeting_id,this.conference_topics,this.meeting_no,this.meeting_date,this.start_time,this.end_time,this.place,this.description,"",this.secretary).subscribe(res=>{
      swal({
        title: this.word.succrss[this.lang],
        text: this.word.update_succrss[this.lang],
        type: 'success',
        confirmButtonText: 'OK',
      });
      if(this.file != undefined && this.file != ""){
        this.meetingService.remove_file_by_meeting(this.old_file).subscribe(ress=>{
        }); 
      }
      this.upload(this.meeting_id);
      this.router.navigate(['/meeting']);
      this.delete_attendees(res[0].meeting_id);
      this.add_attendeesinto(res[0].meeting_id);
    });
  }else{
    swal({
      title: this.word.warning[this.lang],
      text: this.word.pleas_enter_data[this.lang],
      type: 'warning',
      confirmButtonText: 'OK',
      allowOutsideClick: true
    });
  }
}//update_meeting

closeMyModal(event) {
  ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
}

}
