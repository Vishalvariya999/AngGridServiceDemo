import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrl: './user-container.component.scss'
})
export class UserContainerComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();
  constructor(
    public userService$: UserService
  ) { }


  ngOnInit(): void {
    this.userService$.read();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }


}
