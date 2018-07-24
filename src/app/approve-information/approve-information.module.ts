import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ApproveInformationComponent } from './approve-information.component';
import { ApproveInformationRoutes } from './approve-information.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ApproveInformationRoutes),
    SharedModule
  ],
  declarations: [ApproveInformationComponent]
})
export class ApproveInformationModule { }
