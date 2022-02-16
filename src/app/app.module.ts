import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReviewsComponent } from './reviews/reviews.component';
import { StarRatingModule } from 'angular-star-rating';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { RestprofileComponent } from './restprofile/restprofile.component';
import { HeadingComponent } from './heading/heading.component';
import { FilterComponent } from './components/filter/filter.component';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './components/home.component';
import { OrdersComponent } from './orders/orders.component';
import { LocationComponent } from './location/location.component';
import { MaterialModule } from './material/material.module';
import { AuthComponent } from './auth/auth.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DailogComponent } from './auth/dailog/dailog.component';
import { RestownerprofileComponent } from './restownerprofile/restownerprofile.component';
@NgModule({
  declarations: [
    AppComponent,
    ReviewsComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    RestprofileComponent,
    HeadingComponent,
    FilterComponent,
    RestaurantCardComponent,
    HomeComponent,
    OrdersComponent,
    LocationComponent,
    AuthComponent,
    DailogComponent,
    RestownerprofileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StarRatingModule.forRoot(),
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    ScrollingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
