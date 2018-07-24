import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AddDevelopComponent } from './add-develop.component';
import { AddDevelopRoutes } from './add-develop.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AddDevelopRoutes),
    SharedModule
  ],
  declarations: [AddDevelopComponent]
})
export class AddDevelopModule { }
