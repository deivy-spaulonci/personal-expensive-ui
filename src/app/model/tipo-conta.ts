import { ContaStatus } from "./conta-status";

export interface TipoConta {
    id:number;
    nome:string;
    contaCartao:boolean;
    contaStatus:ContaStatus;
}
