import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AddApproveComponent } from './add-approve.component';
import { AddApproveRoutes } from './add-approve.routing';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AddApproveRoutes),
    SharedModule
  ],
  declarations: [AddApproveComponent]
})
export class AddApproveModule { }