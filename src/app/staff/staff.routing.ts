import { Routes } from '@angular/router';
import { StaffComponent } from './staff.component';

export const StaffRoutes: Routes = [{
  path: '',
  component: StaffComponent,
  data: {
    breadcrumb: "Staff"
  }
}];