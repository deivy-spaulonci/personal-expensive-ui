import { identifierName } from "@angular/compiler";

export class Util {
      // dataBRtoDataIso(data: String){
      //   const dataarr  = data.toString().split('/');
      //   return dataarr[2] + '-' + dataarr[1] + '-' + dataarr[0]
      // }
    
      // dateToDataBR(data: String){
      //   const dataarr  = data.toString().split('-');
        
        
      // }

      transformDates(data:String){
        if(data){
          if(data.indexOf("-") == -1){//data br            
            const dataarr  = data.toString().split('/');
            return dataarr[2] + '-' + dataarr[1] + '-' + dataarr[0]
          }else{
            const dataarr  = data.toString().split('-');
            return dataarr[0] + '-' + dataarr[1] + '-' + dataarr[2]
          }
        }
        return '';
      }
    
      formatFloatToReal(valor: string): string{
        var v = valor.replace(/\D/g, '');
        v = (Number(v) / 100).toFixed(2) + '';
        v = v.replace('.', ',');
        v = v.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
        v = v.replace(/(\d)(\d{3}),/g, '$1.$2,');
        return v.toString();
      }
    
      formatMoedaToFloat(valor: string): number{
        return Number(valor.replace('.', '').replace(',', '.'));
      }
    
      capitalize(textin: string): string{
        if(textin){
          return textin.toLowerCase().replace(/\b[a-z](?=[a-z]{2})/g,
            function(letter) {
              return letter.toUpperCase();
            });
        }else{
          return '';
        }
      }
}
