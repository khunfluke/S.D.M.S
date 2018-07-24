import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { RequirementComponent } from './requirement.component';
import { RequirementRoutes } from './requirement.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RequirementRoutes),
    SharedModule
  ],
  declarations: [RequirementComponent]
})
export class RequirementModule { }
