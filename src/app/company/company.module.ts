import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';

import { RouterModule } from '@angular/router';
import { CompanyRoutes } from './company.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CompanyRoutes),
    SharedModule
  ],
  declarations: [CompanyComponent]
})
export class CompanyModule { }
