export class Viaje{
  constructor(
public id: number,
public cliente: string,
public operador: string,
public fecha: string,
public hora: string,
// tslint:disable-next-line:variable-name
public lugar_recibido: string,
// tslint:disable-next-line:variable-name
public lugar_destino: string,
public contenido: string,
public comentarios: string,
public createdat: string,
public updatedat: string
  ){}
}
