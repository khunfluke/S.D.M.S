import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyService {

  private actionUrl: string;
  private serverUrl: string;

  constructor(private http:Http) { 
    var full_url = (window.location.href).toString();
    var port_cut = full_url.search(':4200');
    var url = full_url.substr(0,port_cut);
    this.serverUrl = url+":3500";
  }

  show_company(){
    var data = {};
    var result = this.http.post(this.serverUrl+'/company/show_company',data).map(res=>res.json());
    return result;
  }// show_company

  show_company_by_id(id){
    var data = {
      customer_id : id
    }
    var result = this.http.post(this.serverUrl+'/company/show_company_by_id',data).map(res=>res.json());
    return result;
  }//show_company_by_id

  add_company(company_name, address, email, phone_number, customer_name, business_type_id  ){
    var data = {
      company_name : company_name,
      address : address,
      email : email,
      phone_number : phone_number,
      customer_name : customer_name,
      business_type_id : business_type_id
    }
    var result = this.http.post(this.serverUrl+'/company/add_company',data).map(res=>res);
    return result;
  }//add_company

  delete_company(customer_id){
    var data = {
      customer_id : customer_id
    }
    var result = this.http.post(this.serverUrl+'/company/delete_company',data).map(res=>res);
    return result;
  }//delete_company

  update_company(customer_id,company_name,phone_number,customer_name,business_type_id,address,email){
    var data = {
      customer_id : customer_id,
      company_name : company_name,
      address : address,
      email : email,
      phone_number : phone_number,
      customer_name : customer_name,
      business_type_id : business_type_id
    }
    var result = this.http.post(this.serverUrl+'/company/update_company',data).map(res=>res.json());
    return result;
  }//update_company


}
