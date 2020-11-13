import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {HorseModel} from '../../horse-management/_models/horse.model';
import {CourseModel} from '../_models/course.service';
import {CourseService} from '../_services/course.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit, OnDestroy {

  courses: Observable<CourseModel>;
  hasError: boolean;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = [];

  constructor(
      private courseService: CourseService,
      private router: Router,
  ) {
    this.isLoading$ = this.courseService.isLoading$;
  }

  ngOnInit(): void {
    this.courses = this.courseService.getMyCourse();
  }

  dispatch(course: any) {

  }


  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
