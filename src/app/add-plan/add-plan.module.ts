import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AddPlanComponent } from './add-plan.component';
import { AddPlanRoutes } from './add-plan.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AddPlanRoutes),
    SharedModule
  ],
  declarations: [AddPlanComponent]
})
export class AddPlanModule { }
