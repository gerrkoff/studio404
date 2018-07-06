import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { UserDisplay } from '../../models/user-display';
import { Table } from '../../../common/models/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  data: UserDisplay[];
  table: Table<User>;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.table = {
      isLoading: false,
      searchValue: ''
    };
    this.data = [];
    this.loadUsers();
  }

  async onUpdateAdminRole(user: UserDisplay, isAdmin: boolean): Promise<void> {
    if (!user.isLoading) {
      user.isLoading = true;
      try {
        await this.usersService.updateAdminRole(user.id, isAdmin);
        this.users.find(x => x.id === user.id).isAdmin = isAdmin;
      }
      finally {
        user.isLoading = false;
      }
    }
  }

  private async loadUsers(): Promise<void> {
    if (!this.table.isLoading) {
      this.table.isLoading = true;
      try {
        this.users = await this.usersService.getUsers();
        this.data = [...this.users];
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
    if (!this.users)
      return;
      
    const data = this.users.filter(x => x.displayName.toLocaleLowerCase().indexOf(this.table.searchValue.toLocaleLowerCase()) !== -1);
    if (this.table.sortName) {
      this.data = data.sort((a, b) => (this.table.sortValue === 'ascend') ? (a[this.table.sortName] > b[this.table.sortName] ? 1 : -1) : (b[this.table.sortName] > a[this.table.sortName] ? 1 : -1));
    } else {
      this.data = data;
    }
  }

  private updateRows(): void {
    this.users.forEach(x => 
        this.table.rows[x.id] = {
          isProcessing: false,
          data: {...x}
        }
    );
  }
}
