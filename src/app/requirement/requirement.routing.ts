import { Routes } from '@angular/router';

import { RequirementComponent } from './requirement.component';

export const RequirementRoutes: Routes = [{
  path: '',
  component: RequirementComponent,
  data: {
    breadcrumb: "requirement"
  }
}];