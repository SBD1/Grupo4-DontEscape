import Pg from 'pg';
import dotenv from 'dotenv';
import chalk from "chalk";
const PgClient = Pg.Client;
dotenv.config();
class Postgree {
    client = new PgClient({
        user: process.env.USER,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: process.env.PORT
    });
    constructor() {
        this.client.connect();
        console.log(chalk.green.bold("Conected"));
    }
    postRegister = async (name, partida, comodo) => {
        let resultados = "";
        await this.client.query(`
            DO $$
            DECLARE tableId integer;
            BEGIN
            INSERT INTO Personagem (Personagem) VALUES ('jogador') RETURNING IdPersonagem INTO tableId;
            INSERT INTO Jogador (IdJogador, nome, partida, comodo) VALUES (tableId, '${name}', ${partida}, ${comodo});
            END $$;
        `)
            .then((results) => {
            resultados = results.rows;
        });
        return resultados[0];
    };
    getLogin = async (name) => {
        let response = [];
        await this.client.query(`SELECT * FROM Jogador WHERE nome = '${name}'`)
            .then((results) => {
            response = results.rows;
        });
        return response[0];
    };
    getLocalidades = async () => {
        let resultados = [];
        await this.client.query(`SELECT * FROM Localidade ORDER BY idLocalidade ASC`)
            .then((results) => {
            resultados = results.rows;
        });
        return resultados;
    };
    getPlayerLocalidade = async (comodoInical) => {
        let resultados = [];
        await this.client.query(`SELECT nome, ComodoInicial FROM Localidade WHERE Localidade.ComodoInicial = ${comodoInical}`)
            .then((results) => {
            resultados = results.rows;
        });
        return resultados[0];
    };
    getComodo = async (Jogador) => {
        let resultado = [];
        await this.client.query(`SELECT * FROM Comodo WHERE idComodo = ${Jogador.comodo}`)
            .then((results) => {
            resultado = results.rows;
        });
        return resultado[0];
    };
    openMap = async (localidade) => {
        let resultados = [];
        await this.client.query(`SELECT nome, idcomodo, SaidaDireita, SaidaEsquerda, SaidaMeio FROM Comodo WHERE Comodo.IdComodo = ${localidade}`)
            .then((results) => {
            resultados = results.rows;
        });
        return resultados[0];
    };
    getLugares = async (jogador) => {
        let resultados = [];
        await this.client.query(`SELECT C.lugar FROM
                                    (SELECT I.idItem
                                        FROM (SELECT * FROM InstanciaColetavel IC WHERE IC.foiColetado = false AND IC.jogador = ${jogador.idjogador}) n1
                                        JOIN Item I on I.Comodo = ${jogador.comodo} AND I.idItem = n1.idItem
                                            GROUP BY I.idItem HAVING I.tipo='coletavel') n2
                                    JOIN Coletavel C on C.idColetavel = n2.idItem; `)
            .then((results) => {
            resultados = results.rows;
        });
        return resultados;
    };
    getColetaveis = async (jogador, lugar) => {
        let resultados = [];
        await this.client.query(`SELECT * 
                                    from (
                                        SELECT C.idColetavel, C.lugar 
                                        from (SELECT I.idItem, I.tipo FROM Item I WHERE I.Comodo = ${jogador.comodo} 
                                            Group by I.idItem HAVING I.tipo='coletavel') n1 
                                        join Coletavel C on C.idColetavel = n1.idItem
                                    ) n2 
                                    join Item I on (I.idItem = n2.IdColetavel and n2.lugar = '${lugar}');`)
            .then((results) => {
            resultados = results.rows;
        });
        return resultados;
    };
    getInteraveis = async (jogador) => {
        let resultados = [];
        await this.client.query(`SELECT n1.nome, idInstanciaInteravel,  II.idItem, estadoAtual, jogador FROM
                                (SELECT * FROM Item I WHERE I.Comodo = ${jogador.comodo} AND I.tipo = 'interavel') n1
                                join InstanciaInteravel II on II.Jogador = ${jogador.idjogador} AND n1.idItem = II.idItem`)
            .then((results) => {
            resultados = results.rows;
        });
        return resultados;
    };
    getEstado = async (idEstado) => {
        let resultados = [];
        await this.client.query(`SELECT * FROM Estado WHERE idestado = ${(idEstado)};`)
            .then((results) => {
            resultados = results.rows;
        });
        return resultados[0];
    };
    getInventarioJogador = async (idJogador = 7) => {
        let resultados = [];
        await this.client.query(`
            SELECT I.idItem, instanciacoletavel, nome, descricao FROM 
            (SELECT I.Jogador, instanciaColetavel, idItem 
                 FROM Inventario I JOIN InstanciaColetavel IC ON I.Jogador = ${idJogador} AND I.instanciaColetavel = IC.idInstanciaColetavel) n1
            JOIN Item I ON n1.IdItem = I.idItem`)
            .then((results) => {
            resultados = results.rows;
        });
        return resultados;
    };
    postInventarioJogador = async (idJogador, idInstanciaColetavel) => {
        let resultados = [];
        try {
            await this.client.query(`
                INSERT INTO Inventario (Jogador, InstanciaColetavel) VALUES (${idJogador}, ${idInstanciaColetavel})`)
                .then((results) => {
                resultados = results.rows;
            });
        }
        catch (error) {
            return 0;
        }
        return 1;
    };
    postEnfrentamento = async (idJogador, idInimigo, idArma) => {
        let resultados = [];
        await this.client.query(`
            INSERT INTO Enfrenta(idJogador, idInimigo, Arma) VALUES (${idJogador}, ${idInimigo}, ${idArma ? idArma : null})`)
            .then((results) => {
            resultados = results.rows;
        });
        return resultados[0];
    };
    getInimigo = async (idComodo) => {
        let resultados = [];
        await this.client.query(`
        SELECT * FROM Inimigo WHERE Comodo = ${idComodo}`)
            .then((results) => {
            resultados = results.rows;
        });
        return resultados[0];
    };
    getNpc = async (idComodo) => {
        let resultados = [];
        await this.client.query(`
        SELECT * FROM Npc WHERE Comodo = ${idComodo}`)
            .then((results) => {
            resultados = results.rows;
        });
        return resultados[0];
    };
    getInstanciaColetavel = async (idColetavel, idJogador) => {
        let resultados = [];
        await this.client.query(`
            SELECT * FROM InstanciaColetavel WHERE IdItem = ${idColetavel} AND Jogador = ${idJogador}`)
            .then((results) => {
            resultados = results.rows;
        });
        return resultados[0];
    };
    getItem = async (idItem) => {
        let resultados = [];
        await this.client.query(`
            SELECT * FROM Item WHERE IdItem = ${idItem}`)
            .then((results) => {
            resultados = results.rows;
        });
        return resultados[0];
    };
    getArmaInventarioJogador = async (idJogador) => {
        let resultados = [];
        await this.client.query(`
            SELECT Item.nome, Item.IdItem, Inventario.InstanciaColetavel FROM Item
	            JOIN InstanciaColetavel
	            ON InstanciaColetavel.IdItem = Item.IdItem AND InstanciaColetavel.Jogador = ${idJogador}
	            JOIN Inventario
	            ON Inventario.InstanciaColetavel = InstanciaColetavel.IdItem
	            WHERE Inventario.Jogador = ${idJogador} AND (InstanciaColetavel.IdItem = 23 OR InstanciaColetavel.IdItem = 24 OR InstanciaColetavel.IdItem = 25 OR InstanciaColetavel.IdItem = 6 OR InstanciaColetavel.IdItem = 1)`)
            .then((results) => {
            resultados = results.rows;
        });
        return resultados;
    };
    getEnfrenta = async (idJogador, idInimigo) => {
        let resultados = [];
        await this.client.query(`
            SELECT * FROM Enfrenta WHERE Enfrenta.idJogador = ${idJogador} AND Enfrenta.idInimigo = ${idInimigo}`)
            .then((results) => {
            resultados = results.rows;
        });
        return resultados[0];
    };
    getAmizade = async (idJogador, idNpc) => {
        let resultados = [];
        await this.client.query(`
            SELECT * FROM Amizade WHERE Amizade.idJogador = ${idJogador} AND Amizade.idNpc = ${idNpc}`)
            .then((results) => {
            resultados = results.rows;
        });
        return resultados[0];
    };
    getItemInventarioJogador = async (idJogador, idItem) => {
        let resultados = [];
        await this.client.query(`
            SELECT Item.nome, Item.IdItem, Inventario.InstanciaColetavel FROM Item
	            JOIN InstanciaColetavel
	            ON InstanciaColetavel.IdItem = Item.IdItem AND InstanciaColetavel.Jogador = ${idJogador}
	            JOIN Inventario
	            ON Inventario.InstanciaColetavel = InstanciaColetavel.IdItem
	            WHERE Inventario.Jogador = ${idJogador} AND InstanciaColetavel.IdItem = ${idItem}`)
            .then((results) => {
            resultados = results.rows;
        });
        return resultados;
    };
    postAmizade = async (idJogador, idNpc) => {
        let resultados = [];
        await this.client.query(`
            INSERT INTO Amizade(idJogador, IdNpc) VALUES (${idJogador}, ${idNpc})`)
            .then((results) => {
            resultados = results.rows;
        });
        return resultados[0];
    };
    putJogador = async (oldIdJogador, idComodo) => {
        let resultados = [];
        await this.client.query(`
            UPDATE Jogador SET comodo = ${idComodo} WHERE IdJogador = ${oldIdJogador}`)
            .then((results) => {
            resultados = results.rows;
        });
        return resultados[0];
    };
    getPartidas = async () => {
        let resultados = [];
        await this.client.query(`
            SELECT * FROM Partida`)
            .then((results) => {
            resultados = results.rows;
        });
        return resultados;
    };
}
export default Postgree;
