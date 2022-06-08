import { FormaPagamento } from "./forma-pagamento";
import { Fornecedor } from "./fornecedor";
import { InformacaoExtra } from "./informacao-extra";
import { TipoDespesa } from "./tipo-despesa";

export interface Despesa {
    id:number;
    tipoDespesa:TipoDespesa;
    fornecedor:Fornecedor;
    data:Date;
    formaPagamento:FormaPagamento;
    valor:number;
    obs:string;
    informacaoExtra:InformacaoExtra;
}
