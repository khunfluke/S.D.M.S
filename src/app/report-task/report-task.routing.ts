import { Routes } from '@angular/router';

import { ReportTaskComponent } from './report-task.component';

export const RepoetTaskRoutes: Routes = [{
  path: '',
  component: ReportTaskComponent,
  data: {
    breadcrumb: "ReportTask"
  }
}];