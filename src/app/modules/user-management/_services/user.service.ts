import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {UserModel} from '../../auth/_models/user.model';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {catchError, finalize, first, map, switchAll, switchMap} from 'rxjs/operators';
import {AuthService} from '../../auth/_services/auth.service';

const API_USERS_URL = environment.apiUrl + 'users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
      private router: Router,
      private http: HttpClient,
      private auth: AuthService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
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
}

