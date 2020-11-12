import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {UserService} from '../../user-management/_services/user.service';
import {Router} from '@angular/router';
import {UserModel} from '../../auth/_models/user.model';
import {first} from 'rxjs/operators';
import {CourseModel} from '../_models/course.service';
import {CourseService} from '../_services/course.service';
import {AuthService} from '../../auth/_services/auth.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit, OnDestroy {
  addForm: FormGroup;
  hasError: boolean;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = [];

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private courseService: CourseService,
      private router: Router
  ) {
    this.isLoading$ = this.courseService.isLoading$;
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
            '',
            Validators.compose([
              Validators.required,
              Validators.maxLength(100),
            ]),
          ],
          cavalier: [
            '',
            Validators.compose([
              Validators.required,
              Validators.maxLength(100),
            ]),
          ],
          level: [
            '',
            Validators.compose([
              Validators.required,
              Validators.maxLength(100),
            ]),
          ],
          started: [
            '',
            Validators.compose([
              Validators.required,
              Validators.maxLength(100),
            ]),
          ],
          duration: [
            '',
            Validators.compose([
              Validators.required,
              Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
            ]),
          ],
          time: [
            '',
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
    const newCourse = new CourseModel();
    newCourse.setCourse(result);
    newCourse.createdBy = this.authService.currentUserValue.id;
    console.log(newCourse);
    const registrationSubscr = this.courseService
        .add(newCourse)
        .pipe(first())
        .subscribe((course) => {
          if (course) {
            console.log(course);
            this.router.navigate(['horse-management/courses']);
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
