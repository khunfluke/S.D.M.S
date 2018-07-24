import { Routes } from '@angular/router';
import {  DivisionComponent } from './division.component';

export const  DivisionRoutes: Routes = [{
  path: '',
  component:  DivisionComponent,
  data: {
    breadcrumb: "division"
  }
}];