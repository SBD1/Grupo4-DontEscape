import { env } from "process";
import { Coletavel } from "../interfaces/coletavel";
import { Comodo } from "../interfaces/comodo";
import { Inimigo } from "../interfaces/inimigo";
import { InstanciaColetavel } from "../interfaces/instanciaColetavel";
import { Inventario } from "../interfaces/inventario";
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

    public postLogin = async (name: string, partida: number, comodo: number) => {
        let resultados : string = "";
        await this.client.query(`
            DO $$
            DECLARE tableId integer;
            BEGIN
            INSERT INTO Personagem (Personagem) VALUES ('jogador') RETURNING IdPersonagem INTO tableId;
            INSERT INTO Jogador (IdJogador, nome, partida, comodo) VALUES (tableId, '${name}', ${partida}, ${comodo});
            END $$;
        `)
        .then((results: any) => {
            resultados = results.rows
        });
        return resultados[0];
    };

    public getLogin = async (name: string) => {
        let response : Array<Jogador> = [];
        await this.client.query(`SELECT * FROM Jogador WHERE nome = '${name}'`)
            .then((results: any) => {
                response = results.rows
            })
        return response[0];
    };

    public getLocalidades = async (): Promise<any[]> => {
        let resultados: Array<any> = [];
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
        await this.client.query(`SELECT C.lugar FROM
                                    (SELECT I.idItem
                                        FROM (SELECT * FROM InstanciaColetavel IC WHERE IC.foiColetado = false AND IC.jogador = ${jogador.idjogador}) n1
                                        JOIN Item I on I.Comodo = ${jogador.comodo} AND I.idItem = n1.idItem
                                            GROUP BY I.idItem HAVING I.tipo='coletavel') n2
                                    JOIN Coletavel C on C.idColetavel = n2.idItem; `)
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

    public postInventarioJogador = async (idJogador: Number, idInstanciaColetavel: Number): Promise<Number> => {
        let resultados: Array<Inventario> = [];
        try {
            await this.client.query(`
                INSERT INTO Inventario (Jogador, InstanciaColetavel) VALUES (${idJogador}, ${idInstanciaColetavel})`)
                .then((results: any) => {
                    resultados = results.rows
                })
        } catch (error) {
            return 0;
        }
        return 1;
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

    public getInstanciaColetavel = async (idColetavel: Number, idJogador: Number): Promise<InstanciaColetavel> => {
        let resultados: Array<InstanciaColetavel> = [];
        await this.client.query(`
            SELECT * FROM InstanciaColetavel WHERE IdItem = ${idColetavel} AND Jogador = ${idJogador}`)
            .then((results: any) => {
                resultados = results.rows
            })
        return resultados[0];
    }

    public getItem = async (idItem: Number): Promise<Item> => {
        let resultados: Item[] = [];

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

    public putJogador = async (oldIdJogador: number, idComodo: Number): Promise<any> => {
        let resultados: Array<any> = [];
        await this.client.query(`
            UPDATE Jogador SET comodo = ${idComodo} WHERE IdJogador = ${oldIdJogador}`)
            .then((results: any) => {
                resultados = results.rows
            })
        return resultados[0];
    }


}

export default Postgree;