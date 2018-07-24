import { Routes } from '@angular/router';
import { AddTestingComponent } from './add-testing.component';

export const AddTestingRoutes: Routes = [{
  path: '',
  component: AddTestingComponent,
  data: {
    breadcrumb: "add testing"
  }
}];