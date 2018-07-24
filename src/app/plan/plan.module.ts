import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PlanComponent } from './plan.component';
import { PlanRoutes } from './plan.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PlanRoutes),
    SharedModule
  ],
  declarations: [PlanComponent]
})
export class PlanModule { }