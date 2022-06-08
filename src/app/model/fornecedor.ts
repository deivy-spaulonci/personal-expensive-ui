import { Cidade } from "./cidade";

export interface Fornecedor {
    id:number;
    nome:string;
    razaoSocial:string;
    cnpj:string;
    inscricaoEstadual:string;
    endereco:string;
    bairro:string;
    complemento:string;
    cep:string;
    telefone:string;
    cidade:Cidade;
}
