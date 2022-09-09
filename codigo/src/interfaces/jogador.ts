export interface Jogador {
    idjogador: Number,
    nome: String,
    partida: Number,
    comodo: Number,
    situacao: ('normal' | 'fraco' | 'critico'),
}