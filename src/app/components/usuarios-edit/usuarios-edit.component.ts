import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { RolesService } from './../../services/roles.service';
import { Roles } from './../../models/roles';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.css'],
  providers: [UserService, RolesService]
})
export class UsuariosEditComponent implements OnInit {
  public user: User;
  public token;
  public misroles: Array<Roles>;
  // tslint:disable-next-line:variable-name
  public status_user;
  public error: any = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userservices: UserService,
    private rolesservices: RolesService

  ) {this.token = this.userservices.getToken();
     this.getRoles();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params.id;
      this.getUser(id);
  });
  }

  // tslint:disable-next-line:typedef
  getUser(id)
  {
      this.userservices.getUser(id).subscribe(
        response => {
          if (response.status === 'success'){
            this.user = response.users;
          }
          else
          {
            this.router.navigate(['home']);
          }
        },
        error => { console.log(error); }
      );
  }
  onSubmit(form): void
  {
    // Servicio
    this.userservices.update(this.token, this.user, this.user.id).subscribe(
      response =>
      {
        if (response.status === 'success'){
          this.status_user = 'success';
          this.user = response.users;
          this.router.navigate(['usuarios-table']);

        }
        else
        {
          this.status_user = 'error';
          this.router.navigate(['home']);
        }
      },
      error =>
      {
        this.handleError(error);
        this.status_user = 'error';
      }
    );
  }

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
    this.error = error.error.errors;
  }
}
