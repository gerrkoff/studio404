import { Component, OnInit } from '@angular/core';
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
    private usersService: UsersService
  ) {
    super();
  }

  protected loadItemsCore(): Observable<User[]> {
    return this.usersService.getUsers().pipe(
      map(x => this.sort(x, 'displayName', true))
    );
  }

  onUpdateAdminRole(id: string, isAdmin: boolean): void {
    this.rowProcessingWrapper(id, async () => {

      await this.usersService.updateAdminRole(id, isAdmin);
      this.loadedItems.find(x => x.id === id).isAdmin = isAdmin;
    });
  }
}
