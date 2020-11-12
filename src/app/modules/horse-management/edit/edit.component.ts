import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {HorseService} from '../_services/horse.service';
import {AuthService} from '../../auth/_services/auth.service';
import {Router} from '@angular/router';
import {HorseModel} from '../_models/horse.model';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  editForm: FormGroup;
  hasError: boolean;
  isLoading$: Observable<boolean>;
  currentHorse$: Observable<HorseModel>;

  // private fields
  private unsubscribe: Subscription[] = [];

  constructor(
      private fb: FormBuilder,
      private horseService: HorseService,
      private authService: AuthService,
      private router: Router
  ) {
    this.currentHorse$ = this.horseService.currentHorseSubject.asObservable();
    this.isLoading$ = this.horseService.isLoading$;
  }

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.editForm.controls;
  }

  initForm() {
    const currentHorse = this.horseService.currentHorseSubject.value;
    this.editForm = this.fb.group(
        {
          name: [
            currentHorse.name,
            Validators.compose([
              Validators.required,
              Validators.maxLength(100),
            ]),
          ],
          breed: [
            currentHorse.breed,
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
    const updateHorse = new HorseModel();
    updateHorse.setHorse(result);
    updateHorse.id = this.horseService.currentHorseSubject.value.id;
    const updateSubscr = this.horseService
        .updateHorse(updateHorse)
        .subscribe(() => {
            this.router.navigate(['/horse-management/horses']);
        });
    this.unsubscribe.push(updateSubscr);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
