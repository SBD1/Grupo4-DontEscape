export interface Npc {
    idNpc: number,
    nome: String,
    comodo: number,
    ajudaEmTempo: number,
    falaInicial: number,
    falaAjuda: number,
    falaAtrapalha?: number,
    itemBloqueado?: number,
}