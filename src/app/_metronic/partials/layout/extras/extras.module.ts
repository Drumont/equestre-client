import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { UserDropdownInnerComponent } from './dropdown-inner/user-dropdown-inner/user-dropdown-inner.component';
import { UserOffcanvasComponent } from './offcanvas/user-offcanvas/user-offcanvas.component';
import { CoreModule } from '../../../core';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {UserManagementRoutingModule} from '../../../../modules/user-management/user-management-routing.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [
    UserDropdownInnerComponent,
    UserOffcanvasComponent,
    ScrollTopComponent,
    ToolbarComponent,
  ],
  imports: [CommonModule, InlineSVGModule, PerfectScrollbarModule, CoreModule, UserManagementRoutingModule],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
  exports: [
    UserDropdownInnerComponent,
    UserOffcanvasComponent,
    ToolbarComponent,
    ScrollTopComponent,
  ],
})
export class ExtrasModule {}
