import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layout/components/content/home/home.component';
import { NotFoundComponent } from './layout/components/content/not-found/not-found.component';
import { PromoCodesComponent } from './prices/components/promo-codes/promo-codes.component';
import { HourCostsComponent } from './prices/components/hour-costs/hour-costs.component';
import { UserBookingsComponent } from './bookings/components/user-bookings/user-bookings.component';
import { SpecialCodesComponent } from './bookings/components/special-codes/special-codes.component';
import { UsersComponent } from './users/components/users/users.component';

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
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
