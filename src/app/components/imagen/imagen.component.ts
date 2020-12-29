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
    selectedFiles: FileList;
    // Es el array que contiene los items para mostrar el progreso de subida de cada archivo
    progressInfo = [];
    // Mensaje que almacena la respuesta de las Apis
    message = '';
    // Nombre del archivo para usarlo posteriormente en la vista html
    fileName = '';
    fileInfos: Observable<any>;

  ngOnInit(): void {
    this.fileInfos = this.uploadFilesService.getFiles();
  }

  selectFiles(event): any  {
    this.progressInfo = [];
    // Validación para obtener el nombre del archivo si es uno solo
    // En caso de que sea >1 asigna a fileName length
    event.target.files.length === 1 ? this.fileName = event.target.files[0].name : this.fileName = event.target.files.length + ' archivos';
    this.selectedFiles = event.target.files;
  }

  // tslint:disable-next-line:typedef
  uploadFiles() {
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

  // tslint:disable-next-line:typedef
  upload(index, file) {
    this.progressInfo[index] = { value: 0, fileName: file.name };

    this.uploadFilesService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfo[index].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.uploadFilesService.getFiles();
        }
      },
      err => {
        this.progressInfo[index].value = 0;
        this.message = 'No se puede subir el archivo ' + file.name;
      });
  }

  // tslint:disable-next-line:typedef
  deleteFile(filename: string) {
    this.uploadFilesService.deleteFile(filename).subscribe(res => {
      this.message = res.message;
      this.fileInfos = this.uploadFilesService.getFiles();
    });
  }
}
