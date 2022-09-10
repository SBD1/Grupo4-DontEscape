export interface Item {
    iditem: number,
    nome: String,
    descricao: String,
    comodo: number,
    tipo: ('coletavel' | 'interavel'),
}