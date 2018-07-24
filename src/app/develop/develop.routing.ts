import { Routes } from '@angular/router';
import { DevelopComponent } from './develop.component';

export const  DevelopRoutes: Routes = [{
  path: '',
  component:  DevelopComponent,
  data: {
    breadcrumb: "develop"
  }
}];