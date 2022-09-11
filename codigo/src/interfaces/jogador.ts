export interface Jogador {
    idjogador: number,
    nome: string,
    partida: number,
    comodo: number,
    situacao: ('normal' | 'fraco' | 'critico'),
}