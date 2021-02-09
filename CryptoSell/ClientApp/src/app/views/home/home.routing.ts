import { Routes } from '@angular/router';
import { BuyadsComponent } from './buyads.component';
import { CoinPricesComponent } from './coinprices.component';

import { HomeOneComponent } from './home-one.component';
import { SelladsComponent } from './sellads.component';

export const HomeRoutes: Routes = [
  { path: 'one', component: HomeOneComponent },
  { path:'buyads', component: BuyadsComponent },
  { path:'sellads', component:SelladsComponent },
  { path:'coinprices', component:CoinPricesComponent }
];