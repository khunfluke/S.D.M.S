import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AddImportDevelopmentComponent } from './add-import-development.component';
import { AddImportDevelopmentRoutes } from './add-import-development.routing';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AddImportDevelopmentRoutes),
    SharedModule
  ],
  declarations: [AddImportDevelopmentComponent]
})
export class AddImportDevelopmentModule { }
