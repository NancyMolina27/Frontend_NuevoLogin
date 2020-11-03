import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { RolesService } from './../../services/roles.service';
import { Roles } from './../../models/roles';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  providers: [UserService, RolesService]
})
export class RolesComponent implements OnInit {

public identity;
public token;
public roles: Roles;
// tslint:disable-next-line:variable-name
public status_rol;
public error: any = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userservices: UserService,
    private rolesservices: RolesService
  ) {
    this.identity = this.userservices.getIdentity();
    this.token = this.userservices.getToken();
   }

  ngOnInit(): void {
    if (this.identity == null){
      this.router.navigate(['login']);
    }else{
      // Crear rol
      this.roles = new Roles(0, '', '', null, null);
    }
  }

  onSubmit(form): void
  {

      Swal.fire({
        title: '¿Desea guardar este registro?',
        text: 'Se guardara el registro',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, guardar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
        this.rolesservices.create(this.token, this.roles).subscribe(
          respose =>
          {
            if (respose.status === 'success')
            {
              this.roles = respose.rol;
              this.status_rol = 'success';
              this.router.navigate(['roles-table']);
            }else{
              this.status_rol = 'error';
            }
          }, error => {
            Swal.fire(
              'Registro no se pudo guardar!',
              'El registro no ha sido guardado, Nombre duplicado',
              'error'
            );
            this.handleError(error);
            this.status_rol = 'error';
          }
          );
        Swal.fire(
            'Registro Guardado!',
            'El registro ha sido guardado correctamente',
            'success'
          );
        }else
        {
          Swal.fire(
            'Registro no guardado!',
            'El registro no ha sido guardado',
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
