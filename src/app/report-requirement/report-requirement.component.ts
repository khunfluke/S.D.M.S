import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {DatatableComponent} from "@swimlane/ngx-datatable";
import { Router } from '@angular/router';
import {ReportService} from "../report.service";
import * as moment from 'moment-timezone';
import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-report-requirement',
  providers: [ReportService],
  templateUrl: './report-requirement.component.html',
  styleUrls: ['./report-requirement.component.css']
})
export class ReportRequirementComponent implements OnInit {

  public word;
  public lang:string;
  public start_date;
  public end_date;
  public check_show_report = false;
  public requirement_data;
  public requirement_data2;
  public custormer_name:string
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
    this.show_report_requirement();
  }

  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
  }

  show_report_requirement(){
    this.check_show_report = true;
    var date = new Date();
    var year = date.getFullYear();
    if(this.start_date == ""){
      this.start_date = year+"-01-01";
    }
    if(this.end_date == ""){
      this.end_date = year+"-12-31";
    }
    this.reportService.report_requirement(this.start_date,this.end_date).subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].index = i+1;
      }
      
      this.requirement_data = res;
      this.fetch((data) => {
        this.selected = [data[2]];
        this.set_row = data;
        this.tempFilter = [...data];
      });
    })
    
  }//show_employee_performance_report

  show_task_by_custormer_id(id,name){
    this.custormer_name = name;
    this.reportService.show_requirement_by_customer_id(id,this.start_date,this.end_date).subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].index = i+1;
      }
      this.requirement_data2 = res;
      this.fetch2((data) => {
        this.selected2 = [data[2]];
        this.set_row2 = data;
        this.tempFilter2 = [...data];
      });
    })
  }//show_task_by_custormer_id

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
  "}</style><center><h4>"+this.word.report_requirement[this.lang]+"</h4><br><table>"+
    "<thead>"+
      "<th align='center'>"+this.word.no[this.lang]+"</th>"+
      "<th align='center'>"+this.word.company[this.lang]+"</th>"+
      "<th align='center'>"+this.word.all_requirement[this.lang]+"</th>"+
      "<th align='center'>"+this.word.proceed[this.lang]+"</th>"+
      "<th align='center'>"+this.word.finish[this.lang]+"</th>"+
    "</thead>";
    for(var i=0;i<this.requirement_data.length;i++){
      html += "<tr>"+
                "<td align='center'>"+this.requirement_data[i].index+"</td>"+
                "<td>"+this.requirement_data[i].company_name+"</td>"+
                "<td align='right'>"+this.requirement_data[i].all_re+"</td>"+
                "<td align='right'>"+this.requirement_data[i].process+"</td>"+
                "<td align='right'>"+this.requirement_data[i].finish+"</td>"+
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

  fetch(cb){
    var data_json_str = JSON.stringify(this.requirement_data);
    cb(JSON.parse(data_json_str));
  }

  fetch2(cb){
    var data_json_str = JSON.stringify(this.requirement_data2);
    cb(JSON.parse(data_json_str));
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data

    const temp = this.tempFilter.filter(function(d) {
      return (d.company_name.toLowerCase().indexOf(val) !== -1 || !val);
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
      return (d.program_name.toLowerCase().indexOf(val) !== -1 || !val);
    });

    // update the rows
    this.set_row2 = temp;
    // Whenever the filter changes, always go back to the first page
    this.table2.offset = 0;
  }

  onSelect({ selected }) {}

  onActivate(event) {}

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  onSelect2({ selected }) {}

  onActivate2(event) {}

  onPage2(event) {
    clearTimeout(this.timeout2);
    this.timeout2 = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }


}
