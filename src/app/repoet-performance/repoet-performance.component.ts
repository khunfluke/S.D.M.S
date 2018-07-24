import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {DatatableComponent} from "@swimlane/ngx-datatable";
import { Router } from '@angular/router';
import {ReportService} from "../report.service";
import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-repoet-performance',
  providers: [ReportService],
  templateUrl: './repoet-performance.component.html',
  styleUrls: ['./repoet-performance.component.css']
})
export class RepoetPerformanceComponent implements OnInit {

  public word;
  public lang:string;
  public start_date;
  public end_date;
  public check_show_report = false;
  public employee_data;
  public sub_task_data;
  public first_name:string;
  public last_name:string
  set_row = [];
  selected = [];
  timeout: any;
  tempFilter = [];
  set_row2 = [];
  selected2 = [];
  timeout2: any;
  tempFilter2 = [];

  @ViewChild(DatatableComponent) table: DatatableComponent
  @ViewChild(DatatableComponent) table2: DatatableComponent

  constructor(private router:Router,private reportService:ReportService,private el:ElementRef) { 
    this.check_show_report = true;
    var date = new Date();
    var year = date.getFullYear();
    this.start_date = year+"-01-01";
    this.end_date = year+"-12-31";
    this.show_employee_performance_report();
  }

  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
  }

  show_employee_performance_report(){
    this.check_show_report = true;
    var date = new Date();
    var year = date.getFullYear();
    if(this.start_date == ""){
      this.start_date = year+"-01-01";
    }
    if(this.end_date == ""){
      this.end_date = year+"-12-31";
    }
    this.reportService.repoet_performance(this.start_date,this.end_date).subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].index = i+1;
        if(res[i].process_task == null){
          res[i].process_task = 0;
        }
        if(res[i].reject_task == null){
          res[i].reject_task = 0;
        }
        if(res[i].sucess_task == null){
          res[i].sucess_task = 0;
        }
        if(res[i].total_task == null){
          res[i].total_task = 0;
        }
      }
      this.employee_data = res;
      this.fetch((data) => {
        this.selected = [data[2]];
        this.set_row = data;
        this.tempFilter = [...data];
      });
    })
    
  }//show_employee_performance_report

  show_task_by_employee_id(id,fname,lname){
    this.first_name = fname;
    this.last_name = lname;
    this.reportService.show_sub_task_by_employee_id(this.start_date,this.end_date,id).subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].index = i+1;
        if(res[i].test_result == true){
          res[i].test_result = 1;
        }else if(res[i].test_result == false){
          res[i].test_result = -1;
        }else{
          res[i].test_result = 0;
        }
      }
      this.sub_task_data = res;
      this.fetch2((data) => {
        this.selected2 = [data[2]];
        this.set_row2 = data;
        this.tempFilter2 = [...data];
      });
    })
    
  }//show_task_by_employee_id

  print(){
    //let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#export');
    var html = "<style>h4{font-family: 'Angsana New';font-size: 20px;}table, td, th {"+    
      "border: 1px solid #ddd;"+
      "font-size: 16px;"+
      "font-style: normal;"+
      "font-family: 'Angsana New';"+
    "}"+
    "table {"+
      "border-collapse: collapse;"+
      "width: 100%;"+
    "}"+
    "th, td {"+
      "padding: 10px;"+
  "}</style><center><h4>"+this.word.employee_performance_report[this.lang]+"</h4><br><table>"+
    "<thead>"+
      "<th align='center'>"+this.word.no[this.lang]+"</th>"+
      "<th align='center'>"+this.word.employee[this.lang]+"</th>"+
      "<th align='center'>"+this.word.total_task[this.lang]+"</th>"+
      "<th align='center'>"+this.word.process_task[this.lang]+"</th>"+
      "<th align='center'>"+this.word.reject_task[this.lang]+"</th>"+
      "<th align='center'>"+this.word.finished_task[this.lang]+"</th>"+
    "</thead>";
    for(var i=0;i<this.employee_data.length;i++){
      html += "<tr>"+
                "<td align='center'>"+this.employee_data[i].index+"</td>"+
                "<td>"+this.employee_data[i].first_name+' '+this.employee_data[i].last_name+"</td>"+
                "<td align='right' >"+this.employee_data[i].total_task+"</td>"+
                "<td align='right' >"+this.employee_data[i].process_task+"</td>"+
                "<td align='right' >"+this.employee_data[i].reject_task+"</td>"+
                "<td align='right' >"+this.employee_data[i].sucess_task+"</td>"+
              "</tr>";
    }
  html+="</table></center>";
    // var doc = new jsPDF();
    // doc.setFontSize(14);
    // // doc.fromHTML(html,9,9,{
    // // });
    //     // doc.addPage();
    // doc.text(15, 15, 'xxxx');
    // doc.setFont('Angsana New');
    // doc.text(20, 20, 'xxxx');

    //     // Save the PDF
    // doc.save('report_performance.pdf');

    var w = window.open("");
    w.document.write(html);
    w.print();
  }//export_to_pdf

  openMyModal(event) {
    document.querySelector("#"+event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  fetch(cb){
    var data_json_str = JSON.stringify(this.employee_data);
    cb(JSON.parse(data_json_str));
  }

  fetch2(cb){
    var data_json_str = JSON.stringify(this.sub_task_data);
    cb(JSON.parse(data_json_str));
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data

    const temp = this.tempFilter.filter(function(d) {
      return ((d.first_name.toLowerCase().indexOf(val) !== -1 || !val)||(d.last_name.toLowerCase().indexOf(val) !== -1 || !val));
    });

    // update the rows
    this.set_row = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  updateFilter2(event) {
    const val = event.target.value.toLowerCase();
    // filter our data

    const temp = this.tempFilter2.filter(function(d) {
      return ((d.sub_task_name.toLowerCase().indexOf(val) !== -1 || !val));
    });

    // update the rows
    this.set_row2 = temp;
    // Whenever the filter changes, always go back to the first page
    this.table2.offset = 0;
  }

  onSelect({ selected }) {}

  onSelect2({ selected2 }) {}

  onActivate(event) {}

  onActivate2(event) {}

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  onPage2(event) {
    clearTimeout(this.timeout);
    this.timeout2 = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

}
