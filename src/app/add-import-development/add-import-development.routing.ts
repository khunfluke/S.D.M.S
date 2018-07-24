import { Routes } from '@angular/router';
import { AddImportDevelopmentComponent } from './add-import-development.component';

export const AddImportDevelopmentRoutes: Routes = [{
  path: '',
  component: AddImportDevelopmentComponent,
  data: {
    breadcrumb: "Add import development"
  }
}];