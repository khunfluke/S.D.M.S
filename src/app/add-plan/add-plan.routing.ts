import { Routes } from '@angular/router';
import { AddPlanComponent } from './add-plan.component';

export const  AddPlanRoutes: Routes = [{
  path: '',
  component:  AddPlanComponent,
  data: {
    breadcrumb: "Add plan"
  }
}];