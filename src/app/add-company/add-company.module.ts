import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCompanyComponent } from './add-company.component';
import { RouterModule } from '@angular/router';
import { AddCompanyRoutes } from './add-company.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AddCompanyRoutes),
    SharedModule
  ],
  declarations: [AddCompanyComponent]
})
export class AddCompanyModule { }
