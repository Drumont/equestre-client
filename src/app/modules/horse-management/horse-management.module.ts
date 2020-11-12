import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorseManagementComponent } from './horse-management.component';
import { HorsesComponent } from './horses/horses.component';
import { AddComponent } from './add/add.component';
import {HorseManagementRoutingModule} from './horse-management-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InlineSVGModule} from 'ng-inline-svg';
import {NgbCollapseModule, NgbDatepickerModule, NgbTimepicker, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {EditComponent} from './edit/edit.component';
import {CoreModule} from '../../_metronic/core';
import { CoursesComponent } from './courses/courses.component';
import { AddCourseComponent } from './add-course/add-course.component';



@NgModule({
  declarations: [
    HorseManagementComponent,
    HorsesComponent,
    AddComponent,
    EditComponent,
    CoursesComponent,
    AddCourseComponent
  ],
  imports: [
    CommonModule,
    HorseManagementRoutingModule,
    FormsModule,
    InlineSVGModule,
    ReactiveFormsModule,
    NgbCollapseModule,
    CoreModule,
    NgbDatepickerModule,
    NgbTimepickerModule
  ]
})
export class HorseManagementModule { }
