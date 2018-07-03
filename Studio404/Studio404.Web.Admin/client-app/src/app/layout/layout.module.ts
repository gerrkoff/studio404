import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { MenuComponent } from './content/menu/menu.component';
import { HomeComponent } from './content/home/home.component';
import { NotFoundComponent } from './content/not-found/not-found.component';
import { RouterModule } from '@angular/router';

registerLocaleData(en);

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
  ],
  declarations: [FooterComponent, HeaderComponent, ContentComponent, MenuComponent, HomeComponent, NotFoundComponent],
  exports: [FooterComponent, HeaderComponent, ContentComponent]
})
export class LayoutModule { }
