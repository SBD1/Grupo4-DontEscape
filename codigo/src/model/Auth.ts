import Postgree from "../api/index";
import { Jogador } from "../interfaces/jogador";
import { Partida } from "../interfaces/partida";
import Console from "../view/Console";

class Auth {

    public static async login(input: any, pg: Postgree): Promise<Jogador> {
        let nomeJogador: string;

        while (true) {
            nomeJogador = String(input("Digite seu nome: "));

            const jogador: Jogador = await pg.getLogin(nomeJogador);

            if (jogador)
                return jogador;
            else
                console.log("Jogador não encontrado, Tem certeza que digitou seu nome corretamente?");
        }
    }

    public static async register(input: any, pg: Postgree): Promise<Jogador> {
        let dificuldade: number, comodoInicial: number = 7;
        let nomeJogador: string;


        while (true) {
            nomeJogador = String(input("Digite seu nome: "));

            const niveisPartida: Partida[] = await pg.getPartidas();

            dificuldade = Number(input(Console.consoleListPartidas(niveisPartida)));
            try {
                if (dificuldade <= niveisPartida.length) {
                    await pg.postRegister(nomeJogador, dificuldade, comodoInicial);
                    console.log("Jogador criado com sucesso");
                    return await pg.getLogin(nomeJogador);
                }
                else (dificuldade > niveisPartida.length)
                console.log("Dificuldade inválida, tente novamente!")
            }
            catch (err: any) {
                console.log("Nome já cadastrado, insira outro!")
            }
        }
    }

}

export default Auth;