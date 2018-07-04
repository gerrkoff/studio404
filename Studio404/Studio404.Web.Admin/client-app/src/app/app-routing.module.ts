import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layout/content/home/home.component';
import { NotFoundComponent } from './layout/content/not-found/not-found.component';
import { PromoCodesComponent } from './bookings/promo-codes/promo-codes.component';
import { HourCostsComponent } from './bookings/hour-costs/hour-costs.component';
import { UserBookingsComponent } from './prices/user-bookings/user-bookings.component';
import { SpecialCodesComponent } from './prices/special-codes/special-codes.component';
import { UsersComponent } from './users/users/users.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'promo-codes', component: PromoCodesComponent },
  { path: 'hour-costs', component: HourCostsComponent },
  { path: 'user-bookings', component: UserBookingsComponent },
  { path: 'special-codes', component: SpecialCodesComponent },
  { path: 'users', component: UsersComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
