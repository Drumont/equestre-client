import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {UserService} from '../_services/user.service';
import {Router} from '@angular/router';
import {ConfirmPasswordValidator} from '../../auth/registration/confirm-password.validator';
import {UserModel} from '../../auth/_models/user.model';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {
  addForm: FormGroup;
  hasError: boolean;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = [];

  constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private router: Router
  ) {
    this.isLoading$ = this.userService.isLoading$;
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
          firstname: [
            '',
            Validators.compose([
              Validators.required,
              Validators.maxLength(100),
            ]),
          ],
          lastname: [
            '',
            Validators.compose([
              Validators.required,
              Validators.maxLength(100),
            ]),
          ],
          phone: [
            '',
            Validators.compose([
              Validators.required,
              Validators.maxLength(100),
            ]),
          ],
          licence: [
            '',
            Validators.compose([
              Validators.required,
              Validators.maxLength(100),
            ]),
          ],
          email: [
            'qwe@qwe.qwe',
            Validators.compose([
              Validators.required,
              Validators.email,
              Validators.minLength(3),
              Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
            ]),
          ],
          password: [
            '',
            Validators.compose([
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(100),
            ]),
          ],
          permission: [
            3,
            Validators.compose([
              Validators.required,
            ]),
          ]
        },
    );

  }

  submit() {
    this.hasError = false;
    const result = {};
    Object.keys(this.f).forEach(key => {
      result[key] = this.f[key].value;
    });
    const newUser = new UserModel();
    newUser.setUser(result);
    console.log(newUser);
    const registrationSubscr = this.userService
        .add(newUser)
        .pipe(first())
        .subscribe((user: UserModel) => {
          if (user) {
            this.router.navigate(['user-management/users']);
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
