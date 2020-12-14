import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { Viaje } from './../../models/viajes';
import { ViajesService } from './../../services/viajes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/users';


import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';

@Component({
  selector: 'app-rastreoforms',
  templateUrl: './rastreoforms.component.html',
  styleUrls: ['./rastreoforms.component.css']
})
export class RastreoformsComponent implements OnInit {
  public identity;
  public viaje: Viaje;
  public token;
  // tslint:disable-next-line:variable-name
  public status_viaje;
  public misuser: Array<User>;
  public user: Array<User>;

  color: ThemePalette = 'accent';
  mode: ProgressBarMode = 'buffer';
  value = 0;
  bufferValue = 0;

  // tslint:disable-next-line:typedef
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000);
    }
    return value;
  }

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
          this.viaje = response.viaje;
        }
        else
        {
          this.router.navigate(['home']);
        }
      },
      error => { console.log(error); }
      );
    }

    onSubmit(form): void
  {
    // Servicio
    this.viajesservices.update(this.token, this.viaje, this.viaje.id).subscribe(
      response =>
      {
        if (response.status === 'success'){
          this.status_viaje = 'success';
          this.viaje = response.viaje;
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

}
