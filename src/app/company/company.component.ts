import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {CompanyService} from "../company.service";
import {SelectOptionService} from "../shared/elements/select-option.service";
import {BusunessTypeService} from "../busuness-type.service";
import { color } from 'd3';
import swal from 'sweetalert2';

@Component({
  selector: 'app-company',
  providers : [CompanyService,BusunessTypeService],
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  public word;
  public lang:string;
  public company_data;
  public customer_id:number;
  public business_type_data;
  public check_update = false;
  set_row = [];
  selected = [];
  tempFilter = [];
  timeout: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private router:Router,public selectOptionService: SelectOptionService,private companyService:CompanyService, private busunessTypeService:BusunessTypeService ) { 
   
    this.show_company();
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

  show_company(){
    this.companyService.show_company().subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].index = i+1;
      }
      this.company_data = res;
      this.fetch((data) => {
        this.selected = [data[2]];
        this.set_row = data;
        this.tempFilter = [...data];
      });
    })
  }//show_company

  check_delete_company(event,id){
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
      thisx.delete_company(event,id);
    })
    .catch(swal.noop);
  }//check_delete_company

  delete_company(event,id){
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
      thisx.companyService.delete_company(id).subscribe(res=>{
        swal({
          title: thisx.word.succrss[thisx.lang],
          text: thisx.word.delete_succrss[thisx.lang],
          type: 'success',
          confirmButtonText: 'OK',
        });
        thisx.show_company();
      });
    })
    .catch(swal.noop);
  }//delete_company

 check_add_company(event){
   this.check_update = false;
   this.openMyModal(event);
 }

 update_company(id){
  this.router.navigate(['/basic-data/add-company'], { queryParams: { id: id } });
}//update_company

  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
  }
  fetch(cb){
       var data_json_str = JSON.stringify(this.company_data);
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
      return d.company_name.toLowerCase().indexOf(val) !== -1 || !val;
    });
  // update the rows
  this.set_row = temp;
  // Whenever the filter changes, always go back to the first page
  this.table.offset = 0;
}

}
