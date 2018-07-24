import { Routes } from '@angular/router';
import { AddCompanyComponent } from './add-company.component';

export const AddCompanyRoutes: Routes = [{
  path: '',
  component: AddCompanyComponent,
  data: {
    breadcrumb: "add company"
  }
}];