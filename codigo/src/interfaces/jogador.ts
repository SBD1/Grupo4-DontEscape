export interface Jogador {
    idJogador: Number,
    nome: String,
    partida: Number,
    comodo: Number,
    situacao: ('normal' | 'fraco' | 'critico'),
}