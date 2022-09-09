const input = require('prompt-sync')({sigint: true});
import Postgree from "../api/index";
import { Jogador } from "../interfaces/jogador";
import Console from "./Console";

async function Main () {

    const playerComodoInicial = 7;
    Console.consoleName();
    
    let jogador: Jogador = {
        idjogador: 1,
        nome: 'a',
        comodo: 7,
        partida: 2,
        situacao: 'normal'
    }

    const pg : Postgree = new Postgree();
    const name: string = String(input("Digite seu nome: "));
    // const response = await pg.postPlayerName(name, 2, playerComodoInicial);

    //onst comodoInicial = await pg.getPlayerLocalidade(playerComodoInicial);
    //console.log(`A Localidade que você se encontra é : ${comodoInicial["nome"]}`);
    
    let comodoJogador = await pg.getComodo(jogador);    
    console.log(`Você está no cômodo : ${comodoJogador.nome}`);

    let acao = input(Console.consoleMenu(comodoJogador));
    while (acao != 0){

        // inspecionar o cômodo
        if(acao == 1){
            let locais: String[] = [];
            (await pg.getLugares(jogador)).forEach(lugar=>{
                lugar = Object.values(lugar).toString()
                if(!locais.includes(lugar)) locais.push(lugar);
            });

            let localEscolhido;
            if(locais[0])
                localEscolhido = input(Console.consoleListLocais(locais));
            else Console.consoleListLocais(locais);
            
        }


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
        Console.consoleMap(map)

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

