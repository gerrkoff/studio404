import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { TableComponent } from '../../../common/components/table.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [
    './users.component.css',
    '../../../common/styles/table.css'
  ]
})
export class UsersComponent extends TableComponent<User> {

  itemSearchFieldName = 'displayName';

  constructor(
    private usersService: UsersService
  ) {
    super();
  }

  loadItemsCore(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  onUpdateAdminRole(id: string, isAdmin: boolean): void {
    this.rowProcessingWrapper(id, async () => {

      await this.usersService.updateAdminRole(id, isAdmin);
      this.loadedItems.find(x => x.id === id).isAdmin = isAdmin;
    });
  }
}
