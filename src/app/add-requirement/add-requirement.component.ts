import { Component, OnInit,ElementRef, ViewChild,Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute,Router } from '@angular/router';
import {IOption} from "ng-select";
import {SelectOptionService} from "../shared/elements/select-option.service";
import {RequirementService} from "../requirement.service";
import {CompanyService} from "../company.service";
import {StaffService} from "../staff.service";
import swal from 'sweetalert2';
import * as moment from 'moment-timezone';

import { saveAs } from 'file-saver';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

var full_url = (window.location.href).toString();
var port_cut = full_url.search(':4200');
var url = full_url.substr(0,port_cut);
const URL = url+":3500/upload/upload";
//const URL = 'http://localhost:3500/upload/upload';

@Component({
  selector: 'app-add-requirement',
  providers: [RequirementService,CompanyService,StaffService],
  templateUrl: './add-requirement.component.html',
  styleUrls: ['./add-requirement.component.css']
})
export class AddRequirementComponent implements OnInit {

  public word;
  public lang:string;
  public program_name:string;
  public version;
  public want:string;
  public date_of_notification;
  public detail:string;
  public document;
  public company_id;
  public customer_name;
  public customer_phone_number;
  public employee_id;
  public employee_code;
  public division;
  public department;
  public company_data;
  public employee_data;
  public requirement_no:string;
  public program_support:string;
  public requirement_id:number;
  public check_update:boolean;
  public old_file;
  public validate_version:string;

  //public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'document'});

  constructor(private route: ActivatedRoute,private http: Http,private el: ElementRef,private router:Router,public selectOptionService: SelectOptionService,private companyService:CompanyService,private staffService:StaffService,private requirementService:RequirementService) {
    this.show_customer();
    this.show_employee();
   }  

  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
    this.route.queryParams.subscribe(res=>{
      this.requirement_id = res.id;
      this.set_page();
    });
    // this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    // this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
    //   console.log("ImageUpload:uploaded:", item, status, response);
    // };

  }//ngOnInit

  set_page(){
    if(this.requirement_id != undefined){
      this.check_update = true;
      this.requirementService.show_requirement_by_id(this.requirement_id).subscribe(res=>{
        this.program_name = res[0].program_name;
        this.requirement_no = res[0].requirement_no;
        this.version = res[0].version;
        this.want = res[0].want;
        this.program_support = res[0].program_support;
        this.date_of_notification = moment(res[0].date_of_notification).tz('Asia/Bangkok').format('YYYY-MM-DD');
        this.detail = res[0].requirement;
        this.company_id = [res[0].customer_id];
        this.customer_name = res[0].customer_name;
        this.customer_phone_number = res[0].c_phone_number;
        this.employee_id = [res[0].employee_id];
        this.employee_code = res[0].employee_code;
        this.division = res[0].division_name;
        this.department = res[0].department_name;
        this.old_file = res[0].file;
      })
    }else{
      this.check_update = false;
      this.requirementService.show_max_requirement_id().subscribe(res=>{
        this.requirement_no = 'DC-'+res[0].get_id;
      })
     this.date_of_notification = moment().tz('Asia/Bangkok').format('YYYY-MM-DD');
    }
  }//set_page

  show_customer(){
    this.companyService.show_company().subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].value = res[i].customer_id;
        res[i].label = res[i].company_name;
      }
      this.company_data = res;
    });
  }//show_customer

  show_employee(){
    this.staffService.show_staff().subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].value = res[i].employee_id;
        res[i].label = res[i].first_name + " " + res[i].last_name;
      }
      this.employee_data = res;
    });
  }//show_employee

  set_customer_data(event){
    for(var i=0;i<this.company_data.length;i++){
      if(this.company_data[i].customer_id == event){
        this.customer_name = this.company_data[i].customer_name;
        this.customer_phone_number = this.company_data[i].phone_number;
      }
    }
  }//set_customer_data

  set_employee_data(event){
    for(var i=0;i<this.employee_data.length;i++){
      if(this.employee_data[i].employee_id == event){
        this.employee_code = this.employee_data[i].employee_code;
        this.division = this.employee_data[i].division_name;
        this.department = this.employee_data[i].department_name;
      }
    }
  }//set_employee_data

  upload(file_name) {
    // let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#document');
    // let fileCount: number = inputEl.files.length;
    //if (fileCount > 0) { // a file was selected
    //  var file = inputEl.files.item(0);
    if(this.document != undefined && this.document != ""){
      var document_name = this.document.name.toString();
      var dot = document_name.indexOf('.');
      var document_type = document_name.substring(dot);
      var id = file_name;
      file_name = file_name+document_type;
      let formData = new FormData();
      formData.append('document', this.document,file_name);
      this.http.post(URL, formData).map((res:Response) => res.json()).subscribe((success) => {
          this.requirementService.upload_file(id,file_name).subscribe(res=>{  
            console.log("Upload file success");
          })
        },(error) =>{
          console.log("Upload file error");
      });
    }
  }//upload

  download(){
    this.requirementService.download(this.old_file).subscribe(data=>{
      saveAs(data['_body'],this.old_file);
      //console.log(data['_body']);
    },error=>{
      console.log(error);
    });
  }//download

  onFileChange(){
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#document');
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if (fileCount > 0) {
      this.document = inputEl.files.item(0);
    }
  }

  check_validate(){
    if(this.program_name == "" || this.program_name == undefined){
      return false
    }
    if(this.version == null || this.version == undefined){
      return false;
    }
    if(this.requirement_no == "" || this.requirement_no == undefined){
      return false;
    }
    if(this.want == "" || this.want == undefined){
      return false;
    }
    if(this.program_support == undefined){
      return false;
    }
    if(this.date_of_notification == "" || this.date_of_notification == undefined){
      return false;
    }
    if(this.detail == "" || this.detail == undefined){
      return false;
    }
    if(this.company_id == null || this.company_id == undefined){
      return false;
    }
    if(this.employee_id == null || this.employee_id == undefined){
      return false;
    }
    if(this.document == undefined){
      this.document = "";
    }
    return true;
  }//check_validate

  validate(){
    if(this.version <= 0 ){
      this.validate_version = this.word.data_min_0[this.lang];
    }else{
      this.validate_version = '';
    }
  }//validate

  add_requirement(event){
      if(this.check_validate()){
      this.requirementService.add_requirement(this.program_name,this.version,this.want,this.date_of_notification,this.detail,'',this.company_id,this.employee_id,this.requirement_no,this.program_support).subscribe(res=>{
        swal({
          title: this.word.succrss[this.lang],
          text: this.word.add_succrss[this.lang],
          type: 'success',
          confirmButtonText: 'OK',
          allowOutsideClick: true
        });
        this.upload(res[0].requirement_id);
        this.router.navigateByUrl('/requirement');
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
  }//add_requirement

  update_requirement(){
    if(this.check_validate()){
      this.requirementService.update_requirement(this.requirement_id,this.program_name,this.version,this.want,this.date_of_notification,this.detail,'',this.company_id,this.employee_id,this.requirement_no,this.program_support).subscribe(res=>{
        swal({
          title: this.word.succrss[this.lang],
          text: this.word.update_succrss[this.lang],
          type: 'success',
          confirmButtonText: 'OK',
        });
        if(this.document != undefined && this.document != ""){
          this.requirementService.remove_file(this.old_file).subscribe(ress=>{
          }); 
        }
        this.upload(this.requirement_id);
        this.router.navigate(['/requirement']);
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
  }//update_requirement

}
