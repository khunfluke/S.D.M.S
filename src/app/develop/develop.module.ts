import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DevelopRoutes } from './develop.routing';
import {SharedModule} from '../shared/shared.module';
import { DevelopComponent } from './develop.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DevelopRoutes),
    SharedModule
  ],
  declarations: [DevelopComponent]
})
export class DevelopModule { }

