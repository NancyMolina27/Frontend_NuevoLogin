import { UserService } from './../../services/user.service';
import { RolesService } from './../../services/roles.service';
import { Roles } from './../../models/roles';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
    if (confirm ('¿Seguro desea elimar este registro?')){
    this.rolesservices.delete(this.token, id).subscribe(
      response => {
        alert('Eliminado con éxito');
        this.getRol();
      },
      error => {
        console.log(error);
      }
    );
    }
  }

}
