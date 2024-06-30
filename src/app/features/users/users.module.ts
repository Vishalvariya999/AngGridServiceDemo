import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserContainerComponent } from './container/user-container/user-container.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    UserContainerComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
