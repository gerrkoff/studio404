import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { TableComponent } from '../../../common/components/table/table.component';

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

  protected async loadItemsCore(): Promise<User[]> {
    const data = await this.usersService.getUsers();
    return this.sort(data, 'displayName', true);
  }

  onUpdateAdminRole(id: string, isAdmin: boolean): void {
    this.rowProcessingWrapper(id, async () => {

      await this.usersService.updateAdminRole(id, isAdmin);
      this.loadedItems.find(x => x.id === id).isAdmin = isAdmin;
    });
  }
}
