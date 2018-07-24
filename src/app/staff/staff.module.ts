import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';

import { RouterModule } from '@angular/router';
import { StaffRoutes } from './Staff.routing';
import {SharedModule} from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(StaffRoutes),
    SharedModule
  ],
  declarations: [StaffComponent]
})
export class StaffModule { }
