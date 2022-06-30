export class Util {

      ajustCurrencyForBase(valor:any){
        if(valor.toString().indexOf(',') != -1){
          valor = this.formatMoedaToFloat(valor);
        }else if(valor.toString().indexOf('.') != -1){
          valor = valor;
        }else{
          valor = valor/100;
        }
        return valor;
      }

      transformDataBrToUs(data:string):string{
        const dataarr  = data.toString().split('/');
        return dataarr[2] + '-' + dataarr[1] + '-' + dataarr[0];
      }

      transformDateToDataBr(data:string):string{
        const dataarr  = data.toString().split('-');
        return dataarr[2] + '/' + dataarr[1] + '/' + dataarr[0];
      }

      transformDates(data:String){
        if(data){
          if(data.indexOf("-") == -1){//data br            
            return this.transformDataBrToUs(data.toString());
          }else{
            return this.transformDateToDataBr(data.toString());
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
