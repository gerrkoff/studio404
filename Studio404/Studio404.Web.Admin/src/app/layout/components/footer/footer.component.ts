import { Component, OnInit } from '@angular/core';
import { MiscService } from '../../../common/services/misc.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  version: string;
  demoStaging: boolean;

  constructor(
    private miscService: MiscService
  ) { }

  ngOnInit() {
    this.getInfo();
  }

  private async getInfo(): Promise<void> {
    const data = await this.miscService.getMiscInfo();
    this.version = data.version;
    this.demoStaging = data.demoStaging;
  }
}
