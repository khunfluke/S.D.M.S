import { Routes } from '@angular/router';

import { ReportFollowPlanComponent } from './report-follow-plan.component';

export const ReportFollowPlanRoutes: Routes = [{
  path: '',
  component: ReportFollowPlanComponent,
  data: {
    breadcrumb: "ReportFollowPlan"
  }
}];