import { ViajesService } from './../../services/viajes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from './../../services/roles.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Viaje } from 'src/app/models/viajes';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css'],
  providers: [UserService, RolesService, ViajesService]
})
export class ViajesComponent implements OnInit {
  public identity;
  public token;
  public viaje: Viaje;
  public misuser: Array<User>;
  public user: Array<User>;
  // tslint:disable-next-line:variable-name
  public status_viaje;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userservices: UserService,
    private viajesservices: ViajesService
  ) {
    this.identity = this.userservices.getIdentity();
    this.token = this.userservices.getToken();
    }

  ngOnInit(): void {
    if (this.identity == null){
      this.router.navigate(['login']);
    }else{

    this.getClientes();
    this.getOperador();

      // Crear viaje
    this.viaje = new Viaje(0, '', '', '', '', '', '', '', '', null, null);
    }
  }

  onSubmit(form): void
  {
    this.viajesservices.create(this.token, this.viaje).subscribe(
      response =>
      {
        if (response.status === 'success')
        {
          this.viaje = response.viaje;
          this.status_viaje = 'success';
          this.router.navigate(['viajes-table']);
        }else{
          this.status_viaje = 'error';
        }
      },
      error => {
        console.log (error as any);
        this.status_viaje = 'error';
      }
    );
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
