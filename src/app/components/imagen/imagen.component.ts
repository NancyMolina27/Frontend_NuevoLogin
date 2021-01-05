import { Component, OnInit } from '@angular/core';
import { UploadFilesService } from '../../services/upload-files.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.css']
})
export class ImagenComponent implements OnInit {

  constructor(private uploadFilesService: UploadFilesService) { }

    // Lista de archivos seleccionados
    // Es el array que contiene los items para mostrar el progreso de subida de cada archivo
    progressInfo = [];
    // Mensaje que almacena la respuesta de las Apis
    message = '';
    // Nombre del archivo para usarlo posteriormente en la vista html
    fileName = '';
    fileInfos: Observable<any>;

  ngOnInit(): void {

  }



}
