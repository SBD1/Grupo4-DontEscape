import Postgree from "../api/index.js";
import Auth from "../model/Auth.js";
import Console from "./Console.js";
import { procurarInimigo, inspecionaComodo, procurarNpc, mudaComodo, abrirMapa } from "./GameActions.js";
import PromptSync from "prompt-sync";
import chalk from "chalk";
const input = PromptSync({ sigint: true });
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function Main() {
    const playerComodoInicial = 7;
    await Console.consoleName(sleep);
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
    await Console.consoleStart(sleep);
    let comodoJogador = await pg.getComodo(jogador);
    let interaveis = await pg.getInteraveis(jogador);
    let estados = [];
    for (let i = 0; i < interaveis.length; i++) {
        estados[i] = await pg.getEstado(interaveis[i].estadoatual);
    }
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
        jogador = await pg.getLogin(jogador.nome);
        comodoJogador = await pg.getComodo(jogador);
        console.log(chalk.yellow(`Você está no cômodo : ${comodoJogador.nome}`));
        Console.consoleMenu(comodoJogador);
        acao = Number(input(""));
    }
    console.log("Fim do jogo");
}
await Main();
