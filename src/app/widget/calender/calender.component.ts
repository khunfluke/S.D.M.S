import {Component, OnInit, ViewEncapsulation} from '@angular/core';
declare var $: any;
import '../../../../node_modules/semantic-ui/dist/semantic.min.js';
import '../../../../node_modules/semantic-ui-calendar/dist/calendar.min.js';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: [
    './calender.component.css',
    '../../../../node_modules/semantic-ui/dist/semantic.min.css',
    '../../../../node_modules/semantic-ui-calendar/dist/calendar.min.css'
  ]
})
export class CalenderComponent implements OnInit {
  public calendar_day = getDayText(new Date().getDay());
  public calender_date = new Date().getDate();
  public current_date = new Date();
  constructor() {}

  ngOnInit() {
      /* calendar */
      $('#example14').calendar({
          type: 'date',
          firstDayOfWeek: 0,
          initialDate: new Date(),
          inline: true,
          text: {
              days: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
          },
          today: true,
          onChange: function (date, text, mode) {
              if (date) {
                  const day = date.getDay();
                  $('.calender_day').text(getDayText(day));
                  $('.calender_date').text(date.getDate());
              }
          }
      });
  }
}

function getDayText(day) {
  const dateArray = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
  };
  return dateArray[day];
}
