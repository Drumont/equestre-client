import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {HorseModel} from '../../horse-management/_models/horse.model';
import {CourseModel} from '../_models/course.service';
import {HorseService} from '../../horse-management/_services/horse.service';
import {Router} from '@angular/router';
import {CourseService} from '../_services/course.service';
import {first} from 'rxjs/operators';
import {AuthService} from '../../auth/_services/auth.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses: Observable<CourseModel>;
  hasError: boolean;
  isLoading$: Observable<boolean>;
  isMonitor: boolean;
  isAdmin: boolean;

  // private fields
  private unsubscribe: Subscription[] = [];

  constructor(
      private courseService: CourseService,
      private router: Router,
      private autService: AuthService
  ) {
    this.isLoading$ = this.courseService.isLoading$;
  }

  edit(course){
    this.courseService.edit(course);
    this.router.navigate(['/session-management/edit-course']);
  }

  register(id) {
    this.hasError = false;
    const  registrationSubscr = this.courseService
        .addUserToCourse(id)
        .pipe(first())
        .subscribe((result) => {
          if (result) {
            console.log(result);
            this.router.navigate(['/session-management/courses']);
          } else {
            this.hasError = true;
          }
        });
    this.unsubscribe.push(registrationSubscr);
  }

  ngOnInit(): void {
    this.courses = this.courseService.getAllCourses();
    this.isMonitor = this.autService.isMoniteur();
    this.isAdmin = this.autService.isAdmin();
  }

}
