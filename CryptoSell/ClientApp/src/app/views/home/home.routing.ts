import { Routes } from '@angular/router';
import { BuyadsComponent } from './buyads.component';

import { HomeOneComponent } from './home-one.component';

export const HomeRoutes: Routes = [
  { path: 'one', component: HomeOneComponent },
  {path:'buyads', component: BuyadsComponent}
];