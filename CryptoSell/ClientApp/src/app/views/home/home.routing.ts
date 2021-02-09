import { Routes } from '@angular/router';
import { BuyadsComponent } from './buyads.component';
import { CoinPricesComponent } from './coinprices.component';

import { HomeOneComponent } from './home-one.component';
import { LoginsComponent } from './logins.component';
import { NewAdComponent } from './newad.component';
import { ProfileComponent } from './profile.component';
import { RegistersComponent } from './registers.component';
import { SelladsComponent } from './sellads.component';

export const HomeRoutes: Routes = [
  { path: 'one', component: HomeOneComponent },
  { path:'buyads', component: BuyadsComponent },
  { path:'sellads', component:SelladsComponent },
  { path:'coinprices', component:CoinPricesComponent },
  { path:'login', component: LoginsComponent },
  { path: 'register', component: RegistersComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'newad', component: NewAdComponent }
];