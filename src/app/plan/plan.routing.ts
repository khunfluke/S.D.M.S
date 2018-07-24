import { Routes } from '@angular/router';
import {  PlanComponent } from './plan.component';

export const  PlanRoutes: Routes = [{
  path: '',
  component:  PlanComponent,
  data: {
    breadcrumb: "Plan"
  }
}];