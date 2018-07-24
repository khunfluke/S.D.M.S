import { Routes } from '@angular/router';
import { AddDevelopComponent } from './add-develop.component';

export const AddDevelopRoutes: Routes = [{
  path: '',
  component: AddDevelopComponent,
  data: {
    breadcrumb: "add develop"
  }
}];