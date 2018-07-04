import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  displayData: User[];
  sortName: string;
  sortValue: string;

  loading: boolean;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.loading = false;
    this.sortName = null;
    this.sortValue = null;
    this.displayData = [];
    this.loadUsers();
  }

  async onUpdateAdminRole(userId: string, isAdmin: boolean): Promise<void> {
    if (!this.loading) {
      this.loading = true;
      try {
        await this.usersService.updateAdminRole(userId, isAdmin);
        this.users.find(x => x.id === userId).isAdmin = isAdmin;
      }
      finally {
        this.loading = false;
      }
    }
  }

  private async loadUsers(): Promise<void> {
    this.users = await this.usersService.getUsers();
    this.displayData = [...this.users];
  }

  onSort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  private search(): void {
    const data = [...this.users];
    if (this.sortName) {
      this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
    } else {
      this.displayData = data;
    }
  }
}
