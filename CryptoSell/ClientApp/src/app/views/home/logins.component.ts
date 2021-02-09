import { Component, OnDestroy, OnInit } from '@angular/core';
import { LandingFixService } from '../../shared/services/landing-fix.service';

@Component({
  selector: 'app-buyads',
  template: `<app-header></app-header>
  <app-login></app-login>
  <app-footer></app-footer>`})
export class LoginsComponent implements OnInit, OnDestroy {
  constructor(
    private fix: LandingFixService
  ) { }

  ngOnInit() {
    this.fix.addFix();
  }
  ngOnDestroy() {
    this.fix.removeFix();
  }
  

}
