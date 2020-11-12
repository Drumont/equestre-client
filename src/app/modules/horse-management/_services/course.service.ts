import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../auth/_services/auth.service';
import {HorseModel} from '../_models/horse.model';
import {catchError, finalize, map} from 'rxjs/operators';
import {ResponseModel} from '../../auth/_models/response.model';
import {CourseModel} from '../_models/course.service';

const API_COURSES_URL = environment.apiUrl + 'courses';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private isLoadingSubject: BehaviorSubject<boolean>;

  isLoading$: Observable<boolean>;

  constructor(
      private router: Router,
      private http: HttpClient,
      private auth: AuthService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  add(course: CourseModel): Observable<any> {
    const title = course.title;
    const level = course.level;
    // tslint:disable-next-line:variable-name
    const createdBy_id = course.createdBy;
    // tslint:disable-next-line:variable-name
    const started_date = course.started.year + '-' + course.started.month + '-' + course.started.month +
      'T' + course.time.hour + ':' + course.time.minute;
    const duration = course.duration;
      // tslint:disable-next-line:variable-name
    const max_participant = course.cavalier;
    this.isLoadingSubject.next(true);
    console.log({title, level, started_date, duration , createdBy_id});
    return this.http.post<any>(API_COURSES_URL + '/add',
        {title, level, started_date, duration , max_participant, createdBy_id})
        .pipe(
            map(res => {
              this.isLoadingSubject.next(false);
              let response = new ResponseModel();
              response = res;
              if (response.status === 'success') {
                this.isLoadingSubject.next(false);
                return response.result;
              }
            }),
            catchError((err) => {
              console.error('err', err);
              return of(undefined);
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
  }
}
