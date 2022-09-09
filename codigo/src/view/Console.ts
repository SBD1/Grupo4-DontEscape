import { Comodo } from "../interfaces/comodo"

type Map = {
    nome: string,
    idcomodo: number,
    saidadireita: number | null,
    saidaesquerda: number | null,
    saidameio: number | null,
}

class Console {

    constructor () {

    }

    static consoleName() {
        console.log('------------------------------------------------------')
        console.log('------------------------------------------------------')
        console.log('-------------------- DON´T ESCAPE --------------------')
        console.log('------------------------------------------------------')
        console.log('------------------------------------------------------')
        console.log()
    }

    static consoleMenu(comodoJogador: Comodo) {
        console.log(comodoJogador);
        const isComodoInicial: Boolean = comodoJogador.idcomodo == 7 
                                      || comodoJogador.idcomodo == 8 
                                      || comodoJogador.idcomodo == 10 
                                      || comodoJogador.idcomodo == 13
                                      || comodoJogador.idcomodo == 16;

        let i=1;
        console.log(`\nO que você deseja fazer?`)
        console.log(`${i++}) Inspecionar o cômodo`)
        console.log(`${i++}) Abrir o inventário`)
        if(comodoJogador.saidadireita) console.log(`${i++}) Sair para a direita`)
        if(comodoJogador.saidaesquerda) console.log(`${i++}) Sair para a esquerda`)
        if(comodoJogador.saidameio) console.log(`${i++}) Sair para o meio`)
        if(isComodoInicial) console.log(`${i++}) Abrir o mapa`)
        console.log(`0) Sair do jogo`)
    }

    static consoleMap(map : Map) {

        let formatedMap = {
            "nome": "Você está em " + map["nome"],
            "Saida da direita": map["saidadireita"] ? "Disponível" : "Indisponível",
            "Saida da Esquerda": map["saidaesquerda"] ? "Disponível" : "Indisponível",
            "Saida do Meio": map["saidameio"] ? "Disponível" : "Indisponível"
        };

        console.table(formatedMap);
    }

    static consoleListLocais(locais: String[]) {
        if(locais[0]){
            console.log("\nVocê tem os seguintes locais possíveis para inspecionar aqui:");
            locais.forEach((local, i)=>{
                console.log(`\t${i+1}) ${local}`);
            })
            console.log("Qual deseja inspecionar primeiro?");
        }
        else{
            console.log("\nNão há nenhum lugar para ser inspecionado aqui");
        }
    }
}

export default Console;