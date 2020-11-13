import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from '../../auth/_services/auth.service';
import {CourseService} from '../_services/course.service';
import {Router} from '@angular/router';
import {CourseModel} from '../_models/course.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit, OnDestroy {
  addForm: FormGroup;
  hasError: boolean;
  isLoading$: Observable<boolean>;
  currentCourse: CourseModel;

  // private fields
  private unsubscribe: Subscription[] = [];

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private courseService: CourseService,
      private router: Router
  ) {
    this.isLoading$ = this.courseService.isLoading$;
    this.currentCourse = this.courseService.currentCourse;
  }

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.addForm.controls;
  }

  initForm() {
    this.addForm = this.fb.group(
        {
          title: [
            this.currentCourse.title,
            Validators.compose([
              Validators.required,
              Validators.maxLength(100),
            ]),
          ],
          cavalier: [
            this.currentCourse.cavalier,
            Validators.compose([
              Validators.required,
              Validators.maxLength(100),
            ]),
          ],
          level: [
            this.currentCourse.level,
            Validators.compose([
              Validators.required,
              Validators.maxLength(100),
            ]),
          ],
          started: [
            this.currentCourse.started,
            Validators.compose([
              Validators.required,
              Validators.maxLength(100),
            ]),
          ],
          duration: [
            this.currentCourse.duration,
            Validators.compose([
              Validators.required,
              Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
            ]),
          ],
          time: [
            this.currentCourse.time,
            Validators.compose([
              Validators.required,
              Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
            ]),
          ],
        },
    );

  }

  submit() {
    this.hasError = false;
    const result = {};
    Object.keys(this.f).forEach(key => {
      result[key] = this.f[key].value;
    });
    const updateCourse = new CourseModel();
    updateCourse.setCourse(result);
    console.log(updateCourse);
    updateCourse.time = ((updateCourse.time == null || false) ? this.currentCourse.time : updateCourse.time);
    updateCourse.started = ((updateCourse.started == null || false) ?
        this.currentCourse.started : updateCourse.started);
    updateCourse.id = this.currentCourse.id;
    const registrationSubscr = this.courseService
        .updateCourse(updateCourse)
        .pipe(first())
        .subscribe((course) => {
          if (course) {
            console.log(course);
            this.router.navigate(['session-management/courses']);
          } else {
            this.hasError = true;
          }
        });
    this.unsubscribe.push(registrationSubscr);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
