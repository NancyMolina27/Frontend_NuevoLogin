import { UserService } from './../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ViajesService } from './../../services/viajes.service';
import { Component, OnInit } from '@angular/core';
import { Viaje } from 'src/app/models/viajes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viajes-table',
  templateUrl: './viajes-table.component.html',
  styleUrls: ['./viajes-table.component.css'],
  providers: [UserService, ViajesService]
})
export class ViajesTableComponent implements OnInit {
  filterRastreos = '';

  page = 1;
  public token;
  public identity;
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
    this. identity = this.userservices.getIdentity();
   }

  ngOnInit(): void {
    if (this.identity == null){
      this.router.navigate(['login']);
    }
    this.getViaje();
  }

  // tslint:disable-next-line:typedef
  getViaje()
    {
      this.viajeservices.getViajes(this.token).subscribe(
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
    Swal.fire({
      title: '¿Seguro desea elimar este registro?',
      text: 'Se eliminara el viaje',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.viajeservices.delete(this.token, id).subscribe(
          response => {
            this.getViaje();
          },
          error => {
            console.log(error as any);
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
