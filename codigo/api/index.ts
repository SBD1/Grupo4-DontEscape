const pg = require('pg').Client;

class Postgree {
    client = new pg({
        user: 'postgres',
        host: 'localhost',
        database: 'DontEscapeDB',
        password: "Verao19*",
        port: '5432'
    });
    
    constructor () {
        this.client.connect();
        console.log("connected")
    }

    public postPlayerName = async (name: string, partida: number, comodo: number) => {
        let resultados = ""
        await this.client.query(`INSERT INTO Jogador VALUES ('${name}', ${partida}, ${comodo})`)
        .then((results: any) => {
            resultados = results.rows
        })
        return resultados;
    };
    
    public getLocalidades = async () => {
        let resultados = ""
        await this.client.query(`SELECT * FROM Localidade ORDER BY idLocalidade ASC`)
        .then((results: any) => {
            resultados = results.rows
        })
        return resultados;
    };
    
    public getPlayerLocalidade = async (comodoInical: number) : Promise<{nome: string, comodoinicial: Number}> => {

        let resultados: Array<{nome: string, comodoinicial: Number}> = [];

        await this.client.query(`SELECT nome, ComodoInicial FROM Localidade WHERE Localidade.ComodoInicial = ${comodoInical}`)
        .then((results: any) => {
            resultados = results.rows
        })

        return resultados[0];
    };
    
    public openMap = async (localidade: number) => {
        let resultados = ""
        await this.client.query(`SELECT nome, idcomodo, SaidaDireita, SaidaEsquerda, SaidaMeio FROM Comodo WHERE Comodo.IdComodo = ${localidade}`)
        .then((results: any) => {
            resultados = results.rows
        })
    
        return resultados[0];
    };

}

export default Postgree;