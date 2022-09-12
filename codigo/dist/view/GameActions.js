import Console from "./Console.js";
export async function inspecionaComodo(pg, jogador, input) {
    let locais = [];
    (await pg.getLugares(jogador)).forEach(lugar => {
        lugar = Object.values(lugar).toString();
        if (!locais.includes(lugar))
            locais.push(lugar);
    });
    let localEscolhido;
    if (locais[0]) {
        localEscolhido = input(Console.consoleListLocais(locais));
        let coletaveis = await pg.getColetaveis(jogador, locais[localEscolhido - 1]);
        let itens = [];
        for (let i = 0; i < coletaveis.length; i++) {
            itens[i] = await pg.getItem(coletaveis[i].idcoletavel);
        }
        let resposta = input(Console.consoleColetaveis(itens));
        if (resposta != 0) {
            await pg.postInventarioJogador(jogador.idjogador, coletaveis[resposta - 1].idcoletavel);
            console.log(itens[resposta - 1].descricao);
        }
    }
    else
        Console.consoleListLocais(locais);
}
export async function procurarInimigo(pg, jogador, input) {
    const inimigo = await pg.getInimigo(jogador.comodo);
    let embate;
    if (inimigo)
        embate = await pg.getEnfrenta(jogador.idjogador, inimigo.idinimigo);
    let acao, armas;
    if (inimigo && !embate) {
        const instanciaColetavel = await pg.getInstanciaColetavel(inimigo.itemprotegido, jogador.idjogador);
        const itemProtegido = await pg.getItem(instanciaColetavel.iditem);
        acao = input(Console.consoleOpcoesEnfrentamento(inimigo, itemProtegido));
        if (acao == 1) {
            armas = await pg.getArmaInventarioJogador(jogador.idjogador);
            let arma = input(Console.consoleListItems(armas));
            await pg.postEnfrentamento(jogador.idjogador, inimigo.idinimigo, armas[arma] ? armas[arma].instanciacoletavel : null);
            if (armas[arma].iditem == 23 || armas[arma].iditem == 24 || armas[arma].iditem == 25)
                await pg.postInventarioJogador(jogador.idjogador, armas[arma].iditem - 1);
        }
    }
    else
        input(console.log("Nenhum inimigo encontrado. Aperte qualquer botão para voltar"));
}
export async function procurarNpc(pg, jogador, input) {
    const npc = await pg.getNpc(jogador.comodo);
    let amizade;
    if (npc)
        amizade = await pg.getAmizade(jogador.idjogador, npc.idnpc);
    let acao, items;
    let itemBloqueado = {
        iditem: 0,
        nome: "",
        descricao: "",
        comodo: 0,
        tipo: "coletavel"
    };
    if (npc) {
        const instanciaColetavel = await pg.getInstanciaColetavel(npc.itembloqueado, jogador.idjogador);
        if (instanciaColetavel)
            itemBloqueado = await pg.getItem(instanciaColetavel.iditem);
        acao = input(Console.consoleOpcoesNpc(npc, itemBloqueado));
        if (acao == 1 && !amizade) {
            Console.consoleFalaNpc(npc);
            items = await pg.getItemInventarioJogador(jogador.idjogador, npc.itemdesejado);
            let itemEscolhido = input(Console.consoleListItems(items));
            if (itemEscolhido != items.length) {
                await pg.postAmizade(jogador.idjogador, npc.idnpc);
                Console.consoleFalaNpc(npc, true);
                if (npc.itembloqueado)
                    await pg.postInventarioJogador(jogador.idjogador, instanciaColetavel.idinstanciacoletavel);
                input(console.log("Aperte qualquer botão para voltar"));
            }
        }
        else if (acao == 1 && amizade) {
            Console.consoleFalaNpc(npc, amizade.relacao);
            input(console.log("Aperte qualquer botão para voltar"));
        }
    }
    else
        input(console.log("Nenhum Npc encontrado. Aperte qualquer botão para voltar"));
}
export async function mudaComodo(pg, jogador, acao) {
    let comodo, novoComodo;
    comodo = await pg.getComodo(jogador);
    if (acao == 3 && comodo.saidadireita)
        novoComodo = comodo.saidadireita;
    else if (acao == 4 && comodo.saidaesquerda)
        novoComodo = comodo.saidaesquerda;
    else if (acao == 5 && comodo.saidameio)
        novoComodo = comodo.saidameio;
    else
        console.log("Função indisponivel, cômodo não existe\n");
    if (novoComodo)
        pg.putJogador(jogador.idjogador, novoComodo);
}
export async function abrirMapa(pg, jogador) {
    let mapa = await pg.getLocalidades();
    let comodoAtual = await pg.getComodo(jogador);
    const isComodoInicial = comodoAtual.idcomodo == 7
        || comodoAtual.idcomodo == 8
        || comodoAtual.idcomodo == 10
        || comodoAtual.idcomodo == 13
        || comodoAtual.idcomodo == 16;
    if (isComodoInicial) {
        Console.consoleMapa(mapa);
    }
    else {
        console.log("Mapa Indisponivel, você precisa estar em um cômodo inicial\n");
    }
}
