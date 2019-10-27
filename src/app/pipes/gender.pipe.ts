import { Pipe, PipeTransform } from '@angular/core';

import { Gender } from '../interfaces/student';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: any): any {
    return Gender[value];
  }

}
