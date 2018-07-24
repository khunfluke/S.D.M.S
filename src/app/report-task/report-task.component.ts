import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {DatatableComponent} from "@swimlane/ngx-datatable";
import { Router } from '@angular/router';
import {ReportService} from "../report.service";
import * as moment from 'moment-timezone';
import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-report-task',
  providers: [ReportService],
  templateUrl: './report-task.component.html',
  styleUrls: ['./report-task.component.css']
})
export class ReportTaskComponent implements OnInit {

  public word;
  public lang:string;
  public start_date;
  public end_date;
  public check_show_report = false;
  public task_data;
  set_row = [];
  selected = [];
  timeout: any;
  tempFilter = [];

  @ViewChild(DatatableComponent) table: DatatableComponent

  constructor(private router:Router,private reportService:ReportService,private el:ElementRef) { 
    this.check_show_report = true;
    var date = new Date();
    var year = date.getFullYear();
    this.start_date = year+"-01-01";
    this.end_date = year+"-12-31";
    this.show_task_by_period();
  }

  ngOnInit() {
    this.word = localStorage.getItem('Word');
    this.lang = localStorage.getItem('Lang');
    this.word = JSON.parse(this.word);
  }

  show_task_by_period(){
    this.check_show_report = true;
    var date = new Date();
    var year = date.getFullYear();
    if(this.start_date == ""){
      this.start_date = year+"-01-01";
    }
    if(this.end_date == ""){
      this.end_date = year+"-12-31";
    }
    this.reportService.report_task_by_period(this.start_date,this.end_date).subscribe(res=>{
      for(var i=0;i<res.length;i++){
        res[i].index = i+1;
        res[i].import_date = moment(res[i].import_date).tz('Asia/Bangkok').format('DD-MM-YYYY');
        res[i].deadline = moment(res[i].deadline).tz('Asia/Bangkok').format('DD-MM-YYYY');
      }
      this.task_data = res;
      this.fetch((data) => {
        this.selected = [data[2]];
        this.set_row = data;
        this.tempFilter = [...data];
      });
    })
    
  }//show_employee_performance_report

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
  "}</style><center><h4>"+this.word.report_task[this.lang]+"</h4><br><table>"+
    "<thead>"+
      "<th align='center'>"+this.word.no[this.lang]+"</th>"+
      "<th align='center'>"+this.word.task[this.lang]+"</th>"+
      "<th align='center'>"+this.word.status[this.lang]+"</th>"+
      "<th align='center'>"+this.word.date_of_import_development[this.lang]+"</th>"+
      "<th align='center'>"+this.word.deadline[this.lang]+"</th>"+
      "<th align='center'>"+this.word.responsible_person_project[this.lang]+"</th>"+
      "<th align='center'>"+this.word.company_namecustomer[this.lang]+"</th>"+
    "</thead>";
    for(var i=0;i<this.task_data.length;i++){
      html += "<tr>"+
                "<td align='center'>"+this.task_data[i].index+"</td>"+
                "<td>"+this.task_data[i].program_name+"</td>"+
                "<td>"+this.task_data[i].task_status_name+"</td>"+
                "<td>"+this.task_data[i].import_date+"</td>"+
                "<td>"+this.task_data[i].deadline+"</td>"+
                "<td>"+this.task_data[i].first_name+' '+this.task_data[i].last_name+"</td>"+
                "<td>"+this.task_data[i].company_name+"</td>"+
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
    var data_json_str = JSON.stringify(this.task_data);
    cb(JSON.parse(data_json_str));
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data

    const temp = this.tempFilter.filter(function(d) {
      return (d.program_name.toLowerCase().indexOf(val) !== -1 || !val);
    });

    // update the rows
    this.set_row = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
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
