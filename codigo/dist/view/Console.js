class Console {
    constructor() {
    }
    static consoleName() {
        console.log('------------------------------------------------------');
        console.log('------------------------------------------------------');
        console.log('-------------------- DON´T ESCAPE --------------------');
        console.log('------------------------------------------------------');
        console.log('------------------------------------------------------');
        console.log();
    }
    static consoleStart() {
        console.log('\nQuando os zumbis atacaram, nós não estávamos preparados.');
        console.log('Pensando bem, nós nunca estivemos realmente preparados para isso.');
        console.log('O surto começou duas semanas atrás e foi piorando a cada dia.');
        console.log('Desta vez nós mal conseguimos sobreviver. Nós escapamos, mas Bill foi mordido e nós dois sabemos o que isso significa...');
        console.log('Nós decidimos ficar nessa construção abandonada por enquanto, ela será a nossa base.');
        console.log('Precisamos descansar e dormir.');
        console.log('Uma enorme horda de mortos vivos está vindo para cá. Eles vão nos alcançar no pôr do sol.');
        console.log('Preciso trancar este lugar antes que isso aconteça e talvez, só talvez, eu consiga viver para ver outro dia.\n');
    }
    static consoleMenu(comodoJogador, npc) {
        let print = "";
        const isComodoInicial = comodoJogador.idcomodo == 7
            || comodoJogador.idcomodo == 8
            || comodoJogador.idcomodo == 10
            || comodoJogador.idcomodo == 13
            || comodoJogador.idcomodo == 16;
        print = `\nO que você deseja fazer? \n`;
        print = print + `1) Inspecionar o cômodo \n`;
        print = print + `2) Abrir o inventário \n`;
        if (comodoJogador.saidadireita)
            print = print + `3) Ir para a direita \n`;
        if (comodoJogador.saidaesquerda)
            print = print + `4) Ir para a esquerda \n`;
        else
            print = print + `4) Ir para a esquerda (Indisponivel) \n`;
        if (comodoJogador.saidameio)
            print = `5) Ir para o meio \n`;
        else
            print = print + `5) Ir para o meio (Indisponivel) \n`;
        if (isComodoInicial)
            print = print + `6) Abrir o mapa \n`;
        else
            print = print + `6) Abrir o mapa (Indisponivel) \n`;
        print = print + `7) Procurar inimigos \n`;
        print = print + `8) Procurar npcs \n`;
        print = print + `0) Sair do jogo`;
        return print;
    }
    static consoleComodo(comodo) {
        console.table({
            "Cômodo": comodo.nome,
            "Descrição": comodo.descricao,
            "Saida a direita": comodo.saidadireita ? "Disponível" : "Indisponível",
            "Saida a esquerda": comodo.saidaesquerda ? "Disponível" : "Indisponível",
            "Saida pelo meio": comodo.saidameio ? "Disponível" : "Indisponível",
        });
    }
    static consoleListLocais(locais) {
        if (locais[0]) {
            console.log("\nVocê tem os seguintes locais possíveis para inspecionar aqui:");
            locais.forEach((local, i) => {
                console.log(`\t${i + 1}) ${local}`);
            });
            console.log("Qual deseja inspecionar primeiro?");
        }
        else {
            console.log("\nNão há nenhum lugar para ser inspecionado aqui");
        }
    }
    static consoleColetaveis(itens) {
        console.log("\nVocê encontrou os seguintes itens:");
        itens.forEach((item, i) => {
            console.log(`\t${i + 1}) ${item.nome}`);
        });
        console.log("\t0) Voltar");
        console.log("Selecione o item que deseja coletar ou 0 para voltar");
    }
    static consoleListItems(itens) {
        console.log("Escolha um item:");
        itens.forEach((item, i) => console.log(`${i}) ${item.nome}`));
        console.log(`${itens.length}) Nenhum`);
    }
    static consoleListArmas(armas) {
        console.log("Escolha sua arma:");
        armas.forEach((arma, i) => console.log(`${i}) ${arma.nome}`));
        console.log(`${armas.length}) Nenhuma`);
    }
    static consoleOpcoesEnfrentamento(inimigo, itemProtegido) {
        console.table({
            "Inimigo": inimigo.nome,
            "Item sendo protegido": itemProtegido ? itemProtegido.nome : "Nenhum",
        });
        console.log("1) Atacar");
        console.log("2) Ignorar");
    }
    static consoleOpcoesNpc(npc, itemBloqueado) {
        console.table({
            "Npc": npc.nome,
            "Item sendo bloqueado": itemBloqueado.nome != "" ? itemBloqueado.nome : "Nenhum",
        });
        console.log("1) Falar");
        console.log("2) Ignorar");
    }
    static consoleFalaNpc(npc, amizade) {
        if (!amizade) {
            console.table({ "Fala": npc.falainicial, });
        }
        else {
            console.table({ "Fala": npc.falaajuda, });
        }
    }
    static consoleMapa(locais) {
        console.table({
            "Nome": locais.nome,
        });
    }
}
export default Console;
