import { UserService } from './../../services/user.service';
import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ UserService]
})
export class NavbarComponent implements OnInit, DoCheck {

  public identity;
  public token;

  constructor(
    private userservices: UserService
  ) {
    this.identity = this.userservices.getIdentity();
    this.token = this.userservices.getToken();

  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.identity = this.userservices.getIdentity();
    this.token = this.userservices.getToken();
  }


}
