import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { RolesService } from './../../services/roles.service';
import { Roles } from './../../models/roles';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rolesedit',
  templateUrl: '../roles/roles.component.html',
  styleUrls: ['./rolesedit.component.css'],
  providers: [UserService, RolesService]
})
export class RoleseditComponent implements OnInit {

  public roles: Roles;
  public token;
  // tslint:disable-next-line:variable-name
  public status_rol;
  public error: any = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userservices: UserService,
    private rolesservices: RolesService
    ) {
      this.token = this.userservices.getToken();
     }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params.id;
      this.getRol(id);
  });
  }

  // tslint:disable-next-line:typedef
  getRol(id)
  {
      this.rolesservices.getRole(id).subscribe(
        response => {
          if (response.status === 'success'){
            this.roles = response.roles;
          }
          else
          {
            this.router.navigate(['home']);
          }
        },
        error => { console.log(error); }
      );
  }

  // tslint:disable-next-line:typedef
  onSubmit(form)
  {
    Swal.fire({
      title: '¿Desea editar este registro?',
      text: 'Se editara el registro',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, editar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolesservices.update(this.token, this.roles, this.roles.id).subscribe(
          response =>
          {
            if (response.status === 'success'){
              this.status_rol = 'success';
              this.roles = response.roles;
              this.router.navigate(['roles-table']);
            }
            else
            {
              this.handleError(this.error);
              this.status_rol = 'error';
              this.router.navigate(['home']);
            }
          },
          error =>
          {
            Swal.fire(
              'Registro no se pudo editar!',
              'El registro no ha sido editado, Nombre duplicado',
              'error'
            );
            this.handleError(error);
            this.status_rol = 'error';
          }
        );
        Swal.fire(
          'Registro editado!',
          'El registro ha sido editado correctamente',
          'success'
        );
      }
      else
        {
          Swal.fire(
            'Registro no editado!',
            'El registro no ha sido editado',
            'error'
          );
        }
    });

  }

  handleError(error): void
  {
    this.error = error.error.errors;

  }

}
