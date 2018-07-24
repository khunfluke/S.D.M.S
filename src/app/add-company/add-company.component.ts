import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router } from '@angular/router';
import {IOption} from "ng-select";
import {SelectOptionService} from "../shared/elements/select-option.service";
import {CompanyService} from "../company.service";
import swal from 'sweetalert2';
import {BusunessTypeService} from "../busuness-type.service";

@Component({
  selector: 'app-add-company',
  providers : [CompanyService,BusunessTypeService],
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  public word;
  public lang:string;
  public business_type;
  public company_name:string;
  public address:string;
  public email:string;
  public phone_number:string;
  public customer_name:string;
  public business_type_id;
  public business_type_data;
  public business_type_name;
  public customer_id;
  public check_update = false;
  simpleOption: Array<IOption> = this.selectOptionService.getCharacters();
  set_row = [];
  selected = [];
  tempFilter = [];
  timeout: any;

  constructor(private router:Router,private route: ActivatedRoute,public selectOptionService: SelectOptionService,private companyService:CompanyService, private busunessTypeService:BusunessTypeService) {
    this.show_business_type();
   }

  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
    this.route.queryParams.subscribe(res=>{
      this.customer_id = res.id;
      this.set_page();
    });
  }

  show_business_type(){
    this.busunessTypeService.show_business_type().subscribe(res=>{
      for(var i= 0;i<res.length;i++){
        res[i].value = res[i].business_type_id;
        res[i].label = res[i].business_type_name;
      }
      this.business_type_data = res;
    })
  }

  add_company(event){
     if((this.company_name == ""||this.company_name == undefined) || (this.address == null || this.address == undefined) || (this.email == null || this.email == undefined) || (this.phone_number == null || this.phone_number == undefined) || (this.customer_name == null || this.customer_name == undefined) || (this.business_type_id == null || this.business_type_id == undefined)){
      this.closeMyModal(event);
      swal({
        title: this.word.warning[this.lang],
        text: this.word.pleas_enter_data[this.lang],
        type: 'warning',
        confirmButtonText: 'OK',
        allowOutsideClick: true
      });
    }else{
      this.companyService.add_company(this.company_name,this.address,this.email,this.phone_number,this.customer_name,this.business_type_id).subscribe(res=>{
        swal({
          title: this.word.succrss[this.lang],
          text: this.word.add_succrss[this.lang],
          type: 'success',
          confirmButtonText: 'OK',
          allowOutsideClick: true
        });
        this.router.navigateByUrl('/basic-data/company');
      })
    }

  }//add_company

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
   }
  }

  set_page(){
    if(this.customer_id != undefined && this.customer_id != null){
      this.check_update = true; 
      this.companyService.show_company_by_id(this.customer_id).subscribe(res=>{
        this.company_name = res[0].company_name;
        this.address = res[0].address;
        this.customer_name = res[0].customer_name;
        this.business_type_id = [res[0].business_type_id];
        this.phone_number = res[0].phone_number;
        this.email = res[0].email;
      });
    }else{
      this.check_update = false;
    }
  }//set_page

  update_company(){
    if((this.company_name == "" ||this.company_name == undefined) || (this.address == ""  || this.address == undefined) || (this.email == "" || this.email == undefined) || (this.phone_number == "" || this.phone_number == undefined) || (this.customer_name == "" || this.customer_name == undefined) || (this.business_type_id == null || this.business_type_id == undefined)) {
      swal({
        title: this.word.warning[this.lang],
        text: this.word.pleas_enter_data[this.lang],
        type: 'warning',
        confirmButtonText: 'OK',
        allowOutsideClick: true
      });
    }else{
      this.companyService.update_company(this.customer_id,this.company_name,this.phone_number,this.customer_name,this.business_type_id,this.address,this.email).subscribe(res=>{
        swal({
          title: this.word.succrss[this.lang],
          text: this.word.update_succrss[this.lang],
          type: 'success',
          confirmButtonText: 'OK',
        });
        this.router.navigate(['/basic-data/company']);
      });
    }
  }//update_staff
  
  check_validate(){
    if(this.company_name == "" || this.company_name == undefined){
      return false;
    }if(this.address == ""  || this.address == undefined){
      return false;
    }if(this.email == "" || this.email == undefined){
      return false;
    }if(this.phone_number == "" || this.phone_number == undefined){
      return false;
    }if(this.customer_name == "" || this.customer_name == undefined){
      return false;
    }if(this.business_type_id == null || this.business_type_id == undefined){
      return false;
     }
   }//check_validate

 

  openMyModal(event) {
    document.querySelector("#"+event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
    
  }

}
