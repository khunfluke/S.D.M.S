import { Routes } from '@angular/router';

import { RepoetPerformanceComponent } from './repoet-performance.component';

export const RepoetPerformanceRoutes: Routes = [{
  path: '',
  component: RepoetPerformanceComponent,
  data: {
    breadcrumb: "RepoetPerformance"
  }
}];