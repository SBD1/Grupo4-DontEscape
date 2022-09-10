import { Comodo } from "../interfaces/comodo"
import { Inimigo } from "../interfaces/inimigo"
import { Item } from "../interfaces/item"
import { Npc } from "../interfaces/npc"

class Console {

    constructor() {

    }

    static consoleName() {
        console.log('------------------------------------------------------')
        console.log('------------------------------------------------------')
        console.log('-------------------- DON´T ESCAPE --------------------')
        console.log('------------------------------------------------------')
        console.log('------------------------------------------------------')
        console.log()
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

    static consoleMenu(comodoJogador: Comodo, inimigo?: Inimigo, npc?:Npc) {
        
        this.consoleComodo(comodoJogador);

        const isComodoInicial: Boolean = comodoJogador.idcomodo == 7
            || comodoJogador.idcomodo == 8
            || comodoJogador.idcomodo == 10
            || comodoJogador.idcomodo == 13
            || comodoJogador.idcomodo == 16;

        console.log(`\nO que você deseja fazer?`)
        console.log(`1) Inspecionar o cômodo`)
        console.log(`2) Abrir o inventário`)
        if (comodoJogador.saidadireita) console.log(`3) Ir para a direita`)
        if (comodoJogador.saidaesquerda) console.log(`4) Ir para a esquerda`)
        if (comodoJogador.saidameio) console.log(`5) Ir para o meio`)
        if (isComodoInicial) console.log(`6) Abrir o mapa`)
        if (inimigo) console.log(`7) Atacar ${inimigo.nome}`)
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
            console.log("Selecione o item que deseja coletar");
    }


    static consoleListArmas(idJogador: number) {
        //Listar coletaveis do jogador que sejam armas
    }
}

export default Console;