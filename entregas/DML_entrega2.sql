INSERT INTO Partida (IdPartida, TempoTotal, Qtdzumbis, DificuldadePartida) VALUES 
(1, 240, 20, 'F'),
(2, 180, 30, 'M'),
(3, 90, 40, 'D');

INSERT INTO TipoPersonagem (IdPersonagem, TipoPersonagem) VALUES 
(1, 'inimigo'),
(2, 'inimigo'),
(3, 'inimigo'),
(4, 'inimigo'),
(5, 'inimigo'),
(6, 'npc'),
(7, 'npc'),
(8, 'npc'),
(9, 'npc'),
(10, 'npc'),
(11, 'jogador'),
(12, 'jogador'),
(13, 'jogador'),
(14, 'jogador'),
(15, 'jogador');

INSERT INTO Inimigo (IdInimigo, Ataque, Nome) VALUES 
(1, 1, 'Rato'),
(2, 5, 'Aranha'),
(3, 10, 'Zumbi'),
(4, 15, 'Ratazana'),
(5, 20, 'Aranha Gigante');

INSERT INTO Npc (IdNpc, Nome, AjudaEmTempo, FalaInicial) VALUES 
(6, 'Padre Marvin', 5, 'oi'),
(7, 'Thane', 20, 'oi'),
(8, 'Leone', 15, 'oi'),
(9, 'Florinda', 15, 'oi'),
(10, 'Andrés', 20, 'oi');

INSERT INTO Comodo (IdComodo, Nome, Descricao, SaidaDireita, SaidaEsquerda, SaidaMeio) VALUES 
(1, 'Sala', 'Cômodo escuro com janelas', null, null, null),
(2, 'Quarto de Hóspede', 'Há bastante poeira', null, null, null),
(3, 'Suite', 'O chão aparece bastante sujo', null, null, null),
(4, 'Garagem', 'Há lixo por toda parte', null, null, null),
(5, 'Banheiro', 'Parece que algum animal tomou conta do lugar', null, null, null);

INSERT INTO Jogador (IdJogador, Nome, Partida, Comodo) VALUES 
(11, 'Arthur', 1, 1),
(12, 'Brenno', 2, 1),
(13, 'Eliás', 3, 1),
(14, 'Érick', 1, 1),
(15, 'Paulo', 2, 1);

INSERT INTO Amizade (IdJogador, IdNpc, Acao, Relacao) VALUES
(11, 6, 'oferecer', null),
(12, 7, 'oferecer quebrado', null),
(13, 8, 'tomar', null),
(14, 9, 'bater', null),
(15, 10, 'elogiar', null);

INSERT INTO Item (IdItem, Nome, Descricao, Lugar, Comodo, Tipo) VALUES 
(1, 'Machado', 'Um machado afiado útil para cortar árvores', 'Embaixo do sofá', 1, 'coletavel'),
(2, 'Revolver', 'Para se defender de qualquer perigo ', 'Dentro da gaveta', 2, 'coletavel'),
(3, 'Água', 'Mate sua sede', 'Filtro', 3, 'coletavel'),
(4, 'Carne', 'Se alimente com essa carne', 'Vasilha do cachorro', 4, 'coletavel'),
(5, 'Remédio para dor', 'Cure sua feridas com esse remédio', 'Armário', 5, 'coletavel'),
(6, 'Árvore', 'Corte arvores com o machado para coletar madeira', 'canto da sala', 1, 'naoColetavel'),
(7, 'Alvo', 'Treine sua pontaria com tiro ao alvo', 'parede', 4, 'naoColetavel'),
(8, 'Armário', 'Armazene seus items de cura dentro desse limpo armário', 'parede', 5, 'naoColetavel');

INSERT INTO Coletavel
SELECT IdItem FROM Item WHERE  Tipo = 'coletavel';

INSERT INTO NaoColetavel (IdNaoColetavel, DescricaoInicial) VALUES
(6, 'Parece bem firme, preciso de algo afiado'),
(7, 'Talvez dê para jogar algo'),
(8, 'Está trancado');

INSERT INTO Interage (IdItemInteravel, IdItemInteragido, Tempo) Values
(1, 6, 90),
(2, 7, 60),
(5, 8, 0),
(3, 4, 0);

INSERT INTO Localidade (IdLocalidade, ComodoInicial, nome) VALUES 
(1, 1, 'Base'),
(2, 2, 'Igreja'),
(3, 3, 'Posto'),
(4, 4, 'Floresta'),
(5, 5, 'Loja');

INSERT INTO Encaminha (IdLocalidade, IdLocalidadeAdjacente, Tempo) VALUES
(1, 2, 10),
(1, 3, 10),
(1, 4, 10),
(1, 5, 10),
(2, 3, 10),
(2, 4, 10),
(2, 5, 20),
(3, 4, 20),
(3, 5, 10),
(4, 5, 10);

INSERT INTO Estado (IdEstado, Descricao, Pontos) VALUES
(1, 'Já cortei esta árvore', 10),
(2, 'Agora o armário está fechado', 8),
(3, 'Está quebrado', 0);

INSERT INTO Inventario (Jogador, Coletavel) Values
(11, 1),
(11, 2),
(11, 3),
(12, 1),
(12, 3);

-- Adicionando comodos adjacentes
UPDATE Comodo SET SaidaDireita = 2, SaidaEsquerda = 3, SaidaMeio = 4 WHERE IdComodo = 1;
UPDATE Comodo SET SaidaDireita = 1, SaidaEsquerda = 3 WHERE IdComodo = 2;
UPDATE Comodo SET SaidaDireita = 5 WHERE IdComodo = 3;
UPDATE Comodo SET SaidaDireita = 1 WHERE IdComodo = 4;
UPDATE Comodo SET SaidaDireita = 3 WHERE IdComodo = 5;

--1. Selecionar comodo do jogador
SELECT IdJogador, Comodo FROM Jogador;

--2. Selecionar todos os itens coletaveis e não coletaveis de um cômodo
SELECT idItem, nome, descricao, lugar, comodo, tipo FROM Item WHERE Comodo = 1;

--3. Ver as amizades de um jogador
SELECT IdNpc, Acao FROM Amizade WHERE IdJogador = 12;

--4. Ver inventário do jogador
SELECT Coletavel FROM Inventario WHERE Jogador = 12;

--5. Adicionar item ao inventário
INSERT INTO Inventario (Jogador, Coletavel) VALUES (12, 2);

--6. Update de trocar lugar do jogador
UPDATE Jogador SET Comodo = 2 WHERE IdJogador = 12;

--7. Ver saídas de cômodo
SELECT SaidaDireita, SaidaMeio, SaidaEsquerda FROM Comodo WHERE IdComodo = 2;

--8. Listar inimigos com ataque maior que 10 
SELECT IdInimigo, Nome, Ataque FROM Inimigo WHERE Ataque > 10;