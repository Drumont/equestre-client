import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {UserModel} from '../../auth/_models/user.model';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {catchError, finalize, first, map, switchAll, switchMap} from 'rxjs/operators';
import {AuthService} from '../../auth/_services/auth.service';
import {ResponseModel} from '../../auth/_models/response.model';
import {HorseModel} from '../../horse-management/_models/horse.model';

const API_USERS_URL = environment.apiUrl + 'users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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

  updateAccount(user: UserModel): Observable<any> {
    const firstname = user.firstname;
    const lastname = user.lastname;
    const licence = user.licence;
    this.isLoadingSubject.next(true);
    return this.http.put<any>(API_USERS_URL + '/me/update', {firstname, lastname, licence})
        .pipe(
            map( () => {
              this.isLoadingSubject.next(false);
                }),
            switchMap(() => this.auth.getUserByToken()),
            catchError((err) => {
              console.error('err', err);
              return of(undefined);
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
  }

  add(user: UserModel): Observable<any> {
      const firstname = user.firstname;
      const lastname = user.lastname;
      const licence = user.licence;
      // tslint:disable-next-line:variable-name
      const permission_id = user.permission;
      const email = user.email;
      const password = user.password;
      const phone = user.phone;
      this.isLoadingSubject.next(true);
      return this.http.post<any>(API_USERS_URL + '/register',
          {firstname, lastname, licence, phone, email, password, permission_id})
          .pipe(
              map( res => {
                  this.isLoadingSubject.next(false);
                  let response = new ResponseModel();
                  response = res;
                  if (response.status === 'success') {
                      this.isLoadingSubject.next(false);
                      return user;
                  }
              }),
              catchError((err) => {
                  console.error('err', err);
                  return of(undefined);
              }),
              finalize(() => this.isLoadingSubject.next(false))
          );
  }

  getAllUsers(): Observable<UserModel> {
        this.isLoadingSubject.next(true);
        return this.http.get<any>(API_USERS_URL + '/all', {})
            .pipe(
                map(res => {
                    this.isLoadingSubject.next(false);
                    let response = new ResponseModel();
                    response = res;
                    if (response.status === 'success') {
                        this.isLoadingSubject.next(false);
                        return response.result.map(item => {
                            const user = new UserModel();
                            user.setUser(item);
                            user.firstname = item.Account.firstname;
                            user.lastname = item.Account.lastname;
                            user.licence = item.Account.licence;
                            user.permission = item.permission_id;
                            user.fullname = item.Account.firstname + ' ' + item.Account.lastname; ;
                            console.log(user);
                            return user;
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
}

