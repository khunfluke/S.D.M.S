import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DepartmentComponent } from './department.component';
import { DepartmentRoutes } from './department.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DepartmentRoutes),
    SharedModule
  ],
  declarations: [DepartmentComponent]
})
export class DepartmentModule { }