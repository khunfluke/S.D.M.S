import { Routes } from '@angular/router';
import { ApproveInformationComponent } from './approve-information.component';

export const ApproveInformationRoutes: Routes = [{
  path: '',
  component: ApproveInformationComponent,
  data: {
    breadcrumb: "add requirement"
  }
}];