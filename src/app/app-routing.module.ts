import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthComponent } from './auth/auth.component';
import { BookingPageComponent } from './restprofile/booking-page/booking-page.component';
import { HomeComponent } from './components/home.component';
import { OrdersComponent } from './orders/orders.component';
import { RestownerprofileComponent } from './restownerprofile/restownerprofile.component';
import { RestprofileComponent } from './restprofile/restprofile.component';
import { AuthGuard } from './services/auth.guard';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'restaurants', component: HomeComponent },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  {
    path: 'profile',
    component: RestownerprofileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'rest_profile/:id', component: RestprofileComponent },
  {
    path: 'booking/:id',
    component: BookingPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'payment',
    component: PaymentComponent,
    canActivate: [AuthGuard],
  }, 
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
