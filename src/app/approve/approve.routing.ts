import { Routes } from '@angular/router';
import { ApproveComponent } from './approve.component';

export const ApproveRoutes: Routes = [{
  path: '',
  component: ApproveComponent,
  data: {
    breadcrumb: "add requirement"
  }
}];