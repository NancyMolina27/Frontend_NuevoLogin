import { GLOBAL } from './global';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  // Url obtenida de la variable de enviroments
  url = GLOBAL.url;


  // Inyeccion de HttpClient
  constructor(
    public http: HttpClient
  ) {
    this.url = GLOBAL.url;
    }

  // Metodo que envia los archivos al endpoint /upload
  upload(file: File): Observable <HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('files', file);

    const req = new HttpRequest('POST', `${this.url}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  // Metodo para Obtener los archivos
  getFiles(): any {
    return this.http.get(`${this.url}/files`);
  }

  // Metodo para borrar los archivos
  deleteFile(filename: string): any{
    return this.http.get(`${this.url}/delete/${filename}`);
  }



}
