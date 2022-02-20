import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './components/home.component';
import { OrdersComponent } from './orders/orders.component';
import { RestownerprofileComponent } from './restownerprofile/restownerprofile.component';
import { RestprofileComponent } from './restprofile/restprofile.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'restaurants', component: HomeComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'restownerprofile', component: RestownerprofileComponent },
  { path: 'rest_profile/:id', component: RestprofileComponent },
  { path: '**', redirectTo: '' },
  {path: 'userprofile',component:UserprofileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
