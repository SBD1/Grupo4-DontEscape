export interface Item {
    iditem: Number,
    nome: String,
    descricao: String,
    comodo: Number,
    tipo?: ('coletavel'| 'interavel'),
}