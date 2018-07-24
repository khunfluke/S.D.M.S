import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RepoetPerformanceComponent } from './repoet-performance.component';
import { RepoetPerformanceRoutes } from './repoet-performance.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RepoetPerformanceRoutes),
    SharedModule
  ],
  declarations: [RepoetPerformanceComponent]
})
export class RepoetPerformanceModule { }

