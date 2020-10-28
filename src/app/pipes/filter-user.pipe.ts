import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {

  transform(value: any = [], arg: any): any
  {
    if (arg === '' || arg.length < 1) { return value; }
    const resultUser = [];
    for (const post of value)
      {
        if (post.email.toLowerCase().indexOf(arg.toLowerCase()) > -1)
        {
          resultUser.push(post);
        }

      }
    return resultUser;
  }

}
