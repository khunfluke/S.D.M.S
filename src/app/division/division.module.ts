import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DivisionComponent } from './division.component';

import { RouterModule } from '@angular/router';
import { DivisionRoutes } from './division.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DivisionRoutes),
    SharedModule
  ],
  declarations: [DivisionComponent]
})
export class DivisionModule { }
