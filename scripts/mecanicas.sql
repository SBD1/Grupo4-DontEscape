-- Selecionar comodo do jogador
SELECT IdJogador, Comodo FROM Jogador;

-- Selecionar todos os itens coletaveis e não coletaveis de um cômodo
SELECT idItem, nome, descricao, lugar, comodo, tipo FROM Item WHERE Comodo = 1;

-- Ver as amizades de um jogador
SELECT IdNpc, Acao FROM Amizade WHERE IdJogador = 12;

-- Ver inventário do jogador
SELECT Coletavel FROM Inventario WHERE Jogador = 12;

-- Adicionar item ao inventário
INSERT INTO Inventario (Jogador, Coletavel) VALUES (12, 2);

-- Update de trocar lugar do jogador
UPDATE Jogador SET Comodo = 2 WHERE IdJogador = 12;

-- Ver saídas de cômodo
SELECT SaidaDireita, SaidaMeio, SaidaEsquerda FROM Comodo WHERE IdComodo = 2;

-- Listar inimigos com ataque maior que 10 
SELECT IdInimigo, Nome, Ataque FROM Inimigo WHERE Ataque > 10;

-- lista de itens coletáveis do comodo do jogador
SELECT I.idItem, I.tipo FROM Item I join Jogador p on I.Comodo = p.Comodo 
Group by I.idItem HAVING I.tipo='coletavel';

-- lista de lugares possíveis para inspecionar no comodo do jogador
SELECT C.idColetavel, C.lugar 
	from (SELECT I.idItem, I.tipo FROM Item I join Jogador p on I.Comodo = p.Comodo 
			Group by I.idItem HAVING I.tipo='coletavel') n1 
	join Coletavel C on C.idColetavel = n1.idItem;
	
-- recuperar todos os itens que estão no lugar escolhido para inspecionar, "No chão", por exemplo
SELECT * 
	from (
		SELECT C.idColetavel, C.lugar 
		from (SELECT I.idItem, I.tipo FROM Item I join Jogador p on I.Comodo = p.Comodo 
			Group by I.idItem HAVING I.tipo='coletavel') n1 
		join Coletavel C on C.idColetavel = n1.idItem
	) n2 
	join Item I on (I.idItem = n2.IdColetavel and n2.lugar = 'No chão');
	

-- INSERT INTO Inventario (Jogador, InstanciaColetavel) VALUE
-- (5, 8);
	
-- enfrenamento entre jogador e inimigo
INSERT INTO Enfrenta(idJogador, idInimigo, Arma) VALUES (5, 1, 24);

-- selecionar inimigo de um comodo
SELECT * FROM Inimigo WHERE Comodo = 12;