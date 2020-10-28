import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { Viaje } from './../../models/viajes';
import { ViajesService } from './../../services/viajes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-viajes-edit',
  templateUrl: '../viajes/viajes.component.html',
  styleUrls: ['./viajes-edit.component.css'],
  providers: [UserService, ViajesService]
})
export class ViajesEditComponent implements OnInit {
  public identity;
  public viaje: Viaje;
  public token;
  // tslint:disable-next-line:variable-name
  public status_viaje;
  public misuser: Array<User>;
  public user: Array<User>;
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
    this.getClientes();
    this.getOperador();

    if (this.identity == null){
      this.router.navigate(['login']);
    }else{

    this.route.params.subscribe(params => {
      const id = +params.id;
      this.getViaje(id);
  });
    }
  }

    // tslint:disable-next-line:typedef
  getViaje(id)
  {
    this.viajesservices.getViaje(id).subscribe(
      response => {
        if (response.status === 'success'){
          this.viaje = response.viajes;
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
    // Servicio
    this.viajesservices.update(this.token, this.viaje, this.viaje.id).subscribe(
      response =>
      {
        if (response.status === 'success'){
          this.status_viaje = 'success';
          this.viaje = response.viajes;
          this.router.navigate(['viajes-table']);
        }
        else
        {
          this.status_viaje = 'error';
          this.router.navigate(['home']);
        }
      },
      error =>
      {
        console.log(error);
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
