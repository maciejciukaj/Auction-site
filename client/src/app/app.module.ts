import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdvertismentsComponent } from './advertisments/advertisments.component';
import { AuctionsComponent } from './auctions/auctions.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './minigame/minigame.component';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserInfoEditComponent } from './user-info-edit/user-info-edit.component';
import { AdvertFormComponent } from './advert-form/advert-form.component';
import { MyAuctionsComponent } from './my-auctions/my-auctions.component';
import { environment } from '../environments/environment';
import { PhotoPreviewComponent } from './photo-preview/photo-preview.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { VehicleCardComponent } from './vehicle-card/vehicle-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
import { AuctionFormComponent } from './auction-form/auction-form.component';
import { VehicleCardAuctionComponent } from './vehicle-card-auction/vehicle-card-auction.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MyOffersComponent } from './my-offers/my-offers.component';

@NgModule({
  declarations: [
    AppComponent,
    AdvertismentsComponent,
    AuctionsComponent,
    HomeComponent,
    MainComponent,
    RegisterComponent,
    NavComponent,
    LoginPageComponent,
    RegisterPageComponent,
    UserProfileComponent,
    UserInfoEditComponent,
    AdvertFormComponent,
    MyAuctionsComponent,
    PhotoPreviewComponent,
    VehicleCardComponent,
    ConfirmationDialogComponent,
    AuctionFormComponent,
    VehicleCardAuctionComponent,
    AboutComponent,
    ContactComponent,
    MyOffersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    NgbModule,
    LightboxModule,
  ],

  providers: [
    ConfirmationDialogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    
    },
  ],
  entryComponents: [ ConfirmationDialogComponent ],
  bootstrap: [AppComponent],
})
export class AppModule {}
