import { UserService } from './../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ViajesService } from './../../services/viajes.service';
import { Component, OnInit } from '@angular/core';
import { Viaje } from 'src/app/models/viajes';

@Component({
  selector: 'app-viajes-table',
  templateUrl: './viajes-table.component.html',
  styleUrls: ['./viajes-table.component.css'],
  providers: [UserService, ViajesService]
})
export class ViajesTableComponent implements OnInit {
  page = 1;
  public token;
  public viaje: Viaje;
  // tslint:disable-next-line:variable-name
  public status_viaje;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viajeservices: ViajesService,
    private userservices: UserService
  ) {
    this.token = this.userservices.getToken();
   }

  ngOnInit(): void {
    this.getViaje();
  }

  // tslint:disable-next-line:typedef
  getViaje()
    {
      this.viajeservices.getViajes().subscribe(
        response => {
          if (response.status === 'success')
          {
            this.viaje = response.viaje;
          }
        },
        error => {
          console.log(error);
        }
      );
    }

  // tslint:disable-next-line:typedef
  deleteViaje(id)
  {
    if (confirm ('¿Seguro desea elimar este registro?')){
    this.viajeservices.delete(this.token, id).subscribe(
      response => {
        alert('Eliminado con éxito');
        this.getViaje();
      },
      error => {
        console.log(error as any);
      }
    );
    }
  }

}
