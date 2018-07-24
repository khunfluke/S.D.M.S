import { Routes } from '@angular/router';
import { MeetingComponent } from './meeting.component';

export const MeetingRoutes: Routes = [{
  path: '',
  component: MeetingComponent,
  data: {
    breadcrumb: "meeting"
  }
}];