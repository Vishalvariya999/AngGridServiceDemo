import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  @Input() userService$!: UserService;

  public onEdit(event: any) {
    console.log('event', event);
  }

  public onDelete(event: any) {

  }

}
