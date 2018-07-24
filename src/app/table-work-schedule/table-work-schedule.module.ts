import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from 'ng-fullcalendar';

import { TableWorkScheduleComponent } from './table-work-schedule.component';
import { TableWorkScheduleRoutes } from './table-work-schedule.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FullCalendarModule,
    RouterModule.forChild(TableWorkScheduleRoutes),
    SharedModule
  ],
  declarations: [TableWorkScheduleComponent]
})
export class TableWorkScheduleModule { }
