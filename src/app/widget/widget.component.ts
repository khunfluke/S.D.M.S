import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
declare var $: any;
declare var Morris: any;
import 'd3';
import * as c3 from 'c3';
import '../../../node_modules/peity/jquery.peity.min.js';
import {Todo} from '../shared/todo/index';
import {TodoService} from '../shared/todo/todo.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: [
      '../../../node_modules/c3/c3.min.css',
      '../../assets/icon/SVG-animated/svg-weather.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class WidgetComponent implements OnInit {
  public isChecked = false;
  public items: Todo[] = [];
  public newTodoText = '';

  constructor(private todoService: TodoService) {}

    ngOnInit() {
      /* last to-do list */
      this.items = this.todoService.getTodoList();
      setTimeout( () => {
          /* visitors pie chart*/
          $('.visitor-chart').sparkline([1, 2], {
              type: 'pie',
              width: '100px',
              height: '65px',
              sliceColors: ['#ccc', '#0073aa'],
              tooltipClassname: 'chart-sparkline'
          });
          /* visitor total sale line chart */
          $('.sale-chart').sparkline([0, 6, 3, 10, 8, 3, 6, 15, 3, 14, 2, 9, 12, 0], {
              type: 'line',
              width: '100%',
              height: '65px',
              tooltipClassname: 'chart-sparkline',
              chartRangeMax: '50',
              lineColor: '#ccc',
              fillColor: '#ccc'
          });
          /* visitor total revenue chart */
          $('.resource-barchart').sparkline([5, 6, 2, 4, 9, 8, 3, 6, 4,], {
              type: 'bar',
              barWidth: '8px',
              height: '50px',
              barColor: '#239a55',
              tooltipClassname: 'abc'
          });

          const totalErrorChart = $('.total-error-chart').peity('line', {
              fill: 'rgba(95, 190, 170, 0)',
              stroke: 'rgb(247, 224, 127)',
              strokeWidth: 2
          });

          const serviceStatusChart = $('.service-status-chart').peity('line', {
              fill: 'rgba(95, 190, 170, 0)',
              stroke: 'rgb(113, 213, 194)',
              strokeWidth: 2
          });

          /* turnover area chart */
          Morris.Area({
              element: 'turnoverareachart',
              data: [{
                  y: '2006',
                  a: 10
              },
                  {
                      y: '2007',
                      a: 15
                  },
                  {
                      y: '2008',
                      a: 10
                  },
                  {
                      y: '2009',
                      a: 35
                  },
                  {
                      y: '2010',
                      a: 20
                  },
                  {
                      y: '2011',
                      a: 32
                  },
              ],
              xkey: 'y',
              resize: true,
              axes: false,
              padding: 0,
              hideHover: true,
              grid: false,
              smooth: false,
              redraw: true,
              ykeys: ['a'],
              labels: ['Series A'],
              lineColors: ['#0073aa ']
          });

          const chart = c3.generate({
              bindto: '#chart',
              color: {
                  pattern: ['#239a55', '#0073aa', '#f1c40f']
              },
              data: {
                  columns: [
                      ['setosa', 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
                      ['versicolor', 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
                      ['virginica', 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
                  ],
                  type : 'donut',
                  onclick: function (d, i) { console.log('onclick', d, i); },
                  onmouseover: function (d, i) { console.log('onmouseover', d, i); },
                  onmouseout: function (d, i) { console.log('onmouseout', d, i); }
              },
              donut: {
                  title: 'Minute Spent'
              }
          });

          //  Resource bar
          $('.resource-barchart1').sparkline([5, 6, 3, 4, 7, 4, 8, 3, 6], {
              type: 'bar',
              barWidth: '12px',
              height: '68px',
              barColor: '#04e0b4',
              tooltipClassname: 'abc'
          });
          $('.resource-barchart2').sparkline([5, 6, 3, 4, 7, 4, 8, 3, 6], {
              type: 'bar',
              barWidth: '12px',
              height: '68px',
              barColor: '#fcd43d',
              tooltipClassname: 'abc'
          });
          $('.resource-barchart3').sparkline([5, 6, 3, 4, 7, 4, 8, 3, 6], {
              type: 'bar',
              barWidth: '12px',
              height: '68px',
              barColor: '#0393d8',
              tooltipClassname: 'abc'
          });

          /* last activity area chart*/
          Morris.Area({
              element: 'last-activity',
              data: [{
                  y: '2006',
                  a: 10
              },
                  {
                      y: '2007',
                      a: 65
                  },
                  {
                      y: '2008',
                      a: 25
                  },
                  {
                      y: '2009',
                      a: 25
                  },
                  {
                      y: '2010',
                      a: 60
                  },
                  {
                      y: '2011',
                      a: 20
                  },
              ],
              xkey: 'y',
              resize: true,
              hideHover: true,
              redraw: true,
              ykeys: ['a'],
              labels: ['Series A'],
              lineColors: ['#0073aa ']
          });
          /* analytics chart */
          Morris.Bar({
              element: 'analythics-graph',
              barSizeRatio: 0.25,
              data: [{
                  y: '2006',
                  a: 30
              }, {
                  y: '2007',
                  a: 40
              }, {
                  y: '2008',
                  a: 55
              }, {
                  y: '2009',
                  a: 75
              }, {
                  y: '2010',
                  a: 50
              }, {
                  y: '2011',
                  a: 42
              }, {
                  y: '2012',
                  a: 32
              }],
              xkey: 'y',
              lineWidth: '10px',
              ykeys: ['a'],
              labels: ['A'],
              barColors: ['#5D9CEC'],
              hideHover: 'auto',
              gridLineColor: '#ddd',
              resize: true
          });
          /* project overview chart*/
          const proj = c3.generate({
              bindto: '#proj',
              color: {
                  pattern: ['#239a55', '#0073aa', '#f1c40f']
              },
              data: {
                  columns: [
                      ['Project Progress', 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
                      ['Project Returned', 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
                      ['Project Sold', 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
                  ],
                  type : 'donut',
                  onclick: function (d, i) { console.log('onclick', d, i); },
                  onmouseover: function (d, i) { console.log('onmouseover', d, i); },
                  onmouseout: function (d, i) { console.log('onmouseout', d, i); }
              },
              donut: {
                  title: 'Project Overview'
              }
          });
          /* task status chart*/
          Morris.Line({
              element: 'task-status',
              data: [
                  { y: '2006', a: 30, b: 10 },
                  { y: '2007', a: 28, b: 60 },
                  { y: '2008', a: 25, b: 20 },
                  { y: '2009', a: 29, b: 50 },
                  { y: '2010', a: 35, b: 22 },
                  { y: '2011', a: 45, b: 70 },
                  { y: '2012', a: 32, b: 26 },
                  { y: '2013', a: 19, b: 75 },
                  { y: '2014', a: 22, b: 35 },
                  { y: '2015', a: 40, b: 65 },
                  { y: '2016', a: 25, b: 10 }
              ],
              xkey: 'y',
              redraw: true,
              ykeys: ['a', 'b'],
              hideHover: 'auto',
              labels: ['Series A', 'Series B'],
              lineColors: ['#f1c40f', '#239a55']
          });

          /*custom line chart*/
          $('.customchart').sparkline([15, 30, 27, 35, 50, 71, 60], {
              type: 'line',
              width: 200,
              height: 300,
              tooltipClassname: 'chart-sparkline',
              chartRangeMax: '50',
              lineColor: '#0073aa',
              fillColor: 'rgba(0, 115, 170, 0.5)'
          });

          $('.customchart').sparkline([0, 25, 10, 7, 25, 35, 30], {
              type: 'line',
              width: 200,
              height: 300,
              composite: '!0',
              tooltipClassname: 'chart-sparkline',
              chartRangeMax: '40',
              lineColor: '#239a55',
              fillColor: 'rgba(35, 154, 85, .5)'
          });
          const transection = c3.generate({
              bindto: '#transection',
              data: {
                  // iris data from R
                  columns: [
                      ['Done', 150],
                      ['Due', 180],
                      ['Hold', 60]
                  ],
                  type: 'pie',
                  onclick: function(d, i) { console.log('onclick', d, i); },
                  onmouseover: function(d, i) { console.log('onmouseover', d, i); },
                  onmouseout: function(d, i) { console.log('onmouseout', d, i); }
              },
              color: {
                  pattern: ['#239a55', '#0073aa', '#f1c40f']
              },
          });
      }, 1);
  }

    addToDoItem($event) {
        if (($event.which === 1 || $event.which === 13) && this.newTodoText.trim() !== '') {

            this.items.unshift({
                text: this.newTodoText,
                type: 'C+',
                isChecked: false
            });
            this.newTodoText = '';
        }
    }

    getNotDeleted() {
        return this.items.filter((item: any) => {
            return !item.deleted
        })
    }
}
