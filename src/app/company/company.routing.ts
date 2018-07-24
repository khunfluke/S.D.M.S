import { Routes } from '@angular/router';
import {  CompanyComponent } from './company.component';

export const  CompanyRoutes: Routes = [{
  path: '',
  component:  CompanyComponent,
  data: {
    breadcrumb: "company"
  }
}];