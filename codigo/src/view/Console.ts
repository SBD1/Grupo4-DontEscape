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

    static consoleMenu(comodoJogador: Comodo, npc?: Npc) {
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
        console.log(`7) Procurar inimigos`)
        console.log(`8) Procurar npcs`)
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

}

export default Console;