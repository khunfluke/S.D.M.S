import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { Http, Response } from '@angular/http';
import {ActivatedRoute,Router } from '@angular/router';
import {TaskService} from '../task.service';
import {StaffService} from '../staff.service';
import * as moment from 'moment-timezone';


@Component({
  selector: 'app-table-work-schedule',
  providers: [TaskService,StaffService],
  templateUrl: './table-work-schedule.component.html',
  styleUrls: ['./table-work-schedule.component.css']
})
export class TableWorkScheduleComponent implements OnInit {

  public word;
  public lang;
  public employee_data = [{
    first_name : '',
    employee_code : '',
    position_name : '',
    division_name : '',
  }];
  public employee_id:number;
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  
  constructor(private taskService:TaskService,private staffService:StaffService,private route: ActivatedRoute,private http: Http,) {
    this.route.queryParams.subscribe(res=>{
      this.employee_id = res.id;
      if(this.employee_id != undefined){
        this.set_page();
      }
    });
  }

  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
  }

  set_page(){
    this.staffService.show_staff_by_id(this.employee_id).subscribe(res=>{
      this.employee_data = res[0];
    })
    this.taskService.show_sub_task_by_employee_id(this.employee_id).subscribe(res=>{
      var data = [];
      for(var i=0;i<res.length;i++){
        data.push({
          title  : res[i].sub_task_name,
          start  : moment(res[i].expect_start_date).tz('Asia/Bangkok').format('YYYY-MM-DD'),
          end    : moment(res[i].expect_end_date).tz('Asia/Bangkok').format('YYYY-MM-DD')
        })
      }
  
       this.calendarOptions = {
          editable: true,
          eventLimit: false,
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month'//,agendaWeek,agendaDay,listMonth
          },
          events: data
        };
    })
  }//set_page

}
