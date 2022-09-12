import chalk from "chalk";
import ChalkAnimation from "chalk-animation";
class Console {
    constructor() {
    }
    static async consoleName(sleep) {
        const t1 = `  
        /$$$$$$$                           /$$           /$$$$$$$$                                                         / $$
       | $$__  $                          | $$          | $$_____/                                                         | $$
       | $$  \  $    /$$$$$$   /$$$$$$$   /$$$$$$        | $$         /$$$$$$$   /$$$$$$$   /$$$$$$    /$$$$$$    /$$$$$$   | $$
       | $$  | $   /$$__  $$ | $$__  $$ |_  $$_/        | $$$$$     /$$_____/  /$$_____/  |____  $$  /$$__  $$  /$$__  $$  | $$
       | $$  | $  | $$  \  $$ | $$  \  $$   | $$          | $$__/    |  $$$$$$  | $$         /$$$$$$$ | $$  \  $$ | $$$$$$$$  |__/
       | $$  | $  | $$  | $$ | $$  | $$   | $$ /$$      | $$        \____  $$  | $$        /$$__  $$ | $$  | $$ | $$_____/      
       | $$$$$$$  |  $$$$$$/ | $$  | $$   | $$$$/       | $$$$$$$$  /$$$$$$$/ |  $$$$$$$  |$$$$$$$  | $$$$$$$/ |  $$$$$$$   |$$
       |_______/   \______/   |__/  |__/   |_____/       |________/ |_______/   |_______/  |_______/ | $$____/   |_______/  |__/
                                                                                                    | $$                       
                                                                                                    | $$                     
                                                                                                    |__/`;
        const tittle = ChalkAnimation.radar(t1);
        await sleep(10000);
        tittle.stop();
        console.clear();
    }
    static consoleStart() {
        console.log(chalk.green('\nQuando os zumbis atacaram, nós não estávamos preparados.'));
        console.log(chalk.green('Pensando bem, nós nunca estivemos realmente preparados para isso.'));
        console.log(chalk.green('O surto começou duas semanas atrás e foi piorando a cada dia.'));
        console.log(chalk.green('Desta vez nós mal conseguimos sobreviver. Nós escapamos, mas Bill foi mordido e nós dois sabemos o que isso significa...'));
        console.log(chalk.green('Nós decidimos ficar nessa construção abandonada por enquanto, ela será a nossa base.'));
        console.log(chalk.green('Precisamos descansar e dormir.'));
        console.log(chalk.green('Uma enorme horda de mortos vivos está vindo para cá. Eles vão nos alcançar no pôr do sol.'));
        console.log(chalk.green('Preciso trancar este lugar antes que isso aconteça e talvez, só talvez, eu consiga viver para ver outro dia.\n'));
    }
    static consoleMenu(comodoJogador, npc) {
        const isComodoInicial = comodoJogador.idcomodo == 7
            || comodoJogador.idcomodo == 8
            || comodoJogador.idcomodo == 10
            || comodoJogador.idcomodo == 13
            || comodoJogador.idcomodo == 16;
        console.log(`\nO que você deseja fazer?`);
        console.log(`1) Inspecionar o cômodo`);
        console.log(`2) Interagir com item`);
        console.log(`3) Abrir o inventário`);
        if (comodoJogador.saidadireita)
            console.log(`4) Ir para a direita`);
        else
            console.log(chalk.gray(`4) Ir para a direita (Indisponivel)`));
        if (comodoJogador.saidaesquerda)
            console.log(`5) Ir para a esquerda`);
        else
            console.log(chalk.gray(`5) Ir para a esquerda (Indisponivel)`));
        if (comodoJogador.saidameio)
            console.log(`6) Ir para o meio`);
        else
            console.log(chalk.gray("6) Ir para o meio (Indisponivel)"));
        if (isComodoInicial)
            console.log(`7) Abrir o mapa`);
        else
            console.log(chalk.gray(`7) Abrir o mapa (Indisponivel)`));
        console.log(`8) Procurar inimigos`);
        console.log(`9) Procurar npcs`);
        console.log(`0) Sair do jogo`);
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
            console.log("\t0) Voltar");
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
        let voltar = { idlocalidade: 0, comodoinicial: 0, nome: 'Voltar' };
        locais.unshift(voltar);
        console.table({
            "Nome": locais.map(le => le.nome),
        });
        console.log("Deseja ir para qual local?\n");
    }
    static consoleInteraveis(estados) {
        console.log("Itens interáveis:");
        estados.forEach(estado => {
            console.log(`\t- ${estado.descricao}`);
        });
        console.log();
    }
    static consoleListPartidas(niveisPartida) {
        console.log("Escolha o nível de dificuldade:");
        niveisPartida.forEach((partida) => {
            console.log(`${partida.idpartida}) ${partida.dificuldadepartida}, ${partida.qtdzumbis} zumbis, ${partida.qtdzumbis} minutos`);
        });
    }
}
export default Console;
