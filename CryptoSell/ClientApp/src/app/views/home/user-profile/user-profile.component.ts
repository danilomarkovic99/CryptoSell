import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  displayedColumns:  string[] = ['Coin', 'Kolicina', 'Cena', 'Tip', 'Obrisi'];
  displayedColumns2:  string[] = ['Coin', 'Kolicina', 'Cena', 'Oglasivac', 'Obustavi'];

  constructor() { }

  ngOnInit() {
  }

}
