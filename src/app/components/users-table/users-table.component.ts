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
// tslint:disable-next-line:variable-name
public status_user;
public misuser: Array<User>;
public user: Array<User>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userservices: UserService
  ) {
    this.token = this.userservices.getToken();
   }

  ngOnInit(): void {
    this.getUsers();
    this.getClientes();
    this.getOperador();
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
    if (confirm ('¿Seguro desea elimar este registro?')){
    this.userservices.delete(this.token, id).subscribe(
      response => {
        alert('Eliminado con éxito');
        this.getUsers();
      },
      error => {
        console.log(error);
      }
    );
    }
  }

  getClientes(): void {
    this.userservices.getClientes().subscribe(
      response => {
          this.misuser = response.users;
      },
      error => {
        console.log(error);
      }
    );
  }
  getOperador(): void {
    this.userservices.getOperador().subscribe(
      response => {
          this.user = response.users;
      },
      error => {
        console.log(error);
      }
    );
  }

}
