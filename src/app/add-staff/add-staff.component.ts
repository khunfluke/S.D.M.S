import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router } from '@angular/router';
import {IOption} from "ng-select";
import {SelectOptionService} from "../shared/elements/select-option.service";
import {DivisionService} from "../division.service";
import {DepartmentService} from "../department.service";
import {PositionService} from "../position.service"
import { StaffService } from 'app/staff.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-staff',
  providers: [DivisionService,DepartmentService,PositionService,StaffService],
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {
  public word;
  public lang:string;
  public first_name:string;
  public last_name:string;
  public employee_code:string;
  public division_id;
  public department_id;
  public position_id;
  public address:string;
  public phone_number:string;
  public email:string;
  public division_data;
  public department_data;
  public position_data;
  public username:string;
  public password:string;
  public position_name:string;
  public add_department_id:number;
  public division_name:string;
  public employee_id:number;
  public check_update:boolean;
  timeout: any;
  simpleOption: Array<IOption> = this.selectOptionService.getCharacters();

  constructor(private router:Router,private route: ActivatedRoute,public selectOptionService: SelectOptionService,private divisionService:DivisionService,private departmentService:DepartmentService,private positionService:PositionService,private staffService:StaffService) { 
    this.show_division();
    this.show_department();
    this.show_position();
  }

  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
    this.route.queryParams.subscribe(res=>{
      this.employee_id = res.id;
      this.set_page();
    });
  }

  set_page(){
    if(this.employee_id != undefined && this.employee_id != null){
      this.check_update = true; 
      this.staffService.show_staff_by_id(this.employee_id).subscribe(res=>{
        this.username = res[0].username;
        this.password = res[0].password;
        this.first_name = res[0].first_name;
        this.last_name = res[0].last_name;
        this.employee_code = res[0].employee_code;
        this.division_id = [res[0].division_id];
        this.department_id = [res[0].department_id];
        this.position_id = [res[0].position_id];
        this.address = res[0].address;
        this.phone_number = res[0].phone_number;
        this.email = res[0].email;
      });
    }else{
      this.check_update = false;
    }
  }//set_page

  update_staff(){
    if(this.check_validate()){
      this.staffService.update_staff(this.employee_id,this.first_name,this.last_name,this.employee_code,this.division_id,this.department_id,this.position_id,this.address,this.phone_number,this.email,this.username,this.password).subscribe(res=>{
        swal({
          title: this.word.succrss[this.lang],
          text: this.word.update_succrss[this.lang],
          type: 'success',
          confirmButtonText: 'OK',
        });
        this.router.navigate(['/basic-data/staff']);
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
  }//update_staff
  
  show_division(){
    this.divisionService.show_division().subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].value = res[i].division_id;
        res[i].label = res[i].division_name;
      }
      this.division_data = res;
    })
  }//show_division

  show_department(){
    this.departmentService.show_department().subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].value = res[i].department_id;
        res[i].label = res[i].department_name;
      }
      this.department_data = res;
    })
  }

  show_position(){
    this.positionService.show_position().subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].value = res[i].position_id;
        res[i].label = res[i].position_name;
      }
      this.position_data = res;
    });
  }//show_position

  set_department_id(event){
    var department_id:number;
    for(var i=0;i<this.division_data.length;i++){
      if(this.division_data[i].division_id == event){
        department_id = +this.division_data[i].department_id;
      }
    }
    this.department_id = [department_id];
  }//show_department_by_id

  check_validate(){
    if(this.first_name == "" || this.first_name == undefined){
      return false;
    }if(this.last_name == ""  || this.last_name == undefined){
      return false;
    }if(this.employee_code == "" || this.employee_code == undefined){
      return false;
    }if(this.division_id == null || this.division_id == undefined){
      return false;
    }if(this.department_id == null || this.department_id == undefined){
      return false;
    }if(this.position_id == null || this.position_id == undefined){
      return false;
    }if(this.username == "" || this.username == undefined){
      return false;
    }if(this.password == "" || this.password == undefined){
      return false;
    }if(this.address == undefined){
      this.address = "";
    }if(this.phone_number == undefined){
      this.phone_number = "";
    }if(this.email == undefined){
      this.email = "";
    }
    
    return true;
  
  }//check_validate

  add_staff(){
    if(this.check_validate()){
      this.staffService.add_staff(this.first_name,this.last_name,this.employee_code,this.division_id,this.department_id,this.position_id,this.address,this.phone_number,this.email,this.username,this.password).subscribe(res=>{
        swal({
          title: this.word.succrss[this.lang],
          text: this.word.add_succrss[this.lang],
          type: 'success',
          confirmButtonText: 'OK',
          allowOutsideClick: true
        });
        this.router.navigateByUrl('/basic-data/staff');
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
    
  }//add_staff

  add_division(event){
    if(this.division_name == "" || this.division_name == undefined || this.add_department_id == null || this.add_department_id == undefined){
      this.closeMyModal(event);
      swal({
        title: this.word.warning[this.lang],
        text: this.word.pleas_enter_data[this.lang],
        type: 'warning',
        confirmButtonText: 'OK',
        allowOutsideClick: true
      });
    }else{
      this.divisionService.add_division(this.division_name,this.add_department_id).subscribe(res=>{
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
    }
  }//add_division

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
    }
  }//add_position

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
    this.add_department_id = null;
    this.position_name = "";
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

}
