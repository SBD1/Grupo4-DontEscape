import { Console } from "console";

const pg = require('pg').Client;
require("dotenv").config();
class Postgree {
    client = new pg({
        user: process.env.USER,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: process.env.PORT
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
    
    public getPlayerLocalidade = async (comodoInical: number) : Promise<{nome: string, comodoinicial: number}> => {

        let resultados: Array<{nome: string, comodoinicial: number}> = [];

        await this.client.query(`SELECT nome, ComodoInicial FROM Localidade WHERE Localidade.ComodoInicial = ${comodoInical}`)
        .then((results: any) => {
            resultados = results.rows
        })

        return resultados[0];
    };
    
    public openMap = async (localidade: number): Promise<any>=> {
        let resultados : Array<any> = []
        await this.client.query(`SELECT nome, idcomodo, SaidaDireita, SaidaEsquerda, SaidaMeio FROM Comodo WHERE Comodo.IdComodo = ${localidade}`)
        .then((results: any) => {
            resultados = results.rows
        })
        // console.log(resultados[0])
        return resultados[0];
    };

}

export default Postgree;