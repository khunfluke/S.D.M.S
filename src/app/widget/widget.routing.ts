import { Routes } from '@angular/router';
import { WidgetComponent } from "./widget.component";

export const WidgetRoutes: Routes = [{
    path: '',
    component: WidgetComponent,
    data: {
        breadcrumb: "Widget"
    }
}];
