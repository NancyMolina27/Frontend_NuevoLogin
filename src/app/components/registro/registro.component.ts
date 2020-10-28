import { Roles } from './../../models/roles';
import { RolesService } from './../../services/roles.service';
import { User } from './../../models/users';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [UserService]
})
export class RegistroComponent implements OnInit {

  public title: string;
  public user: User;
  // tslint:disable-next-line:variable-name
  public status_user: string;
  public misroles: Array<Roles>;
  public error: any = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userServices: UserService,
    private rolesservices: RolesService
  ) {
    this.getRoles();
    this.user = new User( 1, '', '', '', '', '', '');
  }

  ngOnInit(): void {
  }

  onSubmit(registerForm): void
  {
    this.userServices.register(this.user).subscribe(
      response => {
        if (response.status === 'success')
        {
          this.status_user = response.status;
          // Vaciar formulario
          this.user = new User( 1, '', '', '', '', '', '');
          registerForm.reset();
          this.router.navigate(['usuarios-table']);
        }else
        {
          this.status_user = 'error';
        }
      },
      error => {
        this.handleError(error);
      });
  }

  // tslint:disable-next-line:typedef
  getRoles(): void {
    this.rolesservices.getRoles().subscribe(
      response => {
          this.misroles = response.roles;
      },
      error => {
        this.handleError(error);
      }
    );
  }

  handleError(error): void {
    this.error = error.status;
  }
}
