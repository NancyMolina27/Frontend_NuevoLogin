import { Observable } from 'rxjs';
import { Roles } from './../models/roles';
import { GLOBAL } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
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

  create(Token, rol: Roles): Observable<any> {
    const json = JSON.stringify(rol);
    const params = 'json=' + json;

    const headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                      .set('Authorization', Token);

    return this.http.post(this.url + 'roles', params, {headers});
  }

  getRoles(): Observable<any>
  {
    const headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url + 'roles', {headers});
  }
  getRole(id): Observable<any>
  {
    return this.http.get(this.url + 'roles/' + id);
  }

  update(token, rol, id): Observable<any>
  {
    const json = JSON.stringify(rol);
    const params = 'json=' + json;
    const headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);

    return this.http.put(this.url + 'roles/' + id, params, {headers});
  }

  delete(token, id): Observable <any>
  {
    const headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);

    return this.http.delete(this.url + 'roles/' + id, {headers});
  }




}
