import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {WidgetComponent} from './widget.component';
import {WidgetRoutes} from './widget.routing';
import {SharedModule} from '../shared/shared.module';
import { CalenderComponent } from './calender/calender.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(WidgetRoutes),
        SharedModule
    ],
    declarations: [WidgetComponent, CalenderComponent]
})

export class WidgetModule {}
