import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numeroFormateado'
})
export class NumeroFormateadoPipe implements PipeTransform {
  transform(value: string): string {
    const numero = parseFloat(value);
    return numero.toLocaleString();
  }
}
