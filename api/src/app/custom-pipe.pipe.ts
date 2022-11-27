import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objJson'
})
export class ObjJsonPipe implements PipeTransform {

  transform(objects: any = []) {
    return JSON.parse(JSON.stringify(objects));
  }
}
