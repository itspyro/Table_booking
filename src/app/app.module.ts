import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './components/home.component';
import { OrdersComponent } from './orders/orders.component';
import { LocationComponent } from './location/location.component';
import { MaterialModule } from './material/material.module';
import { AuthComponent } from './auth/auth.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RestownerprofileComponent } from './restownerprofile/restownerprofile.component';
import { RestOverviewComponent } from './restprofile/rest-overview/rest-overview.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
//import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
//import { BookingPageComponent } from './restprofile/booking-page/booking-page.component';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';
//import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    RestownerprofileComponent,
    RestOverviewComponent,
    UserprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StarRatingModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ScrollingModule,
    MaterialModule,
    MatChipsModule,
    MatAutocompleteModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
