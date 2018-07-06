import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { UserDisplay } from '../../models/user-display';
import { Table } from '../../../common/models/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [
    './users.component.css',
    '../../../common/styles/table.css'
  ]
})
export class UsersComponent implements OnInit {

  loadedItems: User[];
  showedItems: User[];
  table: Table<User>;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.table = {
      rows: {},
      isLoading: false,
      searchValue: ''
    };
    this.showedItems = [];
    this.loadUsers();
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

  private async loadUsers(): Promise<void> {
    if (!this.table.isLoading) {
      this.table.isLoading = true;
      try {
        this.loadedItems = await this.usersService.getUsers();
        this.showedItems = [...this.loadedItems];
        this.updateRows();
      }
      finally {
        this.table.isLoading = false;
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

  private updateRows(): void {
    this.loadedItems.forEach(x => 
        this.table.rows[x.id] = {
          isProcessing: false,
          data: {...x}
        }
    );
  }
}
