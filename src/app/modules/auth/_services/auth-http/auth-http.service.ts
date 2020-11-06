import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../../_models/user.model';
import { environment } from '../../../../../environments/environment';
import { AuthModel } from '../../_models/auth.model';
import {removeSummaryDuplicates} from '@angular/compiler';
import {map, tap} from 'rxjs/operators';
import {ResponseModel} from '../../_models/response.model';

const API_USERS_URL = environment.apiUrl + 'users';

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient) {}

  // public methods
  login(email: string, phone: number, password: string): Observable<any> {
    return this.http.post<AuthModel>(API_USERS_URL + '/login', { email, phone, password })
        .pipe(
            map( res => {
                  var response = new ResponseModel();
                  response = res;
                  const auth = new AuthModel();
                  auth.accessToken = response.result.token;
                  auth.refreshToken = response.result.token;
                  auth.expiresIn = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000);
                  return auth;
            })
        );
  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: UserModel): Observable<UserModel> {
      let email = user.email;
      let password = user.password;
      let firstname = user.firstname;
      let lastname = user.lastname;
      let licence = user.licence;
      let phone = user.phone;
      let permission_id = user.permission;
      return this.http.post<UserModel>(API_USERS_URL + '/register',
        {email, password, firstname, lastname, phone, licence, permission_id});
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_USERS_URL}/forgot-password`, {
      email,
    });
  }

  getUserByToken(token): Observable<UserModel> {
    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return this.http.get<UserModel>(API_USERS_URL + '/me', {headers: httpHeaders})
        .pipe(
            map(res => {
                var response = new ResponseModel();
                response = res;
                const user = new UserModel();
                user.id = response.result.user.id;
                user.password = response.result.user.password;
                user.firstname = response.result.account.firstname;
                user.lastname = response.result.account.lastname;
                user.fullname = response.result.account.firstname + ' ' + response.result.account.lastname;
                user.email = response.result.user.email;
                user.permission = response.result.user.permission_id ;
                user.phone = response.result.user.phone;
                user.licence = response.result.account.licence;
                return user;
                }
            )
        );
  }

}
