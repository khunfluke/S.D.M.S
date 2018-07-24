import { Routes } from '@angular/router';

import { PositionComponent } from './position.component';

export const PositionRoutes: Routes = [{
  path: '',
  component: PositionComponent,
  data: {
    breadcrumb: "position"
  }
}];