import { Routes } from '@angular/router';
import { OpenTaskComponent } from './open-task.component';

export const OpenTaskRoutes: Routes = [{
  path: '',
  component: OpenTaskComponent,
  data: {
    breadcrumb: "Open task"
  }
}];