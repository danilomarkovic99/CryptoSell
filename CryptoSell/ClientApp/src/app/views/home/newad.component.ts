import { Component, OnDestroy, OnInit } from '@angular/core';
import { LandingFixService } from '../../shared/services/landing-fix.service';

@Component({
  selector: 'app-buyads',
  template: `<app-header></app-header>
  <app-add-ad></app-add-ad>
  <app-footer></app-footer>`})
export class NewAdComponent implements OnInit, OnDestroy {
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