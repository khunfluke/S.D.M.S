import { Routes } from '@angular/router';
import { AddStaffComponent } from './add-staff.component';

export const AddStaffRoutes: Routes = [{
  path: '',
  component: AddStaffComponent,
  data: {
    breadcrumb: "add Staff"
  }
}];