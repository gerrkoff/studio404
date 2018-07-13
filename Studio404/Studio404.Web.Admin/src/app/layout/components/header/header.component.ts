import { Component, OnInit } from '@angular/core';
import { MiscService } from '../../../common/services/misc.service';
import { LoginService } from '../../../common/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userDisplayName: string;

  constructor(
    private miscService: MiscService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.getInfo();
  }

  async onLogout(): Promise<void> {
    await this.loginService.logout();
    location.replace('/');
  }

  private async getInfo(): Promise<void> {
    const data = await this.miscService.getMiscInfo();
    this.userDisplayName = data.userDisplayName;
  }
}
