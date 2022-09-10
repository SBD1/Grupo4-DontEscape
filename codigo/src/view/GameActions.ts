import Postgree from "../api/index";
import { Comodo } from "../interfaces/comodo";
import { Inimigo } from "../interfaces/inimigo";
import { Item } from "../interfaces/item";
import { Jogador } from "../interfaces/jogador";
import Console from "./Console";

export async function inspecionaComodo(pg:Postgree, jogador: Jogador, comodo: Comodo, input: any) {
    let locais: String[] = [];
    (await pg.getLugares(jogador)).forEach(lugar => {
        lugar = Object.values(lugar).toString()
        if (!locais.includes(lugar)) locais.push(lugar);
    });

    let localEscolhido;
    if (locais[0]){
        localEscolhido = input(Console.consoleListLocais(locais));
        let coletaveis = await pg.getColetaveis(jogador, locais[localEscolhido-1]);
        let itens: Item[] = [];

        coletaveis.forEach(async coletavel => {
            itens.push(await pg.getItemById(coletavel.idcoletavel))
        })
        input(Console.consoleColetaveis(itens));
    }
    else Console.consoleListLocais(locais);

    
}

export async function enfrentaInimigo(pg: Postgree, jogador: Jogador, input: any) {
    const inimigo: Inimigo  = await pg.getInimigoNoComodo(jogador.comodo);

    let arma: any = input(Console.consoleListArmas(jogador.idjogador));

    await pg.postEnfrentamento(jogador.idjogador, inimigo.idInimigo, arma.idInstanciaColetavel ? arma.idInstanciaColetavel : null);

    if (arma.idItem == 23 || arma.idItem == 24 || arma.idItem == 25) {
        //Remover item do inventário
        //Inserir pistola com menos bala
    }
        
}