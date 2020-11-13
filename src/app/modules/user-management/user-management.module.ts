import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { UserManagementComponent } from './user-management.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InlineSVGModule} from 'ng-inline-svg';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { AddComponent } from './add/add.component';
import {CoreModule} from '../../_metronic/core';

@NgModule({
  declarations: [
    UsersComponent,
    UserManagementComponent,
    ProfileComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    FormsModule,
    InlineSVGModule,
    ReactiveFormsModule,
    NgbCollapseModule,
    CoreModule
  ],
})
export class UserManagementModule {}
