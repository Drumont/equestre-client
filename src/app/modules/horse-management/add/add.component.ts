import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {HorseService} from '../_services/horse.service';
import {UserModel} from '../../auth/_models/user.model';
import {first} from 'rxjs/operators';
import {HorseModel} from '../_models/horse.model';
import {AuthService} from '../../auth/_services/auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy{
  addForm: FormGroup;
  hasError: boolean;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = [];

  constructor(
      private fb: FormBuilder,
      private horseService: HorseService,
      private authService: AuthService,
      private router: Router
  ) {
    this.isLoading$ = this.horseService.isLoading$;
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
          name: [
            '',
            Validators.compose([
              Validators.required,
              Validators.maxLength(100),
            ]),
          ],
          breed: [
            '',
            Validators.compose([
              Validators.required,
              Validators.maxLength(100),
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
    console.log(result);
    const newHorse = new HorseModel();
    newHorse.setHorse(result);
    newHorse.createdBy = this.authService.currentUserValue.id;
    const registrationSubscr = this.horseService
        .add(newHorse)
        .pipe(first())
        .subscribe((horse) => {
          console.log(horse);
          if (horse) {
            this.router.navigate(['/horse-management/horses']);
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
