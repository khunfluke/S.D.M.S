import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStaffComponent } from './add-staff.component';
import { RouterModule } from '@angular/router';
import { AddStaffRoutes } from './add-Staff.routing';
import {SharedModule} from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AddStaffRoutes),
    SharedModule
  ],
  declarations: [AddStaffComponent]
})
export class AddStaffModule { }
