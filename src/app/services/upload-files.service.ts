import { Imagen } from './../models/imagen';
import { GLOBAL } from './global';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {
  public url: string;
  constructor(
     public http: HttpClient
    ) {
      this.url = GLOBAL.url;
    }
    // tslint:disable-next-line:typedef
    pruebas()
  {
    return 'hola mundo';
  }

  create(Token, imagen: Imagen): Observable<any> {
    const json = JSON.stringify(imagen);
    const params = 'json=' + json;

    const headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                      .set('Authorization', Token);

    return this.http.post(this.url + 'imagen', params, {headers});
  }

  getImagenes(): Observable<any>
  {
    const headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url + 'imagen', {headers});
  }

  getImagen(id): Observable<any>
  {
    return this.http.get(this.url + 'imagen/' + id);
  }

  update(token, imagen, id): Observable<any>
  {
    const json = JSON.stringify(imagen);
    const params = 'json=' + json;
    const headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);

    return this.http.put(this.url + 'imagen/' + id, params, {headers});
  }

  delete(token, id): Observable <any>
  {
    const headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);

    return this.http.delete(this.url + 'imagen/' + id, {headers});
  }


}
