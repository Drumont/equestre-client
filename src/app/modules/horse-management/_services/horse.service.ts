import {Injectable, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../auth/_services/auth.service';
import {HorseModel} from '../_models/horse.model';
import {catchError, finalize, map, switchMap} from 'rxjs/operators';
import {ResponseModel} from '../../auth/_models/response.model';
import {UserModel} from '../../auth/_models/user.model';
import {toInteger} from '@ng-bootstrap/ng-bootstrap/util/util';

const API_HORSES_URL = environment.apiUrl + 'horses';

@Injectable({
  providedIn: 'root'
})
export class HorseService {
  private isLoadingSubject: BehaviorSubject<boolean>;

  isLoading$: Observable<boolean>;
  currentHorse$: Observable<HorseModel>;
  currentHorseSubject: BehaviorSubject<HorseModel>;

  constructor(
      private router: Router,
      private http: HttpClient,
      private auth: AuthService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentHorseSubject = new BehaviorSubject<HorseModel>(undefined);
    this.isLoading$ = this.isLoadingSubject.asObservable();
    this.currentHorse$ = this.currentHorseSubject.asObservable();
  }

    get currentUserValue(): HorseModel {
        return this.currentHorseSubject.value;
    }

  add(horse: HorseModel): Observable<any> {
    const name = horse.name;
    const breed = horse.breed;
    const createdBy_id = horse.createdBy;
    this.isLoadingSubject.next(true);
    return this.http.post<any>(API_HORSES_URL + '/add',
        {name, breed, createdBy_id})
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

  getAllHorses(): Observable<HorseModel> {
      this.isLoadingSubject.next(true);
      return this.http.get<any>(API_HORSES_URL + '/all', {})
          .pipe(
              map(res => {
                  this.isLoadingSubject.next(false);
                  let response = new ResponseModel();
                  response = res;
                  if (response.status === 'success') {
                      this.isLoadingSubject.next(false);
                      return response.result.map(item => {
                          console.log(item);
                          const horse = new HorseModel();
                          horse.setHorse(item);
                          horse.createdBy = item.createdBy_id;
                          return horse;
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

  delete(horseId: string): Observable<any> {
      this.isLoadingSubject.next(true);
      const options = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          }),
          body: {
              id: horseId
          }
      };
      return this.http.delete<any>(API_HORSES_URL + '/delete', options)
          .pipe(
              map( res => {
                  this.isLoadingSubject.next(false);
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

    updateHorse(horse: HorseModel): Observable<any> {
        const name = horse.name;
        const breed = horse.breed;
        const id = horse.id;
        console.log(id);
        this.isLoadingSubject.next(true);
        return this.http.put<any>(API_HORSES_URL + '/update', {id, name, breed})
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

  edit(horseId: string): Observable<HorseModel> {
      return this.http.get<any>(API_HORSES_URL + '/show/' + horseId)
          .pipe(
              map(res => {
                  let response = new ResponseModel();
                  response = res;
                  if (response.status === 'success') {
                    this.currentHorseSubject = new BehaviorSubject<HorseModel>(response.result);
                  }
                  return response.result;
              })
          );
  }

}
