import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRastreo'
})
export class FilterRastreoPipe implements PipeTransform {

  transform(value: any = [], arg: any, id: any ): any
  {
    if (arg === '' || arg.length < 1) { return value; }
    const resultRastreo = [];
    for (const post of value)
      {
        // Busqueda por id
        post.id = post.id.toString();
        if (post.id.indexOf(arg) > -1)
        {
          resultRastreo.push(post);
        }

        // Busqueda por user_id
        post.user_id = post.user_id.toString();
        if (post.user_id.indexOf(id) > -1)
        {
          resultRastreo.push(post);
        } else
        {
          // Busqueda por cliente
          if (post.cliente.toLowerCase().indexOf(arg.toLowerCase()) > -1)
          {
            resultRastreo.push(post);
          }
        }
          // Busqueda por operador
        if (post.operador.toLowerCase().indexOf(arg.toLowerCase()) > -1)
        {
          resultRastreo.push(post);
        }
        // Busqueda por fecha
        if (post.fecha.toLowerCase().indexOf(arg.toLowerCase()) > -1)
        {
          resultRastreo.push(post);
        }
        // Busqueda por hora
        if (post.hora.toLowerCase().indexOf(arg.toLowerCase()) > -1)
        {
          resultRastreo.push(post);
        }
        // Busqueda por origen
        if (post.lugar_recibido.toLowerCase().indexOf(arg.toLowerCase()) > -1)
        {
          resultRastreo.push(post);
        }
        // Busqueda por destino
        if (post.lugar_destino.toLowerCase().indexOf(arg.toLowerCase()) > -1)
        {
          resultRastreo.push(post);
        }
        // Busqueda por contenido
        if (post.contenido.toLowerCase().indexOf(arg.toLowerCase()) > -1)
        {
          resultRastreo.push(post);
        }

      }
    return resultRastreo;
  }

}
