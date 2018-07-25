import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { TableComponent } from '../../../common/components/table/table.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [
    './users.component.css',
    '../../../common/styles/table.css'
  ]
})
export class UsersComponent extends TableComponent<User> {

  protected itemSearchFieldName = 'displayName';

  constructor(
    private usersService: UsersService,
    private messageService: NzMessageService
  ) {
    super();
  }

  protected loadItemsCore(): Observable<User[]> {
    return this.usersService.getUsers().pipe(
      map(x => this.sort(x, 'displayName', true))
    );
  }

  onUpdateAdminRole(id: string, isAdmin: boolean): void {
    const response = this.rowProcessingWrapper<void>(id, () => this.usersService.updateAdminRole(id, isAdmin));
    if (response) {
      response.subscribe({
        next: () => {
          this.loadedItems.find(x => x.id === id).isAdmin = isAdmin;
          this.messageService.success(`Updated user [${id}]`);
        }
      });
    }
  }
}
