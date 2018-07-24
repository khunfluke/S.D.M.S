import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReportRequirementComponent } from './report-requirement.component';
import { ReportRequirementRoutes } from './report-requirement.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ReportRequirementRoutes),
    SharedModule
  ],
  declarations: [ReportRequirementComponent]
})
export class ReportRequirementModule { }
