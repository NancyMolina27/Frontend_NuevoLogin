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
        this.rolesservices.create(this.token, this.roles).subscribe(
          respose =>
          {
            if (respose.status === 'success')
            {
              this.roles = respose.rol;
              this.status_rol = 'success';
              this.router.navigate(['roles-table']);
            }else{
              Swal.fire(
                'Registro no se pudo guardar!',
                'El registro no ha sido guardado, nombre duplicado',
                'error');
              this.status_rol = 'error';
            }
          }, error => {
            Swal.fire(
              'Registro no se pudo guardar!',
              'El registro no ha sido guardado, nombre duplicado',
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
        }
  handleError(error): void
  {
    this.error = error.error.ERROR;
    console.log(this.error);
  }

}
