import { Comodo } from "../interfaces/comodo.js"
import { Estado } from "../interfaces/estado.js"
import { Inimigo } from "../interfaces/inimigo.js"
import { Item } from "../interfaces/item.js"
import { Npc } from "../interfaces/npc.js"
import { Partida } from "src/interfaces/partida.js"
import ChalkAnimation from "chalk-animation";
import chalk from "chalk"
class Console {
   
    constructor() {

    }
    
    static async consoleName(sleep) {
        const text = `  
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

    const tittle = ChalkAnimation.radar(text);
    await sleep(10000);
    tittle.stop();
    console.clear();
    }

    static async consoleStart(sleep) {
        
        let str = 'Loading';
        const loading = ChalkAnimation.karaoke(str);

        setInterval(() => {
            loading.replace(str += '.');
        }, 500);
        await sleep(2500);
        console.clear();

        const text = 
        `  
        Quando os zumbis atacaram, nós não estávamos preparados.  \n
        Pensando bem, nós nunca estivemos realmente preparados para isso.  \n
        O surto começou duas semanas atrás e foi piorando a cada dia.  \n
        Desta vez nós mal conseguimos sobreviver. Nós escapamos, mas Bill foi mordido e nós dois sabemos o que isso significa..  \n
        Nós decidimos ficar nessa construção abandonada por enquanto, ela será a nossa base.  \n
        Precisamos descansar e dormir \n
        Uma enorme horda de mortos vivos está vindo para cá. Eles vão nos alcançar no pôr do sol.  \n
        Preciso trancar este lugar antes que isso aconteça e talvez, só talvez, eu consiga viver para ver outro dia.  \n`

            const tittle = ChalkAnimation.neon(chalk.redBright(text));
            await sleep(30000);
            tittle.stop();
            console.clear();
 
    }

    static consoleMenu(comodoJogador: Comodo, npc?: Npc) {
        // this.consoleComodo(comodoJogador);
        const isComodoInicial: Boolean = comodoJogador.idcomodo == 7
            || comodoJogador.idcomodo == 8
            || comodoJogador.idcomodo == 10
            || comodoJogador.idcomodo == 13
            || comodoJogador.idcomodo == 16;

        console.log(`\nO que você deseja fazer?`)
        console.log(`1) Inspecionar o cômodo`)
        console.log(`2) Interagir com item`)
        console.log(`3) Abrir o inventário`)
        if (comodoJogador.saidadireita) console.log(`4) Ir para a direita`)
        else console.log(`4) Ir para a direita (Indisponivel)`)
        if (comodoJogador.saidaesquerda) console.log(`5) Ir para a esquerda`)
        else console.log(`5) Ir para a esquerda (Indisponivel)`)
        if (comodoJogador.saidameio) console.log(`6) Ir para o meio`)
        else console.log("6) Ir para o meio (Indisponivel)")
        if (isComodoInicial) console.log(`7) Abrir o mapa`)
        else console.log(`7) Abrir o mapa (Indisponivel)`)
        console.log(`8) Procurar inimigos`)
        console.log(`9) Procurar npcs`)
        console.log(`0) Sair do jogo`)
    }

    static consoleComodo(comodo: Comodo) {
        console.table({
            "Cômodo": comodo.nome,
            "Descrição": comodo.descricao,
            "Saida a direita": comodo.saidadireita ? "Disponível" : "Indisponível",
            "Saida a esquerda": comodo.saidaesquerda ? "Disponível" : "Indisponível",
            "Saida pelo meio": comodo.saidameio ? "Disponível" : "Indisponível",
        });
    }

    static consoleListLocais(locais: String[]) {
        if (locais[0]) {
            console.log("\nVocê tem os seguintes locais possíveis para inspecionar aqui:");
            locais.forEach((local, i) => {
                console.log(`\t${i + 1}) ${local}`);
            })
            console.log("\t0) Voltar");
            console.log("Qual deseja inspecionar primeiro?");
        }
        else {
            console.log("\nNão há nenhum lugar para ser inspecionado aqui");
        }
    }

    static consoleColetaveis(itens: Item[]) {
            console.log("\nVocê encontrou os seguintes itens:");
            itens.forEach((item, i) => {
                console.log(`\t${i + 1}) ${item.nome}`);
            })
            console.log("\t0) Voltar");
            console.log("Selecione o item que deseja coletar ou 0 para voltar");
    }

    static consoleListItems(itens: any[]) {
        console.log("Escolha um item:")
        itens.forEach((item, i) => console.log(`${i}) ${item.nome}`));
        console.log(`${itens.length}) Nenhum`)
    }
    
    //Listar coletaveis do jogador que sejam armas
    static consoleListArmas(armas: any[]) {
        console.log("Escolha sua arma:")
        armas.forEach((arma, i) => console.log(`${i}) ${arma.nome}`));
        console.log(`${armas.length}) Nenhuma`)
    }

    static consoleOpcoesEnfrentamento(inimigo: Inimigo, itemProtegido: Item) {
        console.table({
            "Inimigo": inimigo.nome,
            "Item sendo protegido": itemProtegido ? itemProtegido.nome : "Nenhum",
        });

        console.log("1) Atacar");
        console.log("2) Ignorar");
    }

    static consoleOpcoesNpc(npc: Npc, itemBloqueado: Item) {
        console.table({
            "Npc": npc.nome,
            "Item sendo bloqueado": itemBloqueado.nome != "" ? itemBloqueado.nome : "Nenhum",
        });

        console.log("1) Falar");
        console.log("2) Ignorar");
    }

    static consoleFalaNpc(npc: Npc, amizade?: any) {
        if (!amizade) {
            console.table({"Fala": npc.falainicial,});
        }
        else {
            console.table({ "Fala": npc.falaajuda,});
        }
    }

    static consoleMapa(locais: any[]) {
        let voltar = { idlocalidade: 0, comodoinicial: 0, nome: 'Voltar' };
        locais.unshift(voltar)
        console.table({
            "Nome": locais.map(le => le.nome),
        });
        console.log("Deseja ir para qual local?\n");
    }

    static consoleInteraveis(estados: Estado[]) {
        console.log("Itens interáveis:");
        estados.forEach(estado=>{
            console.log(`\t- ${estado.descricao}`);    
        })
        console.log();
    }

    static consoleListPartidas(niveisPartida: Partida[]) {
        console.log("Escolha o nível de dificuldade:");

        niveisPartida.forEach((partida) => {
            console.log(`${partida.idpartida}) ${partida.dificuldadepartida}, ${partida.qtdzumbis} zumbis, ${partida.qtdzumbis} minutos`);
        });
    }
}

export default Console;