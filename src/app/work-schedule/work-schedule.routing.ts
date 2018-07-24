import { Routes } from '@angular/router';
import { WorkScheduleComponent } from './work-schedule.component';

export const WorkScheduleRoutes: Routes = [{
  path: '',
  component: WorkScheduleComponent,
  data: {
    breadcrumb: "Work schedule"
  }
}];