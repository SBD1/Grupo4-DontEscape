const pg = require('pg').Client;
const input = require('prompt-sync')({sigint: true});
const playerComodoInicial = 10;

const client = new pg({
    user: 'postgres',
    host: 'localhost',
    database: 'Dont',
    password: "Verao19*",
    port: '5432'
});

client.connect();

const postPlayerName = async (name, partida, comodo) => {
    let resultados = ""
    await client.query(`INSERT INTO Jogador VALUES (1, '${name}', '${partida}', '${comodo}')`)
    .then(results => {
        resultados = results.rows
    })
    return resultados;
}

const getLocalidades = async () => {
    let resultados = ""
    await client.query(`SELECT * FROM Localidade ORDER BY idLocalidade ASC`)
    .then(results => {
        resultados = results.rows
    })
    return resultados;
}

const getPlayerLocalidade = async (comodoInical) => {
    let resultados = ""
    await client.query(`SELECT nome, comodoInicial FROM Localidade WHERE Localidade.ComodoInicial = ${comodoInical}`)
    .then(results => {
        resultados = results.rows
    })
      
    return resultados[0];
}

const openMap = async (localidade) => {
    let resultados = ""
    await client.query(`SELECT nome, idcomodo, SaidaDireita, SaidaEsquerda, SaidaMeio FROM Comodo WHERE Comodo.IdComodo = ${localidade}`)
    .then(results => {
        resultados = results.rows
    })

    return resultados[0];
}

const opcoes = {
    1: "saidadireita",
    2: "saidaesquerda",
    3: "saidameio"
}

async function Game () {
    
    console.log('------------------------------------------------------')
    console.log('------------------------------------------------------')
    console.log('-------------------- DON´T ESCAPE --------------------')
    console.log('------------------------------------------------------')
    console.log('------------------------------------------------------')
    console.log()

    const name = input("Digite seu nome: ")
    const response = await postPlayerName(name, 1, playerComodoInicial);
    console.log("Jogador Criado com sucesso !");

    const responseLocalidade = await getLocalidades();
    console.table(responseLocalidade);

    // Achar o comodo inicial do player
    const playerComodoIncial = await getPlayerLocalidade(playerComodoInicial);

    console.log(`A Localidade que você se encontra é : ${playerComodoIncial["nome"]}`);

    // Abrir o mapa
    let map = []
    map["idcomodo"] = playerComodoIncial["comodoinicial"];

    let abrirMapa = input("Deseja abrir o mapa para saber onde pode ir ? (S | N ) ? ")
    while (abrirMapa.toLowerCase() == "s" || abrirMapa.toLowerCase() == "sim" ) {
        map = await openMap(map["idcomodo"])  
        console.table(map);
        console.log("Ir para \n1) Saida da direita \n2) Saída da esquerda\n3) Saída do meio\n");
        const decisao = input("");
        
        map = await openMap(map[opcoes[decisao]]);
        console.log(`O comodo que você se encontra é : ${map["nome"]}`);
        abrirMapa = input("Deseja abrir o mapa para saber onde pode ir ? (S | N ) ? ")
    }

    console.log("Fim do jogo")
    client.end();
}

Game();
