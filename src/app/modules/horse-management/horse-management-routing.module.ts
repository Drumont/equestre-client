import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HorseManagementComponent} from './horse-management.component';
import {HorsesComponent} from './horses/horses.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {CoursesComponent} from './courses/courses.component';
import {AddCourseComponent} from './add-course/add-course.component';

const routes: Routes = [
    {
        path: '',
        component: HorseManagementComponent,
        children: [
            {
                path: 'horses',
                component: HorsesComponent,
            },
            {
                path: 'add',
                component: AddComponent,
            },
            {
                path: 'edit',
                component: EditComponent,
            },

            {
                path: 'courses',
                component: CoursesComponent,
            },
            {
                path: 'add-course',
                component: AddCourseComponent,
            },
            { path: '', redirectTo: 'horses', pathMatch: 'full' },
            { path: '**', redirectTo: 'horses', pathMatch: 'full' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HorseManagementRoutingModule {}
