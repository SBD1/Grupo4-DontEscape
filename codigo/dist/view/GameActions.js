import Console from "./Console.js";
import chalk from "chalk";
export async function inspecionaComodo(pg, jogador, input) {
    let locais = [];
    (await pg.getLugares(jogador)).forEach(lugar => {
        lugar = Object.values(lugar).toString();
        if (!locais.includes(lugar))
            locais.push(lugar);
    });
    if (locais[0]) {
        let localEscolhido = Number(input(Console.consoleListLocais(locais)));
        while (localEscolhido != 0 && locais[0]) {
            let coletaveis = await pg.getColetaveis(jogador, locais[localEscolhido - 1]);
            let instanciaColetaveis = [];
            let itens = [];
            for (let i = 0; i < coletaveis.length; i++) {
                itens[i] = await pg.getItem(coletaveis[i].idcoletavel);
                instanciaColetaveis[i] = await pg.getInstanciaColetavel(coletaveis[i].idcoletavel, jogador.idjogador);
            }
            let resposta = Number(input(Console.consoleColetaveis(itens)));
            if (resposta != 0) {
                let inventario = await pg.postInventarioJogador(jogador.idjogador, instanciaColetaveis[resposta - 1].idinstanciacoletavel);
                console.log();
                console.log(chalk.green(itens[resposta - 1].descricao));
                if (inventario == 1)
                    console.log("Item coletado!");
                else {
                    console.log(chalk.green("Não posso pegar isso"));
                    if (itens[resposta - 1].iditem == 17)
                        console.log(chalk.green("Jeremy está bloqueando este item, talvez eu consiga pegá-lo se eu ajudar ele"));
                    if (itens[resposta - 1].iditem == 21)
                        console.log(chalk.green("Tenho que matar esta aranha antes de pegar os óculos"));
                }
            }
            locais = [];
            (await pg.getLugares(jogador)).forEach(lugar => {
                lugar = Object.values(lugar).toString();
                if (!locais.includes(lugar))
                    locais.push(lugar);
            });
            localEscolhido = Number(input(Console.consoleListLocais(locais)));
        }
    }
    else
        Console.consoleListLocais(locais);
}
export async function procurarInimigo(pg, jogador, input) {
    const inimigo = await pg.getInimigo(jogador.comodo);
    let embate;
    if (inimigo)
        embate = await pg.getEnfrentaInimigo(jogador.idjogador, inimigo.idinimigo);
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
                await pg.postInventarioJogador(jogador.idjogador, armas[arma].idinstanciacoletavel - 1);
        }
    }
    else
        input(console.log("Nenhum inimigo encontrado. Aperte qualquer botão para voltar"));
}
export async function procurarNpc(pg, jogador, input) {
    const npc = await pg.getNpc(jogador.comodo);
    let amizade;
    if (npc)
        amizade = await pg.getAmizadeNpc(jogador.idjogador, npc.idnpc);
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
            Console.consoleFalaNpc(npc, amizade);
            input(console.log("Aperte qualquer botão para voltar"));
        }
    }
    else
        input(console.log("Nenhum Npc encontrado. Aperte qualquer botão para voltar"));
}
export async function mudaComodo(pg, jogador, acao) {
    let comodo;
    comodo = await pg.getComodo(jogador);
    if (acao == 4 && comodo.saidadireita)
        pg.putJogador(jogador.idjogador, comodo.saidadireita);
    else if (acao == 5 && comodo.saidaesquerda)
        pg.putJogador(jogador.idjogador, comodo.saidaesquerda);
    else if (acao == 6 && comodo.saidameio)
        pg.putJogador(jogador.idjogador, comodo.saidameio);
    else
        console.log("Função indisponivel, cômodo não existe\n");
}
export async function abrirMapa(pg, jogador, input) {
    let localidade;
    let mapa = await pg.getLocalidades();
    let comodoAtual = await pg.getComodo(jogador);
    const isComodoInicial = comodoAtual.idcomodo == 7
        || comodoAtual.idcomodo == 8
        || comodoAtual.idcomodo == 10
        || comodoAtual.idcomodo == 13
        || comodoAtual.idcomodo == 16;
    if (isComodoInicial) {
        Console.consoleMapa(mapa);
        localidade = Number(input(""));
        if (localidade == 0)
            return;
        pg.putJogador(jogador.idjogador, mapa[localidade].comodoinicial);
    }
    else {
        console.log("Mapa Indisponivel, você precisa estar em um cômodo inicial\n");
    }
}
export async function interagirItem(pg, jogador, input, interaveis) {
    let possiveisEstados;
    console.log("Deseja interagir com qual item?");
    console.table({
        "Nome": interaveis.map(int => int.nome)
    });
    let item = Number(input(""));
    possiveisEstados = await pg.getMaquinaDeEstado(interaveis[item].estadoatual);
    console.log("O que deseja fazer?");
    console.table({
        "Ação": possiveisEstados.map(acao => acao.acao)
    });
    let escolha = Number(input(""));
}
export async function finalizarPartida(pg, jogador) {
    console.clear();
    const inventario = await pg.getInventarioJogador(jogador.idjogador);
    const estados = await pg.getEstadosJogador(jogador.idjogador);
    const enfrentamentos = await pg.getEnfrenta(jogador.idjogador);
    const amizades = await pg.getAmizade(jogador.idjogador);
    const partidaJogador = await pg.getPartidaJogador(jogador.idjogador);
    let qtdZumbis = partidaJogador.qtdzumbis;
    estados.forEach(estado => {
        if (estado.pontos > 0 && qtdZumbis > 0) {
            console.log(`${estado.descricao}, ${estado.pontos} zumbis morreram`);
            qtdZumbis = qtdZumbis - estado.pontos;
        }
    });
    if (qtdZumbis <= 0) {
        Console.consoleFinalVencedor();
        return;
    }
    for (let index = 0; index < inventario.length && qtdZumbis > 0; index++) {
        if (inventario[index].iditem == 6 || inventario[index].iditem == 23) {
            qtdZumbis = qtdZumbis - 1;
            console.log(`Você usou ${inventario[index].nome} e matou 1 zumbi`);
        }
        else if (inventario[index].iditem == 24) {
            qtdZumbis = qtdZumbis - 2;
            console.log(`Você usou ${inventario[index].nome} e matou 2 zumbis`);
        }
        else if (inventario[index].iditem == 25) {
            qtdZumbis = qtdZumbis - 3;
            console.log(`Você usou ${inventario[index].nome} e matou 3 zumbis`);
        }
    }
    if (qtdZumbis <= 0) {
        Console.consoleFinalVencedor();
        return;
    }
    let arma;
    enfrentamentos.forEach(async (enfrenta) => {
        arma = await pg.getInstanciaColetavelJogador(enfrenta.arma, jogador.idjogador);
        if (jogador.situacao == "normal" && (arma.iditem == 23 || arma.iditem == 24 || arma.iditem == 25)) {
            console.log("Você derrotou a Aranha Gigante com uma pistola e isso chamou a atenção de 5 zumbis");
            qtdZumbis = qtdZumbis + 5;
        }
    });
    amizades.forEach(amizade => {
        console.log(`${amizade.nome} lutou bravamente contra 1 zumbi para te proteger`);
        qtdZumbis = qtdZumbis - 1;
    });
    if (qtdZumbis <= 0)
        Console.consoleFinalVencedor();
    else
        Console.consoleFinalPerdedor(qtdZumbis);
}