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

    static consoleMap(map : Map) {

        let formatedMap = {
            "nome": "Você está em " + map["nome"],
            "Saida da direita": map["saidadireita"] ? "Disponível" : "Indisponível",
            "Saida da Esquerda": map["saidaesquerda"] ? "Disponível" : "Indisponível",
            "Saida do Meio": map["saidameio"] ? "Disponível" : "Indisponível"
        };

        console.table(formatedMap);
    }
}

export default Console;