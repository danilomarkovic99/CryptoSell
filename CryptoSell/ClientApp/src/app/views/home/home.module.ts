import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { 
  MatIconModule,
  MatCardModule,
  MatMenuModule,
  MatButtonModule,
  MatChipsModule,
  MatListModule,
  MatInputModule,
  MatRippleModule,
  MatSlideToggleModule,
  MatSnackBarModule
 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NguCarouselModule } from '@ngu/carousel';
// import { CommonDirectivesModule } from '../../directives/common/common-directives.module';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutes } from "./home.routing";
import {BuyadsComponent} from "./buyads.component";
import { HomeOneComponent } from './home-one.component';
import { HeaderComponent } from './header/header.component';
import { IntroOneComponent } from './intro-one/intro-one.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { TestimonialsCarouselComponent } from './testimonials-carousel/testimonials-carousel.component';
import { ServicesCarouselComponent } from './services-carousel/services-carousel.component';
import {MaterialModule} from "./material/material.module";

import { WINDOW_PROVIDERS } from '../../shared/helpers/window.helper';
import { BuyComponent } from './buy/buy.component';
import { SelladsComponent } from './sellads.component';
import { CoinPricesComponent } from './coinprices.component';
import { SellComponent } from './sell/sell.component';
import { CoinpriceComponent } from './coinprice/coinprice.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginsComponent } from './logins.component';
import { RegistersComponent } from './registers.component';
import { ProfileComponent } from './profile.component';
import { AddAdComponent } from './add-ad/add-ad.component';
import { NewAdComponent } from './newad.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatListModule,
    MatRippleModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    FlexLayoutModule,
    NguCarouselModule,
    MaterialModule,
    RouterModule.forChild(HomeRoutes)
  ],
  declarations: [
    HomeOneComponent,
    HeaderComponent, 
    BuyadsComponent,
    SelladsComponent,
    LoginsComponent,
    RegistersComponent,
    ProfileComponent,
    NewAdComponent,
    CoinPricesComponent,
    IntroOneComponent,
    ContactComponent, 
    FooterComponent, 
    TestimonialsComponent, 
    TestimonialsCarouselComponent, 
    ServicesCarouselComponent, BuyComponent, SellComponent, CoinpriceComponent, UserProfileComponent, LoginComponent, RegisterComponent, AddAdComponent
  ],
  
  providers: [WINDOW_PROVIDERS]

})
export class HomeModule { }
