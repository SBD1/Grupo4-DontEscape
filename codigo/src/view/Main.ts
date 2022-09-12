import Postgree from "../api/index";
import { Jogador } from "../interfaces/jogador";
import Console from "./Console";
import { procurarInimigo, inspecionaComodo, procurarNpc, mudaComodo } from "./GameActions";
import Login from "../model/Login";
const input = require('prompt-sync')({ sigint: true });

async function Main() {

    const playerComodoInicial = 7;
    Console.consoleName();

    let jogador: Jogador = {
        idjogador: 6,
        nome: 'a',
        comodo: 8,
        partida: 2,
        situacao: 'normal'
    }

    const pg: Postgree = new Postgree();
    let possuiConta = input("Você já possui uma conta? (s/n) ");
    if (possuiConta.toLowerCase() == 's' || possuiConta.toLowerCase() == 'sim') {
        while (true) {
            jogador.nome = String(input("Digite seu nome: "));
            const acharJogador = await pg.getLogin(jogador.nome);
            const response = Login.validateLogin(acharJogador);
            if (typeof response === "object") {
                jogador = response;
                break;
            }
     
        }
    }
    else {
        jogador.nome = String(input("Digite seu nome: "));
        const response = await pg.postLogin(jogador.nome, 2, playerComodoInicial);
        console.log("Jogador criado com sucesso");
    }
        Console.consoleStart();
    // const response = await pg.postPlayerName(name, 2, playerComodoInicial);

    //onst comodoInicial = await pg.getPlayerLocalidade(playerComodoInicial);
    //console.log(`A Localidade que você se encontra é : ${comodoInicial["nome"]}`);

    let comodoJogador = await pg.getComodo(jogador);
    

    let acao = input(Console.consoleMenu(comodoJogador));
    while (acao != 0) {
        console.log(`Você está no cômodo : ${comodoJogador.nome}`);
        if (acao == 1)
            await inspecionaComodo(pg, jogador, input);
        else if (acao == 2)
            console.log("Abrir o inventário");
        else if (acao == 3)
            await mudaComodo(pg, jogador, acao);
        else if (acao == 4)
            await mudaComodo(pg, jogador, acao);
        else if (acao == 5)
            await mudaComodo(pg, jogador, acao);
        else if (acao == 6)
            console.log("Abrir o mapa");
        else if (acao == 7)
            await procurarInimigo(pg, jogador, input);
        else if (acao == 8)
            await procurarNpc(pg, jogador, input);

        acao = input(Console.consoleMenu(comodoJogador));
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

Main();
// client.end();
