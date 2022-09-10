import Postgree from "../api/index";
import { Inimigo } from "../interfaces/inimigo";
import { Item } from "../interfaces/item";
import { Jogador } from "../interfaces/jogador";
import Console from "./Console";

export async function inspecionaComodo(pg: Postgree, jogador: Jogador, input: any) {
    let locais: String[] = [];
    (await pg.getLugares(jogador)).forEach(lugar => {
        lugar = Object.values(lugar).toString()
        if (!locais.includes(lugar)) locais.push(lugar);
    });

    let localEscolhido;
    if (locais[0])
        localEscolhido = input(Console.consoleListLocais(locais));
    else Console.consoleListLocais(locais);
}

export async function procurarInimigo(pg: Postgree, jogador: Jogador, input: any) {
    const inimigo: Inimigo = await pg.getInimigo(jogador.comodo);
    let embate;
    if (inimigo) embate = await pg.getEnfrenta(jogador.idjogador, inimigo.idinimigo);

    let acao, armas;

    if (inimigo && !embate) {
        const instanciaColetavel = await pg.getInstanciaColetavel(inimigo.itemprotegido, jogador.idjogador);
        const itemProtegido: Item = await pg.getItem(instanciaColetavel.iditem);

        acao = input(Console.consoleOpcoesEnfrentamento(inimigo, itemProtegido));

        if (acao == 1) {
            armas = await pg.getArmaInventarioJogador(jogador.idjogador);

            let arma: any = input(Console.consoleListArmas(armas));

            await pg.postEnfrentamento(jogador.idjogador, inimigo.idinimigo, armas[arma] ? armas[arma].instanciacoletavel : null);

            if (armas[arma].iditem == 23 || armas[arma].iditem == 24 || armas[arma].iditem == 25)
                await pg.postInventarioJogador(jogador.idjogador, armas[arma].iditem - 1);
        }
    }
}