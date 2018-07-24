import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTestingComponent } from './add-testing.component';
import { RouterModule } from '@angular/router';
import { AddTestingRoutes } from './add-testing.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AddTestingRoutes),
    SharedModule
  ],
  declarations: [AddTestingComponent]
})
export class AddTestingModule { }
