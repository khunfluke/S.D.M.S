import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReportFollowPlanComponent } from './report-follow-plan.component';
import { ReportFollowPlanRoutes } from './report-follow-plan.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ReportFollowPlanRoutes),
    SharedModule
  ],
  declarations: [ReportFollowPlanComponent]
})
export class ReportFollowPlanModule { }
