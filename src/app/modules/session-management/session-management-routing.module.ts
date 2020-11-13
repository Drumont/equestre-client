import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SessionManagementComponent} from './session-management.component';
import {CoursesComponent} from './courses/courses.component';
import {AddCourseComponent} from './add-course/add-course.component';
import {EditCourseComponent} from './edit-course/edit-course.component';

const routes: Routes = [
  {
    path: '',
    component: SessionManagementComponent,
    children: [
      {
        path: 'courses',
        component: CoursesComponent,
      },
      {
        path: 'add-course',
        component: AddCourseComponent,
      },
      {
        path: 'edit-course',
        component: EditCourseComponent,
      },
      { path: '', redirectTo: 'courses', pathMatch: 'full' },
      { path: '**', redirectTo: 'courses', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionManagementRoutingModule { }
