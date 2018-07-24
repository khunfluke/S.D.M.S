import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingComponent } from './meeting.component';
import { RouterModule } from '@angular/router';
import { MeetingRoutes } from './meeting.routing';
import {SharedModule} from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MeetingRoutes),
    SharedModule
  ],
  declarations: [MeetingComponent]
})
export class MeetingModule { }
