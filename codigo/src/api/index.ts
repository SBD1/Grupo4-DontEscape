import { Console } from "console";
import { Coletavel } from "../interfaces/coletavel";
import { Comodo } from "../interfaces/comodo";
import { Inimigo } from "../interfaces/inimigo";
import { Item } from "../interfaces/item";
import { Jogador } from "../interfaces/jogador";
import { Npc } from "../interfaces/npc";

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

    /*public getItemById = async (itemid: Number): Promise<Item> => {
        let resultados: Item[] = [];
        await this.client.query(`SELECT * FROM Item WHERE idItem = ${itemid}`)
            .then((results: any) => {
                resultados = results.rows
            })
        return resultados[0];
    }*/

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

    public getInimigo = async (idComodo: number): Promise<Inimigo> => {
        let resultados: Inimigo[] = [];

        await this.client.query(`
        SELECT * FROM Inimigo WHERE Comodo = ${idComodo}`)
            .then((results: any) => {
                resultados = results.rows
            })
        return resultados[0];
    }

    public getNpc = async (idComodo: number): Promise<Npc> => {
        let resultados: Npc[] = [];

        await this.client.query(`
        SELECT * FROM Npc WHERE Comodo = ${idComodo}`)
            .then((results: any) => {
                resultados = results.rows
            })
        return resultados[0];
    }

    public getInstanciaColetavel = async (idColetavel: number, idJogador: number): Promise<any> => {
        let resultados: Array<any> = [];
        await this.client.query(`
            SELECT * FROM InstanciaColetavel WHERE IdInstanciaColetavel = ${idColetavel} AND Jogador = ${idJogador}`)
            .then((results: any) => {
                resultados = results.rows
            })
        return resultados[0];
    }

    public getItem = async (idItem: Number): Promise<any> => {
        let resultados: Array<any> = [];
        await this.client.query(`
            SELECT * FROM Item WHERE IdItem = ${idItem}`)
            .then((results: any) => {
                resultados = results.rows
            })

        return resultados[0];
    }

    public getArmaInventarioJogador = async (idJogador: number): Promise<any> => {
        let resultados: Array<any> = [];
        await this.client.query(`
            SELECT Item.nome, Item.IdItem, Inventario.InstanciaColetavel FROM Item
	            JOIN InstanciaColetavel
	            ON InstanciaColetavel.IdItem = Item.IdItem AND InstanciaColetavel.Jogador = ${idJogador}
	            JOIN Inventario
	            ON Inventario.InstanciaColetavel = InstanciaColetavel.IdItem
	            WHERE Inventario.Jogador = ${idJogador} AND (InstanciaColetavel.IdItem = 23 OR InstanciaColetavel.IdItem = 24 OR InstanciaColetavel.IdItem = 25 OR InstanciaColetavel.IdItem = 6 OR InstanciaColetavel.IdItem = 1)`)
            .then((results: any) => {
                resultados = results.rows
            })
        return resultados;
    }

    public getEnfrenta = async (idJogador: number, idInimigo: number): Promise<any> => {
        let resultados: Array<any> = [];
        await this.client.query(`
            SELECT * FROM Enfrenta WHERE Enfrenta.idJogador = ${idJogador} AND Enfrenta.idInimigo = ${idInimigo}`)
            .then((results: any) => {
                resultados = results.rows
            })
        return resultados[0];
    }

    public getAmizade = async (idJogador: number, idNpc: number): Promise<any> => {
        let resultados: Array<any> = [];
        await this.client.query(`
            SELECT * FROM Amizade WHERE Amizade.idJogador = ${idJogador} AND Amizade.idNpc = ${idNpc}`)
            .then((results: any) => {
                resultados = results.rows
            })
        return resultados[0];
    }

    public getItemInventarioJogador = async (idJogador: number, idItem: number): Promise<any> => {
        let resultados: Array<any> = [];
        await this.client.query(`
            SELECT Item.nome, Item.IdItem, Inventario.InstanciaColetavel FROM Item
	            JOIN InstanciaColetavel
	            ON InstanciaColetavel.IdItem = Item.IdItem AND InstanciaColetavel.Jogador = ${idJogador}
	            JOIN Inventario
	            ON Inventario.InstanciaColetavel = InstanciaColetavel.IdItem
	            WHERE Inventario.Jogador = ${idJogador} AND InstanciaColetavel.IdItem = ${idItem}`)
            .then((results: any) => {
                resultados = results.rows
            })
        return resultados;
    }

    public postAmizade = async (idJogador: number, idNpc: number): Promise<any> => {
        let resultados: Array<any> = [];
        await this.client.query(`
            INSERT INTO Amizade(idJogador, IdNpc) VALUES (${idJogador}, ${idNpc})`)
            .then((results: any) => {
                resultados = results.rows
            })
        return resultados[0];
    }
}

export default Postgree;