export interface Jogador {
    idjogador: number,
    nome: String,
    partida: number,
    comodo: number,
    situacao: ('normal' | 'fraco' | 'critico'),
}