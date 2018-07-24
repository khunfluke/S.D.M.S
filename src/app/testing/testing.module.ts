import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestingComponent } from './testing.component';
import { RouterModule } from '@angular/router';
import { TestingRoutes } from './testing.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TestingRoutes),
    SharedModule
  ],
  declarations: [TestingComponent]
})
export class TestingModule { }
