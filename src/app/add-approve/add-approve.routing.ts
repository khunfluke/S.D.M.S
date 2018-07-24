import { Routes } from '@angular/router';
import { AddApproveComponent } from './add-approve.component';

export const AddApproveRoutes: Routes = [{
  path: '',
  component: AddApproveComponent,
  data: {
    breadcrumb: "add approve"
  }
}];