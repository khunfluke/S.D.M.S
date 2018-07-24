import { Routes } from '@angular/router';
import { TableWorkScheduleComponent } from './table-work-schedule.component';

export const TableWorkScheduleRoutes: Routes = [{
  path: '',
  component: TableWorkScheduleComponent,
  data: {
    breadcrumb: "Table work schedule"
  }
}];