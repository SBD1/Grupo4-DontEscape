const input = require('prompt-sync')({sigint: true});


import Postgree from "../api/index";
import ConsoleMethods from "./ConsoleMethods";

async function Main () {

    const playerComodoInicial = 8;
    ConsoleMethods.consoleName();

    const pg : Postgree = new Postgree();
    const name: string = String(input("Digite seu nome: "));
    // const response = await pg.postPlayerName(name, 2, playerComodoInicial);

    const localidades = await pg.getLocalidades();
    console.table(localidades);

    const comodoInicial = await pg.getPlayerLocalidade(playerComodoInicial);

    console.log(`A Localidade que você se encontra é : ${comodoInicial["nome"]}`);

    type Map = {
        idcomodo: Number
    };

    let map : Map = {
        idcomodo: 0
    };

    map["idcomodo"] = comodoInicial["comodoinicial"];

    let abrirMapa = input("Deseja abrir o mapa para saber onde pode ir ? (S | N ) ? ")

    // while (abrirMapa.toLowerCase() == "s" || abrirMapa.toLowerCase() == "sim" ) {
    //     map["idcomodo"] = await pg.openMap(map["idcomodo"])  
    //     console.table(map);
    //     console.log("Ir para \n1) Saida da direita \n2) Saída da esquerda\n3) Saída do meio\n");
    //     const decisao = input("");
        
    //     map = await openMap(map[opcoes[decisao]]);
    //     console.log(`O comodo que você se encontra é : ${map["nome"]}`);
    //     abrirMapa = input("Deseja abrir o mapa para saber onde pode ir ? (S | N ) ? ")
    // }
}

Main();