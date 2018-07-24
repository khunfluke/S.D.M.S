import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { OpenTaskComponent } from './open-task.component';
import { OpenTaskRoutes } from './open-task.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(OpenTaskRoutes),
    SharedModule
  ],
  declarations: [OpenTaskComponent]
})
export class OpenTaskModule { }
