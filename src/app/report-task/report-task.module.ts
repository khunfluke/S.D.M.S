import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReportTaskComponent } from './report-task.component';
import { RepoetTaskRoutes } from './report-task.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RepoetTaskRoutes),
    SharedModule
  ],
  declarations: [ReportTaskComponent]
})
export class ReportTaskModule { }
