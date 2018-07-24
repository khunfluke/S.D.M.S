import { Routes } from '@angular/router';
import { ImportDevelopmentComponent } from './import-development.component';

export const ImportDevelopmentRoutes: Routes = [{
  path: '',
  component: ImportDevelopmentComponent,
  data: {
    breadcrumb: "Import development"
  }
}];