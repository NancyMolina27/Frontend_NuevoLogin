import { GLOBAL } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Viaje } from '../models/viajes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {
  public url: string;
  constructor(public http: HttpClient
    ) {
      this.url = GLOBAL.url;
      }
  // tslint:disable-next-line:typedef
  pruebas()
      {
        return 'hola mundo';
      }
  create(Token, viajes: Viaje): Observable<any> {
        const json = JSON.stringify(viajes);
        const params = 'json=' + json;
        const headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                          .set('Authorization', Token);
        return this.http.post(this.url + 'viajes', params, {headers});
      }

  getViajes(Token): Observable<any>
  {
    const headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                          .set('Authorization', Token);
   /*  const headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); */
    return this.http.get(this.url + 'viajes', {headers});
  }

  getViaje(id): Observable<any>
  {
    return this.http.get(this.url + 'viajes/' + id);
  }
  update(token, viaje, id): Observable<any>
  {
    const json = JSON.stringify(viaje);
    const params = 'json=' + json;
    const headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this.http.put(this.url + 'viajes/' + id, params, {headers});
  }
  delete(token, id): Observable <any>
  {
    const headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this.http.delete(this.url + 'viajes/' + id, {headers});
  }

  buscar(id): Observable<any>
  {
    return this.http.get(this.url + 'viajes/' + id);
  }

}
