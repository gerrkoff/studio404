import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { Table } from '../../../common/models/table';
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

  constructor(
    private usersService: UsersService
  ) {
    super();
  }

  loadItemsCore(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  async onUpdateAdminRole(user: User, isAdmin: boolean): Promise<void> {
    if (!this.table.rows[user.id].isProcessing) {
      this.table.rows[user.id].isProcessing = true;
      try {
        await this.usersService.updateAdminRole(user.id, isAdmin);
        this.loadedItems.find(x => x.id === user.id).isAdmin = isAdmin;
      }
      finally {
        this.table.rows[user.id].isProcessing = false;
      }
    }
  }

  onSort(sort: { key: string, value: string }): void {
    this.table.sortName = sort.key;
    this.table.sortValue = sort.value;
    this.onSearch();
  }

  onSearch(): void {
    if (!this.loadedItems)
      return;
      
    const filteredItems = this.loadedItems.filter(x => x.displayName.toLocaleLowerCase().indexOf(this.table.searchValue.toLocaleLowerCase()) !== -1);
    if (this.table.sortName) {
      this.showedItems = filteredItems.sort((a, b) => (this.table.sortValue === 'ascend') ? (a[this.table.sortName] > b[this.table.sortName] ? 1 : -1) : (b[this.table.sortName] > a[this.table.sortName] ? 1 : -1));
    } else {
      this.showedItems = filteredItems;
    }
  }
}
