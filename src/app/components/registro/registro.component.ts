import { Roles } from './../../models/roles';
import { RolesService } from './../../services/roles.service';
import { User } from './../../models/users';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [UserService]
})
export class RegistroComponent implements OnInit {
  public identity;
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
    this.identity = this.userServices.getIdentity();
    this.getRoles();
    this.user = new User( 1, '', '', '', '', '', '', '');
  }

  ngOnInit(): void {
    if (this.identity == null){
      this.router.navigate(['login']);
    }
  }

  onSubmit(registerForm): void
  {
    this.userServices.register(this.user).subscribe(
      response => {
        if (response.status === 'success')
        {
          this.status_user = response.status;
          // Vaciar formulario
          this.user = new User( 1, '', '', '', '', '', '', '');
          registerForm.reset();
          Swal.fire(
            'Registro Guardado!',
            'El registro ha sido guardado correctamente',
            'success'
          );
          this.router.navigate(['usuarios-table']);
        }else
        {
          Swal.fire(
            'Registro no se pudo guardar!',
            'El registro no ha sido guardado, verifica tus datos',
            'error'
          );
          this.status_user = 'error';
        }
      },
      error => {
        Swal.fire(
          'Registro no se pudo guardar!',
          'El registro no ha sido guardado',
          'error'
        );
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
        console.log(error);
        this.handleError(error);
      }
    );
  }

  handleError(error): void {
    this.error = error.error.errors;
  }
}
