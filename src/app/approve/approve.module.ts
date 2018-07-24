import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ApproveComponent } from './approve.component';
import { ApproveRoutes } from './approve.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ApproveRoutes),
    SharedModule
  ],
  declarations: [ApproveComponent]
})
export class ApproveModule { }
