import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WorkScheduleComponent } from './work-schedule.component';
import { WorkScheduleRoutes } from './work-schedule.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(WorkScheduleRoutes),
    SharedModule
  ],
  declarations: [WorkScheduleComponent]
})
export class WorkScheduleModule { }
