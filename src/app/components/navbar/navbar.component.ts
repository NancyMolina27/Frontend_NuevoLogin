import { Roles } from './../../models/roles';
import { Router} from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ UserService]
})
export class NavbarComponent implements OnInit, DoCheck {

  public identity;
  public token;
  public role;
  public userrol: Array<Roles>;
  constructor(
    private userservices: UserService,
    private router: Router
  ) {
    this.identity = this.userservices.getIdentity();
    this.token = this.userservices.getToken();
  }

  ngOnInit(): void {
    this.getRol();
  }

  ngDoCheck(): void {
    this.identity = this.userservices.getIdentity();
    this.token = this.userservices.getToken();
  }

  getRol(): void {
    this.userservices.getRol().subscribe(
      response => {
          this.userrol = response.users;
      },
      error => {
        console.log(error);
      }
    );
  }

}
