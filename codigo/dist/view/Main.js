import Postgree from "../api/index.js";
import Auth from "../model/Auth.js";
import Console from "./Console.js";
import { procurarInimigo, inspecionaComodo, procurarNpc, mudaComodo, abrirMapa, finalizarPartida } from "./GameActions.js";
import PromptSync from "prompt-sync";
import chalk from "chalk";
const input = PromptSync({ sigint: true });
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function Main() {
    const playerComodoInicial = 7;
    let jogador = {
        idjogador: 6,
        nome: '',
        comodo: 11,
        partida: 2,
        situacao: 'normal'
    };
    const pg = new Postgree();
    let possuiConta = input("Você já possui uma conta? (s/n) ");
    if (possuiConta.toLowerCase() == 's' || possuiConta.toLowerCase() == 'sim')
        jogador = await Auth.login(input, pg);
    else
        jogador = await Auth.register(input, pg);
    let partida = await pg.getPartidaJogador(jogador.idjogador);
    let comodoJogador = await pg.getComodo(jogador);
    let interaveis = await pg.getInteraveis(jogador);
    let estados = [];
    for (let i = 0; i < interaveis.length; i++) {
        estados[i] = await pg.getEstado(interaveis[i].estadoatual);
    }
    let horas = Math.floor(partida.tempototal / 60);
    let min = partida.tempototal % 60;
    console.log(chalk.red(`\nTempo restante: ${horas}h e ${min}min\n`));
    console.log(chalk.yellow(`Você está no cômodo : ${comodoJogador.nome}`));
    Console.consoleInteraveis(estados);
    Console.consoleMenu(comodoJogador);
    let acao = Number(input(""));
    while (acao != 0) {
        if (acao == 1)
            await inspecionaComodo(pg, jogador, input);
        else if (acao == 2) {
            console.log("Iteragir com item");
        }
        else if (acao == 3) {
            let inventario = await pg.getInventarioJogador(5);
            Console.consoleInventario(inventario);
        }
        else if (acao == 4)
            await mudaComodo(pg, jogador, acao);
        else if (acao == 5)
            await mudaComodo(pg, jogador, acao);
        else if (acao == 6)
            await mudaComodo(pg, jogador, acao);
        else if (acao == 7)
            await abrirMapa(pg, jogador, input);
        else if (acao == 8)
            await procurarInimigo(pg, jogador, input);
        else if (acao == 9)
            await procurarNpc(pg, jogador, input);
        else if (acao == 10) {
            const horas = Math.floor(partida.tempototal / 60);
            const min = partida.tempototal % 60;
            console.log(`Você ainda tem ${horas}h e ${min}min. \nTem certeza que deseja terminar a preparação e esperar pela horda? (s/n)`);
            let confirmação = input("");
            if (confirmação.toLowerCase() == 's' || confirmação.toLowerCase() == 'sim') {
                await finalizarPartida(pg, jogador);
                break;
            }
        }
        jogador = await pg.getLogin(jogador.nome);
        comodoJogador = await pg.getComodo(jogador);
        horas = Math.floor(partida.tempototal / 60);
        min = partida.tempototal % 60;
        console.log(chalk.redBright(`\nTempo restante: ${horas}h e ${min}min\n`));
        console.log(chalk.yellow(`Você está no cômodo : ${comodoJogador.nome}`));
        Console.consoleMenu(comodoJogador);
        acao = Number(input(""));
    }
}
await Main();
