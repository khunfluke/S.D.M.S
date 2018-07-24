import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {DevelopService} from "../develop.service";
import {TaskService} from "../task.service";
import * as moment from 'moment-timezone';
import swal from 'sweetalert2';

@Component({
  selector: 'app-develop',
  providers : [DevelopService,TaskService],
  templateUrl: './develop.component.html',
  styleUrls: ['./develop.component.css']
})
export class DevelopComponent implements OnInit {

  public word;
  public lang:string;
  public task_data;
  set_row = [];
  selected = [];
  timeout: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private router:Router,private developService:DevelopService,private taskService:TaskService) { 
    this.show_develop();
  }

  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
  }

  show_develop(){
    this.developService.show_develop().subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].index = i+1;
        res[i].operator_name = res[i].first_name + ' '+res[i].last_name;
        res[i].deadline = moment(res[i].deadline).tz('Asia/Bangkok').format('DD-MM-YYYY');
      }
      this.task_data = res;
      this.fetch((data) => {
        this.selected = [data[2]];
        this.set_row = data;
      });
    });
  }//show_develop

  edit_develop(task_id){
    this.router.navigate(['/add-develop'], { queryParams: { id: task_id } });
  }//edit_develop

  delete_develop(task_id){
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
      thisx.developService.delete_develop(task_id).subscribe(res=>{
        swal({
          title: thisx.word.succrss[thisx.lang],
          text: thisx.word.delete_succrss[thisx.lang],
          type: 'success',
          confirmButtonText: 'OK',
        });
        thisx.taskService.update_status_task(task_id,2).subscribe(res=>{
          thisx.show_develop();
        })
        
      });
    })
    .catch(swal.noop);
  }//delete_develop

  fetch(cb){

    var data_json_str = JSON.stringify(this.task_data);
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

}
