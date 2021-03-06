import { Roles } from './../../models/roles';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
  providers: [UserService]
})
export class UsersTableComponent implements OnInit {
filterUsers = '';
page = 1;
public usuarios: Array<User>;
public token;
public identity;
// tslint:disable-next-line:variable-name
public status_user;
public userrol: Array<Roles>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userservices: UserService
  ) {
    this.token = this.userservices.getToken();
    this.identity = this.userservices.getIdentity();
   }

  ngOnInit(): void {
    this.getUsers();

    if (this.identity == null){
      this.router.navigate(['login']);
    }
  }

  // tslint:disable-next-line:typedef
  getUsers(){
    this.userservices.getUsers().subscribe(
      response => {
        if (response.status === 'success')
        {
          this.usuarios = response.users;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  deleteUsuarios(id): void
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
        this.userservices.delete(this.token, id).subscribe(
          response => {
            this.getUsers();
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
