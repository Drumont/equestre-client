import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../auth/_services/auth.service';
import {HorseModel} from '../../horse-management/_models/horse.model';
import {catchError, finalize, map} from 'rxjs/operators';
import {ResponseModel} from '../../auth/_models/response.model';
import {CourseModel} from '../_models/course.service';

const API_COURSES_URL = environment.apiUrl + 'courses';
const API_SESSION_URL = environment.apiUrl + 'session/add';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private isLoadingSubject: BehaviorSubject<boolean>;

  isLoading$: Observable<boolean>;
  currentCourse: CourseModel;

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

  getAllCourses(): Observable<CourseModel> {
    this.isLoadingSubject.next(true);
    return this.http.get<any>(API_COURSES_URL + '/all', {})
        .pipe(
            map(res => {
                this.isLoadingSubject.next(false);
                let response = new ResponseModel();
                response = res;
                if (response.status === 'success') {
                    this.isLoadingSubject.next(false);
                    return response.result.map(item => {
                        const course = new CourseModel();
                        course.setCourse(item);
                        course.createdBy = item.createdBy_id;
                        course.cavalier = item.max_participant;
                        const date = this.translateToClient(item.started_date);
                        course.time = date;
                        course.started = date;
                        console.log(course);
                        return course;
                    });
                }
            }),
            catchError((err) => {
                console.error('err', err);
                return of(undefined);
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
  }

  getMyCourse(): Observable<CourseModel> {
        this.isLoadingSubject.next(true);
        return this.http.get<any>(API_COURSES_URL + '/all-by-user', {})
            .pipe(
                map(res => {
                    this.isLoadingSubject.next(false);
                    let response = new ResponseModel();
                    response = res;
                    if (response.status === 'success') {
                        this.isLoadingSubject.next(false);
                        return response.result.map(item => {
                            const course = new CourseModel();
                            course.setCourse(item);
                            course.createdBy = item.createdBy_id;
                            course.cavalier = item.max_participant;
                            const date = this.translateToClient(item.started_date);
                            course.time = date;
                            course.started = date;
                            console.log(course);
                            return course;
                        });
                    }
                }),
                catchError((err) => {
                    console.error('err', err);
                    return of(undefined);
                }),
                finalize(() => this.isLoadingSubject.next(false))
            );
    }

  updateCourse(course: CourseModel): Observable<any> {
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
    const id = course.id;
    console.log({id, title, level, started_date, duration , max_participant});
    this.isLoadingSubject.next(true);
    return this.http.put<any>(API_COURSES_URL + '/update',
        {id, title, level, started_date, duration , max_participant})
    .pipe(
        map( res => {
            let response = new ResponseModel();
            response = res;
            if (response.status === 'success') {
                this.isLoadingSubject.next(false);
                return response.status;
            }
        }),
        catchError((err) => {
            console.error('err', err);
            return of(undefined);
        }),
        finalize(() => this.isLoadingSubject.next(false))
    );
    }

    addUserToCourse(courseId): Observable<any> {
        this.isLoadingSubject.next(true);
        const course_id = courseId;
        return this.http.post<any>(API_SESSION_URL + '/user', {course_id})
            .pipe(
                map( res => {
                    let response = new ResponseModel();
                    response = res;
                    this.isLoadingSubject.next(false);
                    return response;
                }),
                catchError((err) => {
                    console.error('err', err);
                    return of(undefined);
                }),
                finalize(() => this.isLoadingSubject.next(false))
            );
    }


  edit(course: CourseModel): any {
        this.currentCourse = course;
    }

  translateToClient(input: any) {
        if (!input) { return null; }
        const result = new Date(Date.parse(input));
        result.setMinutes(result.getMinutes() + result.getTimezoneOffset());

        return result;
    }
}
