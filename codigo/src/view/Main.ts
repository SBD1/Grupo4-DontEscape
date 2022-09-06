const input = require('prompt-sync')({sigint: true});
import Postgree from "../api/index";
import Console from "./Console";

async function Main () {

    const playerComodoInicial = 8;
    Console.consoleName();

    const pg : Postgree = new Postgree();
    const name: string = String(input("Digite seu nome: "));
    // const response = await pg.postPlayerName(name, 2, playerComodoInicial);

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

    map["idcomodo"] = comodoInicial["comodoinicial"];

    let abrirMapa = input("Deseja abrir o mapa para saber onde pode ir ? (S | N ) ? ")

    while (abrirMapa.toLowerCase() == "s" || abrirMapa.toLowerCase() == "sim" ) {
        map = await pg.openMap(map["idcomodo"]);
        Console.consoleMap(map)

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
}

Main();