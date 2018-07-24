import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import {IOption} from "ng-select";
import {SelectOptionService} from "../shared/elements/select-option.service";
import {RequirementService} from "../requirement.service";
import {ApproveService} from "../approve.service";
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-add-approve',
  providers: [RequirementService,ApproveService],
  templateUrl: './add-approve.component.html',
  styleUrls: ['./add-approve.component.css']
})
export class AddApproveComponent implements OnInit {

  public word;
  public lang:string;
  public requirement_id:number;
  public check_update:boolean;
  public check_update_apprve;
  public requirement_data = {
    program_name : '',
    first_name : '',
    last_name : '',
    requirement_no : '',
    employee_code : '',
    version : '',
    division_name : '',
    date_of_notification : '',
    department_name : '',
    company_name : '',
    program_support : '',
    customer_name : '',
    file : '',
    c_phone_number : '',
    requirement : '',
    want : ''
  };
  public date_of_permit;
  public number_of_day:number;
  public estimated_cost:number;
  public approve;
  public detail:string;
  private today;
  public permit_id;
  public validate_num_of_day:string;
  public validate_estimated_cost:string;

  constructor(private approveService:ApproveService,private requirementService:RequirementService,private route: ActivatedRoute,private router:Router,public selectOptionService: SelectOptionService) { 
    this.route.queryParams.subscribe(res=>{
      this.requirement_id = res.id;
      this.permit_id = res.p_id;
      if(res.action == 'approve'){
        this.check_update = false;
      }else{
        this.check_update = true;
      }
      this.set_page();
    });
  }//constructor

  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
    this.number_of_day = 1;
    this.estimated_cost = 0;
    
  }

  set_page(){
    this.requirementService.show_requirement_by_id(this.requirement_id).subscribe(res=>{
      this.requirement_data = res[0];
      if(this.requirement_data.file == ""){
        this.requirement_data.file = '-';
      }
    });

    if(this.check_update == false){
      var date = new Date;
      var m = date.getMonth()+1;
      var y = date.getFullYear();
      var d = date.getDate();
      var month;
      var day;
      if(m < 10){
        month = '0'+m;
      }else{
        month = m;
      }
      if(d < 10){
        day = '0'+d;
      }else{
        day = d;
      }
      this.today = y+'-'+month+'-'+day;
      this.date_of_permit = this.today;
    }else{
      this.approveService.show_approve_by_id(this.permit_id).subscribe(res=>{
        this.number_of_day = res[0].expected_to_take;
        this.estimated_cost = res[0].expenses;
        if(res[0].approval_results == true){
          this.approve = 1;
          this.check_update_apprve = 1;
        }else{
          this.approve = 0;
          this.check_update_apprve = 0;
        }
        var date_str = (res[0].date_of_permit).toString();
        this.date_of_permit = date_str.substring(0,10);
        this.detail = res[0].detail;
      })
    }
  }//set_page

  check_validate(){
    if(this.number_of_day == null || this.number_of_day == undefined){
      return false;
    }
    if(this.estimated_cost == null || this.estimated_cost == undefined){
      return false;
    }
    if(this.approve == undefined){
      return false;
    }
    if(this.date_of_permit == undefined || this.date_of_permit == ""){
      return false;
    }
    if(this.detail == undefined){
      this.detail = "";
    }
    return true;
  }//check_validate

  validate(){
    console.log((this.number_of_day%1));
    if((this.number_of_day%1)!= 0 || this.number_of_day <= 0){
      this.validate_num_of_day = this.word.data_min_0[this.lang];
    }else{
      this.validate_num_of_day = '';
    }
    if((this.estimated_cost%1)!=0 || this.estimated_cost < 0){
      this.validate_estimated_cost = this.word.data_min_1[this.lang];
    }else{
      this.validate_estimated_cost = '';
    }
  }//validate

  add_approve(){
    if(this.check_validate()){
      var endorser = localStorage.getItem('Employee_id');
      var status; 
      var approves;
      if(this.approve == 1){
        approves = true;
        status = 2;
      }else{
        approves = false;
        status = 3;
      }
      this.approveService.add_approve(this.requirement_id,this.number_of_day,this.estimated_cost,endorser,approves,this.detail,this.date_of_permit).subscribe(res=>{
        this.requirementService.update_status(status,this.requirement_id).subscribe(res=>{
          swal({
            title: this.word.succrss[this.lang],
            text: this.word.add_succrss[this.lang],
            type: 'success',
            confirmButtonText: 'OK',
            allowOutsideClick: true
          });
          this.router.navigateByUrl('/approve/approve');
        })
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
  }//add_approve

  update_approve(){
    if(this.check_validate()){
      var endorser = localStorage.getItem('Employee_id');
      var status; 
      var approves;
      if(this.approve == 1){
        approves = true;
        status = 2;
      }else{
        approves = false;
        status = 3;
      }
      this.approveService.update_approve(this.permit_id,this.requirement_id,this.number_of_day,this.estimated_cost,endorser,approves,this.detail,this.date_of_permit).subscribe(res=>{
        this.requirementService.update_status(status,this.requirement_id).subscribe(res=>{
          swal({
            title: this.word.succrss[this.lang],
            text: this.word.add_succrss[this.lang],
            type: 'success',
            confirmButtonText: 'OK',
            allowOutsideClick: true
          });
          this.router.navigateByUrl('/approve/approve-information');
        })
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
  }//update_approve

  download(file_name){
    this.requirementService.download(file_name).subscribe(data=>{
      saveAs(data['_body'],file_name);
      //console.log(data['_body']);
    },error=>{
      console.log(error);
    });
  }//download


}
