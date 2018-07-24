import { Routes } from '@angular/router';
import { TestingComponent } from './testing.component';

export const TestingRoutes: Routes = [{
  path: '',
  component: TestingComponent,
  data: {
    breadcrumb: "testing"
  }
}];