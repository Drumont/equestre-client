import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionManagementRoutingModule } from './session-management-routing.module';
import { SessionManagementComponent } from './session-management.component';
import {CoursesComponent} from './courses/courses.component';
import {AddCourseComponent} from './add-course/add-course.component';
import {EditCourseComponent} from './edit-course/edit-course.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InlineSVGModule} from 'ng-inline-svg';
import {NgbCollapseModule, NgbDatepickerModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {CoreModule} from '../../_metronic/core';
import { SessionsComponent } from './sessions/sessions.component';



@NgModule({
  declarations: [
    SessionManagementComponent,
    CoursesComponent,
    AddCourseComponent,
    EditCourseComponent,
    SessionsComponent
  ],
  imports: [
    CommonModule,
    SessionManagementRoutingModule,
    FormsModule,
    InlineSVGModule,
    ReactiveFormsModule,
    NgbCollapseModule,
    CoreModule,
    NgbDatepickerModule,
    NgbTimepickerModule
  ]
})
export class SessionManagementModule { }
