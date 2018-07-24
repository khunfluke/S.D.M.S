import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMeetingComponent } from './add-meeting.component';
import { RouterModule } from '@angular/router';
import { AddMeetingRoutes } from './add-meeting.routing';
import {SharedModule} from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AddMeetingRoutes),
    SharedModule
  ],
  declarations: [AddMeetingComponent]
})
export class AddMeetingModule { }
