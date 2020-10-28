import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRoles'
})
export class FilterRolesPipe implements PipeTransform {

  transform(value: any = [], arg: any): any
  {
    if (arg === '' || arg.length < 1) { return value; }
    const resultRoles = [];
    for (const post of value)
      {
        if (post.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1)
        {
          resultRoles.push(post);
        }

      }
    return resultRoles;
  }

}
