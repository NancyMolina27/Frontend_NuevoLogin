import { UserService } from './../../services/user.service';
import { RolesService } from './../../services/roles.service';
import { Roles } from './../../models/roles';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles-table',
  templateUrl: './roles-table.component.html',
  styleUrls: ['./roles-table.component.css'],
  providers: [UserService, RolesService]
})
export class RolesTableComponent implements OnInit {
  filterRole = '';
  page = 1;
  public identity;
  public token;
  public misroles: Array<Roles>;
  // tslint:disable-next-line:variable-name
  public status_rol;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rolesservices: RolesService,
    private userservices: UserService)
    {
     this.token = this.userservices.getToken();
    }

  ngOnInit(): void {
    this.getRol();
  }

  // tslint:disable-next-line:typedef
  getRol(){
    this.rolesservices.getRoles().subscribe(
      response => {
        if (response.status === 'success')
        {
          this.misroles = response.roles;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  // tslint:disable-next-line:typedef
  deleteRol(id)
  {
    Swal.fire({
      title: 'Eliminar registro',
      text: '¿Seguro desea elimar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolesservices.delete(this.token, id).subscribe(
          response => {
            this.getRol();
          },
          error => {
            console.log(error);
          }
        );
        Swal.fire(
          'Eliminado!',
          'El registro ha sido eliminado correctamente',
          'success'
        );
      }else
      {
        Swal.fire(
          'Registro no eliminado!',
          'El registro no ha sido eliminado',
          'error'
        );
      }
    });

  }
}
