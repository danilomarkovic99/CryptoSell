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
    IntroOneComponent,
    ContactComponent, 
    FooterComponent, 
    TestimonialsComponent, 
    TestimonialsCarouselComponent, 
    ServicesCarouselComponent, BuyComponent
  ],
  
  providers: [WINDOW_PROVIDERS]

})
export class HomeModule { }
