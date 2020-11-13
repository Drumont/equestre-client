import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {HorseModel} from '../../horse-management/_models/horse.model';
import {UserModel} from '../../auth/_models/user.model';
import {HorseService} from '../../horse-management/_services/horse.service';
import {Router} from '@angular/router';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: Observable<UserModel>;
  hasError: boolean;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = [];

  constructor(
      private userService: UserService,
      private router: Router
  ) { this.isLoading$ = this.userService.isLoading$; }

  ngOnInit(): void {
    this.users = this.userService.getAllUsers();
  }

  permission(id: any): string {
    if (id === 1) { return 'Administrateur'; }
    if (id === 2) { return 'Cavalier'; }
    if (id === 3) { return 'Moniteur'; }
  }

}
