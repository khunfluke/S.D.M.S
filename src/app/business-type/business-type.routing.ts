import { Routes } from '@angular/router';
import {  BusinessTypeComponent } from './business-type.component';

export const  BusinessTypeRoutes: Routes = [{
  path: '',
  component:  BusinessTypeComponent,
  data: {
    breadcrumb: "business-type"
  }
}];