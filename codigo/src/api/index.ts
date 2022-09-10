import { Console } from "console";
import { Coletavel } from "../interfaces/coletavel";
import { Comodo } from "../interfaces/comodo";
import { Item } from "../interfaces/item";
import { Jogador } from "../interfaces/jogador";

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

    constructor() {
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

    public getPlayerLocalidade = async (comodoInical: number): Promise<{ nome: string, comodoinicial: number }> => {

        let resultados: Array<{ nome: string, comodoinicial: number }> = [];

        await this.client.query(`SELECT nome, ComodoInicial FROM Localidade WHERE Localidade.ComodoInicial = ${comodoInical}`)
            .then((results: any) => {
                resultados = results.rows
            })

        return resultados[0];
    };

    public getComodo = async (Jogador: Jogador): Promise<Comodo> => {

        let resultado: Comodo[] = [];

        await this.client.query(`SELECT * FROM Comodo WHERE idComodo = ${Jogador.comodo}`)
            .then((results: any) => {
                resultado = results.rows
            });

        return resultado[0];
    };


    public openMap = async (localidade: number): Promise<any> => {
        let resultados: Array<any> = []
        await this.client.query(`SELECT nome, idcomodo, SaidaDireita, SaidaEsquerda, SaidaMeio FROM Comodo WHERE Comodo.IdComodo = ${localidade}`)
            .then((results: any) => {
                resultados = results.rows
            })
        return resultados[0];
    };

    public getLugares = async (jogador: Jogador): Promise<String[]> => {
        let resultados: String[] = [];
        await this.client.query(`SELECT C.lugar 
                                    from (SELECT I.idItem, I.tipo FROM Item I WHERE I.Comodo = ${jogador.comodo}
                                            Group by I.idItem HAVING I.tipo='coletavel') n1 
                                    join Coletavel C on C.idColetavel = n1.idItem; `)
            .then((results: any) => {
                resultados = results.rows
            })
        return resultados;
    }

    public getColetaveis = async (jogador: Jogador, lugar: String): Promise<Coletavel[]> => {
        let resultados: Coletavel[] = [];
        await this.client.query(`SELECT * 
                                    from (
                                        SELECT C.idColetavel, C.lugar 
                                        from (SELECT I.idItem, I.tipo FROM Item I WHERE I.Comodo = ${jogador.comodo} 
                                            Group by I.idItem HAVING I.tipo='coletavel') n1 
                                        join Coletavel C on C.idColetavel = n1.idItem
                                    ) n2 
                                    join Item I on (I.idItem = n2.IdColetavel and n2.lugar = '${lugar}');`)
            .then((results: any) => {
                resultados = results.rows
            })
        return resultados;
    }

    public getItemById = async (itemid: Number): Promise<Item> => {
        let resultados: Item[] = [];
        await this.client.query(`SELECT * FROM Item WHERE idItem = ${itemid}`)
            .then((results: any) => {
                resultados = results.rows
            })
        return resultados[0];
    }

    public getInventarioJogador = async (idJogador: number): Promise<any> => {
        let resultados: Array<any> = [];
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
        let resultados: Array<any> = [];
        await this.client.query(`
            INSERT INTO Inventario (Jogador, InstanciaColetavel) VALUES (${idJogador}, ${idColetavel})`)
            .then((results: any) => {
                resultados = results.rows
            })
        return resultados[0];
    }

    public postEnfrentamento = async (idJogador: number, idInimigo: number, idArma?: number): Promise<any> => {
        let resultados: Array<any> = [];
        await this.client.query(`
            INSERT INTO Enfrenta(idJogador, idInimigo, Arma) VALUES (${idJogador}, ${idInimigo}, ${idArma ? idArma : null})`)
            .then((results: any) => {
                resultados = results.rows
            })
        return resultados[0];
    }

    public getInimigoNoComodo = async (idComodo: number): Promise<any> => {
        let resultados: Array<any> = [];
        await this.client.query(`
            SELECT * FROM Inimigo WHERE Comodo = ${idComodo}`)
            .then((results: any) => {
                resultados = results.rows
            })
        return resultados[0];
    }
}

export default Postgree;