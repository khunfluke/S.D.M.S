import { Routes } from '@angular/router';

import { ReportRequirementComponent } from './report-requirement.component';

export const ReportRequirementRoutes: Routes = [{
  path: '',
  component: ReportRequirementComponent,
  data: {
    breadcrumb: "Report Requirement"
  }
}];