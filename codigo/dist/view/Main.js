import Postgree from "../api/index.js";
import Auth from "../model/Auth.js";
import Console from "./Console.js";
import { procurarInimigo, inspecionaComodo, procurarNpc, mudaComodo, abrirMapa } from "./GameActions.js";
import PromptSync from "prompt-sync";
import chalk from "chalk";
import ChalkAnimation from "chalk-animation";
const input = PromptSync({ sigint: true });
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function Main() {
    const playerComodoInicial = 7;
    const t1 = chalk.red.bold(`
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------
    ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------- DON´T ESCAPE --------------------------------------------------------------------------
    ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    `);
    const tittle = ChalkAnimation.neon(t1);
    await sleep(5000);
    tittle.stop();
    console.clear();
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
    Console.consoleStart();
    jogador.comodo = 8;
    let comodoJogador = await pg.getComodo(jogador);
    let interaveis = await pg.getInteraveis(jogador);
    let estados = [];
    for (let i = 0; i < interaveis.length; i++) {
        estados[i] = await pg.getEstado(interaveis[i].estadoatual);
    }
    console.log(`Você está no cômodo : ${comodoJogador.nome}`);
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
            let inventario = await pg.getInventarioJogador(jogador.idjogador);
            console.log("Seu inventario");
            console.table(inventario);
        }
        else if (acao == 4)
            await mudaComodo(pg, jogador, acao);
        else if (acao == 5)
            await mudaComodo(pg, jogador, acao);
        else if (acao == 6)
            await mudaComodo(pg, jogador, acao);
        else if (acao == 7)
            await abrirMapa(pg, jogador);
        else if (acao == 8)
            await procurarInimigo(pg, jogador, input);
        else if (acao == 9)
            await procurarNpc(pg, jogador, input);
        console.log(`Você está no cômodo : ${comodoJogador.nome}`);
        Console.consoleMenu(comodoJogador);
        acao = Number(input(""));
    }
    console.log("Fim do jogo");
}
await Main();
