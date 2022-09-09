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
        return resultados[0];
    };
    
    public getLugares = async (): Promise<any> => {
        let resultados : Array<any> = [];
        await this.client.query(`SELECT C.idColetavel, C.lugar 
                                    from (SELECT I.idItem, I.tipo FROM Item I join Jogador p on I.Comodo = p.Comodo 
                                            Group by I.idItem HAVING I.tipo='coletavel') n1 
                                    join Coletavel C on C.idColetavel = n1.idItem; `)
        .then((results: any) => {
            resultados = results.rows
        })
        return resultados[0];
    }

    public getInventarioJogador = async (idJogador: number): Promise<any> => {
        let resultados : Array<any> = [];
        await this.client.query(`
            SELECT Item.nome 
            FROM (
            SELECT * 
            FROM Inventario 
            JOIN InstanciaColetavel ON Inventario.InstanciaColetavel = InstanciaColetavel.IdItem
            JOIN Jogador ON Inventario.Jogador = ${idJogador}) I
            JOIN Item on I.IdItem = Item.IdItem`)
        .then((results: any) => {
            resultados = results.rows
        })
        return resultados[0];
    }

    public postInventarioJogador = async (idJogador: number, idColetavel: number): Promise<any> => {
        let resultados : Array<any> = [];
        await this.client.query(`
            INSERT INTO Inventario (Jogador, InstanciaColetavel) VALUES (${idJogador}, ${idColetavel})`)
        .then((results: any) => {
            resultados = results.rows
        })
        return resultados[0];
    }

}

export default Postgree;