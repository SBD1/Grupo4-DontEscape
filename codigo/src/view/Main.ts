import Postgree from "../api/index.js";
import Auth from "../model/Auth.js";
import { Jogador } from "../interfaces/jogador.js";
import Console from "./Console.js";
import { procurarInimigo, inspecionaComodo, procurarNpc, mudaComodo, abrirMapa } from "./GameActions.js";
import Login from "../model/Login.js";
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

    let jogador: Jogador = {
        idjogador: 6,
        nome: '',
        comodo: 11,
        partida: 2,
        situacao: 'normal'
    };

    const pg: Postgree = new Postgree();

    let possuiConta = input("Você já possui uma conta? (s/n) ");

    if (possuiConta.toLowerCase() == 's' || possuiConta.toLowerCase() == 'sim') 
        jogador = await Auth.login(input, pg); 
    else 
        jogador = await Auth.register(input, pg);

    Console.consoleStart();

    let comodoJogador = await pg.getComodo(jogador);
    console.log(`Você está no cômodo : ${comodoJogador.nome}`);
    Console.consoleMenu(comodoJogador)
    let acao = Number(input(""));

    while (acao != 0) {
        if (acao == 1)
            await inspecionaComodo(pg, jogador, input);
        else if (acao == 2) {
            let inventario = await pg.getInventarioJogador(1);
            console.log("Seu inventario");
            console.table(inventario);
        }

        else if (acao == 3)
            await mudaComodo(pg, jogador, acao);
        else if (acao == 4)
            await mudaComodo(pg, jogador, acao);
        else if (acao == 5)
            await mudaComodo(pg, jogador, acao);
        else if (acao == 6)
            await abrirMapa(pg, jogador);
        else if (acao == 7)
            await procurarInimigo(pg, jogador, input);
        else if (acao == 8)
            await procurarNpc(pg, jogador, input);
        console.log(`Você está no cômodo : ${comodoJogador.nome}`);
        Console.consoleMenu(comodoJogador)
        acao = Number(input(""));
    }

    console.log("Fim do jogo");
    /*
        let inventario = await pg.getInventarioJogador(1);
        console.log("Seu inventario");
        console.table(inventario);
    
        // const responsePostInventario = await pg.postInventarioJogador(1, 1);
        // console.log("Seu inventario");
        // inventario = await pg.getInventarioJogador(1);
    
    
        const localidades = await pg.getLocalidades();
        console.table(localidades);
    
        const comodoInicial = await pg.getPlayerLocalidade(playerComodoInicial);
    
        console.log(`A Localidade que você se encontra é : ${comodoInicial["nome"]}`);
    
        let map = {
            nome: "",
            idcomodo: comodoInicial["comodoinicial"],
            saidadireita: 0,
            saidaesquerda: 0,
            saidameio: 0,
        };
    
        // map["idcomodo"] = comodoInicial["comodoinicial"];
    
        let abrirMapa = input("Deseja abrir o mapa para saber onde pode ir ? (S | N ) ? ")
    
        while (abrirMapa.toLowerCase() == "s" || abrirMapa.toLowerCase() == "sim" ) {
            map = await pg.openMap(map["idcomodo"]);
            Console.consoleComodo(map)
    
            let lugares = await pg.getLugares();
            console.table(lugares);
    
            console.log("Ir para \n1) Saida da direita \n2) Saída da esquerda\n3) Saída do meio\n");
            let decisao = input("");
    
            if (decisao == "1") 
                map = await pg.openMap(map["saidadireita"]);
            if (decisao == "2") 
                map = await pg.openMap(map["saidaesquerda"]);
            if (decisao == "3") 
                map = await pg.openMap(map["saidameio"]);
     
            console.log(`O comodo que você se encontra é : ${map["nome"]}`);
            abrirMapa = input("Deseja abrir o mapa para saber onde pode ir ? (S | N ) ? ")
        }
    
        console.log("Fim do jogo");*/
}

// client.end();
await Main();



