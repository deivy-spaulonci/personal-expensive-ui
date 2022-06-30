
import { FormaPagamento } from "./forma-pagamento";
import { LancamentoContaCartao } from "./lancamento-conta-cartao";
import { TipoConta } from "./tipo-conta";

export interface Conta {
    id:number;
    numero:string;
    codigoBarra:string;
    tipoConta:TipoConta;
    emissao:string;
    vencimento:string;
    parcela:number;
    totalParcela:number;
    valor:number;
    dataPagamento:string;
    formaPagamento:FormaPagamento;
    valorPago:number;
    cancelado:boolean;
    idCancelamento:number;
    obs:string;
    lancamentoContaCartao:LancamentoContaCartao[];
    status:string;
}
