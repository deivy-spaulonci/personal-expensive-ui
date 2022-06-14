import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone'
})
export class TelefonePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): any {

    if (value) {
      const tel = value.replace(/\D/g, '');

      let foneFormatado = '';

      if (tel.length > 12) {
        foneFormatado = tel.replace(/(\d{2})?(\d{2})?(\d{5})?(\d{4})/, '+$1 ($2) $3-$4');

      } else if (tel.length > 11) {
        foneFormatado = tel.replace(/(\d{2})?(\d{2})?(\d{4})?(\d{4})/, '+$1 ($2) $3-$4');

      } else if (tel.length > 10) {
        foneFormatado = tel.replace(/(\d{2})?(\d{5})?(\d{4})/, '($1) $2-$3');

      } else if (tel.length > 9) {
        foneFormatado = tel.replace(/(\d{2})?(\d{4})?(\d{4})/, '($1) $2-$3');

      } else if (tel.length > 5) {
        foneFormatado = tel.replace(/^(\d{2})?(\d{4})?(\d{0,4})/, '($1) $2-$3');

      } else if (tel.length > 1) {
        foneFormatado = tel.replace(/^(\d{2})?(\d{0,5})/, '($1) $2');      } else {
        if (tel !== '') { foneFormatado = tel.replace(/^(\d*)/, '($1'); }
      }
      return foneFormatado;
    }
  }

}
