import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AddRequirementComponent } from './add-requirement.component';
import { AddRequirementRoutes } from './add-requirement.routing';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AddRequirementRoutes),
    SharedModule
  ],
  declarations: [AddRequirementComponent]
})
export class AddRequirementModule { }

