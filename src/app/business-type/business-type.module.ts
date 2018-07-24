import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessTypeComponent } from './business-type.component';
import { RouterModule } from '@angular/router';
import { BusinessTypeRoutes } from './business-type.routing';
import {SharedModule} from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BusinessTypeRoutes),
    SharedModule
  ],
  declarations: [BusinessTypeComponent]
})
export class BusinessTypeModule { }
