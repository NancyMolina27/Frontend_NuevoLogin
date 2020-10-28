import { HttpClient, HttpHeaders } from '@angular/common/http';

import { GLOBAL } from './global';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string;
  public identity;
  public token;
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

  // tslint:disable-next-line:typedef
  register(user): Observable<any>
  {
    const json = JSON.stringify(user);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.url + 'register', params, {headers});
  }

  signup(user, getToken = null): Observable<any>
  {
    if (getToken != null) {
      user.getToken = 'true';
    }

    const json = JSON.stringify(user);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.url + 'login', params, {headers});
  }

  // tslint:disable-next-line:typedef
  getIdentity()
  {
    const identity = JSON.parse(localStorage.getItem('identity'));
    if (identity !== 'undefined')
    {
      this.identity = identity;
    }else {
      this.identity = null;
    }
    return this.identity;

  }

  // tslint:disable-next-line:typedef
  getToken()
  {
    const token = localStorage.getItem('token');
    if (token !== 'undefined'){
      this.token = token;

    }else{
      this.token = null;

    }
    return this.token;
  }

  getUsers(): Observable<any>
  {
    const headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url + 'usuarios', {headers});
  }

  getUser(id): Observable<any>
  {
    return this.http.get(this.url + 'usuarios/' + id);
  }
  update(token, viaje, id): Observable<any>
  {
    const json = JSON.stringify(viaje);
    const params = 'json=' + json;
    const headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this.http.put(this.url + 'usuarios/' + id, params, {headers});
  }
  delete(token, id): Observable <any>
  {
    const headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', token);
    return this.http.delete(this.url + 'usuarios/' + id, {headers});
  }

  getClientes(): Observable<any>
  {
    const headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url + 'clientes', {headers});
  }

  getOperador(): Observable<any>
  {
    const headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.url + 'operador', {headers});
  }

  sendEmail(data): Observable <any>
  {
    return this.http.post(this.url + 'reset-password', data);
  }

  changePassword(data): Observable <any>
  {
    return this.http.post(this.url + 'cambiar-contraseña', data);
  }

}
