import { Routes } from '@angular/router';
import { AddMeetingComponent } from './add-meeting.component';

export const AddMeetingRoutes: Routes = [{
  path: '',
  component: AddMeetingComponent,
  data: {
    breadcrumb: "add meeting"
  }
}];