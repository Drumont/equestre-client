import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import KTWizard from '../../../../assets/js/components/wizard';
import { KTUtil } from '../../../../assets/js/components/util';
import {Observable, Subscription} from 'rxjs';
import {UserModel} from '../../auth/_models/user.model';
import {AuthService} from '../../auth/_services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {hasErrors} from '@angular/compiler-cli/ngcc/src/packages/transformer';
import {UserService} from '../_services/user.service';
import {ConfirmPasswordValidator} from '../../auth/registration/confirm-password.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  hasError: boolean;
  user$: Observable<UserModel>;
  updateProfileForm: FormGroup;
  updateUserForm: FormGroup;
  isCollapsedAccount = false;
  isCollapsedConnection = true;
  isAdmin: boolean;
  isMonitor: boolean;

  // private fields
  private unsubscribe: Subscription[] = [];

  constructor( private auth: AuthService,
               private userService: UserService,
               private fb: FormBuilder,
               private router: Router) { }

  // convenience getter for easy access to form fields
  get f() {
    return this.updateProfileForm.controls;
  }

  ngOnInit(): void {
    this.user$ = this.auth.currentUserSubject.asObservable();
    this.initForm();
    this.isAdmin = this.auth.isAdmin();
    this.isMonitor = this.auth.isMoniteur();
  }

  initForm() {
    const currentUser = this.auth.currentUserValue;
    console.log(currentUser);
    this.updateProfileForm = this.fb.group({
      firstname: [
        currentUser.firstname,
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
        ]),
      ],
      lastname: [
        currentUser.lastname,
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
        ]),
      ],
      licence: [
        currentUser.licence,
        Validators.compose([
          Validators.maxLength(100),
        ]),
      ],
    });
    this.updateUserForm = this.fb.group({
          email: [
            currentUser.email,
            Validators.compose([
              Validators.required,
              Validators.maxLength(100),
            ]),
          ],
          phone: [
            currentUser.phone,
            Validators.compose([
              Validators.required,
              Validators.maxLength(100),
            ]),
          ],
        });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  submit() {
    this.hasError = false;
    const result = {};
    Object.keys(this.f).forEach(key => {
      result[key] = this.f[key].value;
    });
    console.log(result);
    const updateUser = new UserModel();
    updateUser.setUser(result);
    console.log(updateUser);
    const updateSubscr = this.userService
        .updateAccount(updateUser)
        .pipe(first())
        .subscribe(() => {
            this.router.navigate(['/profile']);
        });
    this.unsubscribe.push(updateSubscr);
  }

  submitUser() {
    this.hasError = false;
    const result = {};
    Object.keys(this.f).forEach(key => {
      result[key] = this.f[key].value;
    });
    console.log(result);
    const updateUser = new UserModel();
    updateUser.setUser(result);
    console.log(updateUser);
    const updateSubscr = this.userService
        .updateAccount(updateUser)
        .pipe(first())
        .subscribe(() => {
          this.router.navigate(['/user-management/profile']);
        });
    this.unsubscribe.push(updateSubscr);
  }
}
