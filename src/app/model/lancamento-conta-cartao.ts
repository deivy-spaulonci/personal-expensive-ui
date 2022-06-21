import { Fornecedor } from "./fornecedor";

export interface LancamentoContaCartao {
    id:number;
    data:string;
    fornecedor:Fornecedor;
    valor:number;
    parcela:number;
    totalParcela:number;
}
