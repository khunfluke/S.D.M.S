import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionComponent } from './position.component';
import { RouterModule } from '@angular/router';
import { PositionRoutes } from './position.routing';
import {SharedModule} from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PositionRoutes),
    SharedModule
  ],
  declarations: [PositionComponent]
})
export class PositionModule { }
