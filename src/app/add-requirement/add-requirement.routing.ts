import { Routes } from '@angular/router';
import { AddRequirementComponent } from './add-requirement.component';

export const AddRequirementRoutes: Routes = [{
  path: '',
  component: AddRequirementComponent,
  data: {
    breadcrumb: "add requirement"
  }
}];