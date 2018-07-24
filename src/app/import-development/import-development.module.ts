import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ImportDevelopmentComponent } from './import-development.component';
import { ImportDevelopmentRoutes } from './import-development.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ImportDevelopmentRoutes),
    SharedModule
  ],
  declarations: [ImportDevelopmentComponent]
})
export class ImportDevelopmentModule { }

