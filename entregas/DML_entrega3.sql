INSERT INTO Comodo (Nome, Descricao, SaidaDireita, SaidaEsquerda, SaidaMeio) VALUES 
('Fundo da garagem', '', null, null, null),
('Entrada da garagem', '', null, null, null),
('Meio da garagem', '', null, null, null),
('Porão da garagem', '', null, null, null),
('Exterior Frontal da base', '', null, null, null),
('Exterior Lateral da base', '', null, null, null),
('Saída da base', '', null, null, null),
('Exterior da igreja', '', null, null, null),
('Interior da igreja', '', null, null, null),
('Entrada do posto de gasolina', '', null, null, null),
('Exterior do posto de gasolina', '', null, null, null),
('Escritório do posto de gasolina', '', null, null, null),
('Exterior da loja', '', null, null, null),
('Interior da loja', '', null, null, null),
('Buraco extranho na loja', '', null, null, null),
('Cruzamento da rodovia', '', null, null, null);

INSERT INTO Localidade (ComodoInicial, nome) VALUES 
(7, 'Base'),
(8, 'Igreja'),
(10, 'Posto de Gasolina'),
(13, 'Loja'),
(16, 'Rodovia');

INSERT INTO Partida (TempoTotal, Qtdzumbis, DificuldadePartida) VALUES 
(540, 40, 'F'),
(480, 50, 'M'),
(420, 60, 'D');

INSERT INTO Item (Nome, Descricao, Comodo, Tipo) VALUES 
('Pá', 'Uma pá', 1, 'coletavel'), 
('Chave', 'Uma chave', 5, 'coletavel'),
('Par de cabos', 'Uma par de cabos', 5, 'coletavel'),
('Alicate', 'Uma alicate', 6, 'coletavel'),
('Bala', 'Tem uma bala 9mm escondida aqui', 6, 'coletavel'),
('Machado', 'Parece bem afiado', 8, 'coletavel'),
('Tijolos', 'Isso é muito pesado para pegar com a mão', 8, 'coletavel'),
('Saco de cimento', 'Isso é muito pesado para pegar com a mão', 8, 'coletavel'),
('Bala', 'Uma bala 9mm', 11, 'coletavel'),
('Galão vazio', 'Está vazio', 11, 'coletavel'),
('Galão cheio', 'Agora está cheio de gasolina', 11, 'coletavel'),
('Moeda', 'É meu dia de sorte, ainda tem uma moeda aqui', 10, 'coletavel'),
('Garrafa de água', 'Eu vou precisar dessa água', 10, 'coletavel'),
('Analgésicos', 'Os últimos analgésicos que sobraram', 10, 'coletavel'),
('Bala', 'Uma bala 9mm', 12, 'coletavel'),
('Mangueira', 'Uma pequena mangueira', 12, 'coletavel'),
('Carrinho de compras', 'Seria útil para carregar algo pesado', 13, 'coletavel'),
('Desenho', 'Um desenho de criança, isso me da muitas esperanças', 13, 'coletavel'),
('Cerca Nova', 'Isso é muito pesado para pegar com a mão', 13, 'coletavel'),
('Garrafa de álcool', 'Uma garrafa de álcool', 14, 'coletavel'),
('Óculos de Jeremy', 'Encontrei os óculos de Jeremy', 15, 'coletavel'),
('Pistola vazia', 'Uma pistola vazia', 16, 'coletavel'),
('Pistola carregada com uma bala', 'Tenho apenas uma bala', 16, 'coletavel'),
('Pistola carregada com duas bala', 'Tenho apenas duas balas', 16, 'coletavel'),
('Pistola carregada com três bala', 'Tenho apenas três balas', 16, 'coletavel'),
('Varas afiadas', 'Isso deve dar uma boa armadilha', 16, 'coletavel'),
('Porta', 'Talvez essa porta possa me salvar', 2, 'interavel'),
('Janela', 'Tenho que consertar isso', 3, 'interavel'),
('Caixa de areia', 'Acho que posso misturar algo aqui', 3, 'interavel'),
('Cadeado', 'Está trancado', 1, 'interavel'),
('Alçapão', 'Posso me esconder aqui', 1, 'interavel'),
('Chão', 'Parece um bom lugar para colocar uma armadilha', 5, 'interavel'),
('Gerador', 'Preciso ligar isso', 7, 'interavel'),
('Cerca', 'Se a cerca não estivesse quebrada eu me sentiria mais seguro', 7, 'interavel'),
('Árvores', 'A madeira dessas árvores pode ser útil para mim', 16, 'interavel'),
('Carro', 'Houve uma batida aqui, esses carros não devem funcionar mais', 16, 'interavel'),
('Bomba de gasolina', 'Acho que não está funcionando', 11, null),
('Poltrona', 'Infelizmente não tenho tempo para descansar agora', 12, null),
('Aquário', 'Todos os peixes estão mortos', 12, null),
('Máquina registradora', 'Está vazia', 14, null);

-- Colocar trigger
INSERT INTO Coletavel (IdColetavel, Lugar) VALUES
(1, 'Escostada na parede da esquerda'),
(2, 'Dentro da lixeira'),
(3, 'Dentro da lixeira'),
(4, 'No chão'),
(5, 'Em um buraco na parede'),
(6, 'Cravado em um tronco de madeira'),
(7, 'No chão'),
(8, 'No chão'),
(9, 'No chão'),
(10, 'No chão'),
(11, 'No chão'),
(12, 'Em uma caixa registradora quebrada'),
(13, 'Na prateleira'),
(14, 'Na caixa de primeiros socorros'),
(15, 'Embaixo da poltrona'),
(16, 'No chão'),
(17, 'Ao lado de Jeremy'),
(18, 'Pregado na parede da loja'),
(19, 'No fundo da loja'),
(20, 'Na estante'),
(21, 'Ao lado da aranha'),
(22, 'Caída na baira da estrada'),
(23, 'No chão'),
(24, 'No chão'),
(25, 'No chão'),
(26, 'Nas árvores');

INSERT INTO InstanciaColetavel (IdItem, FoiColetado) VALUES
(1, false),
(2, false),
(3, false),
(4, false),
(5, false),
(6, false),
(7, false),
(8, false),
(9, false),
(10, false),
(11, false),
(12, false),
(13, false),
(14, false),
(15, false),
(16, false),
(17, false),
(18, false),
(19, false),
(20, false),
(21, false),
(22, false),
(23, false),
(24, false),
(25, false),
(26, false);

--conferir pontuação correta
INSERT INTO Estado (Descricao, Pontos) VALUES
('Uma porta resistente aberta', 0), --1--
('Uma porta resistente fechada', 0), --2--
('A porta está trancada', 0), --3--
('Uma janela quebrada', 0), --4--
('A janela está bloqueada', 0), --5--
('Tem um pouco de areia aqui dentro', 0), --6--
('Tem um pouco de areia e água aqui dentro', 0), --7--
('Tem um pouco de areia e cimento aqui dentro', 0), --8--
('Tem um pouco de água e areia misturado com cimento aqui dentro', 0), --9--
('Está cheio de argamassa', 0), --10--
('Está vazio', 0), --11--
('Preciso achar um jeito de abrir isso', 0), --12--
('Quebrado', 0), --13--
('Está trancado', 0), --14--
('Esse alçapão aberto não me protejeria muito', 0), --15--
('Agora está fechado', 0), --16--
('Preciso achar algo para colocar aqui', 0), --17--
('Um buraco deve atrasá-los um pouco', 0), --18--
('Essa armadilha deve atrasá-los um pouco', 0), --19--
('O gerador não está funcionando', 0), --20--
('O gerador está conectado mas ainda está sem combustível', 0), --21--
('O gerador está desligado', 0), --22--
('O gerador está conectado mas ainda está desligado', 0), --23--
('O gerador está ligado', 0), --24--
('O gerador está ligado e agora a cerca também está eletrificada', 0), --25--
('Uma cerca quebrada', 0), --26--
('Essa cerca não vai segurá-los por muito tempo', 0), --27--
('Posso conseguir alguns gravetos com essas árvores', 0), --28--
('Já peguei algumas varas aqui', 0), --29--
('O tanque de gasolina está cheio', 0), --30--
('Agora posso pegar um pouco de gasolina dele', 0), --31--
('Não tem mais gasolia para eu pegar aqui', 0); --32--

-- SELECT IdItem FROM Item WHERE  Tipo = 'coletavel';

INSERT INTO Interavel (IdInteravel, EstadoInicial) VALUES
(27, 1),
(28, 4),
(29, 6),
(30, 12),
(31, 14),
(32, 17),
(33, 20),
(34, 26),
(35, 28),
(36, 30);

INSERT INTO InstanciaInteravel (IdItem, EstadoAtual) VALUES
(27, 1),
(28, 4),
(29, 6),
(30, 12),
(31, 14),
(32, 17),
(33, 20),
(34, 26),
(35, 28),
(36, 30),

(27, 1),
(28, 4),
(29, 6),
(30, 12),
(31, 14),
(32, 17),
(33, 20),
(34, 26),
(35, 28),
(36, 30);

INSERT INTO Personagem (Personagem) VALUES 
('inimigo'),
('npc'),
('npc'),
('npc'),
('jogador'),
('jogador');

INSERT INTO Inimigo (IdInimigo, Nome, Comodo, ItemProtegido) VALUES 
(1, 'Aranha Gigante', 15, 21);

INSERT INTO Npc (IdNpc, Nome, Comodo, AjudaEmTempo, FalaInicial, FalaAjuda, FalaAtrapalha, ItemBloqueado) VALUES 
(2, 'Padre Bernardo', 9, 50, 'Eu perdi minha fé, não há esperança para nenhum de nós. Apenas me deixe só para morrer', 'Vamos sair logo daqui', null, null),
(3, 'Bill', 3, 0, 'A dor... não consigo suportar a dor', 'Obrigado, não sinto mais dor. Mas ainda estou infectado', null, null),
(4, 'Jeremy', 15, 50, 'Oi, me chamo Jeremy. Me desculpe, não consigo ver perfeitamente, eu perdi meus óculos. Eu posso te ajudar se você encontrá-los para mim. Perdi eles em algum lugar dentro da loja', 'Obrigado, agora consigo ver perfeitamente', 'Desculpe, mas acho que não poderei te ajudar muito com meus óculos assim', 17);

INSERT INTO Jogador (Nome, Partida, Comodo) VALUES 
('Arthur', 2, 8),
('Paulo', 2, 8);

-- Apos inserir itens
INSERT INTO MaquinaDeEstados(IdEstado, IdEstadoPossivel, Acao) VALUES
(01, 02, 'fechar'),
(02, 01, 'Abrir'),
(02, 03, 'Trancar'),
(03, 02, 'Destrancar'),
(04, 05, 'Bloquear'),
(06, 07, 'Adicionar água'),
(06, 08, 'Adicionar cimento'),
(07, 09, 'Adicionar cimento'),
(08, 09, 'Adicionar água'),
(09, 10, 'Misturar'),
(12, 13, 'Quebrar'),
(14, 16, 'Fechar'),
(16, 15, 'Abrir'),
(17, 18, 'Cavar buraco'),
(17, 19, 'Colocar armadilha'),
(20, 21, 'Conectar'),
(20, 22, 'Adicionar gasolina'),
(21, 24, 'Adicionar gasolina'),
(22, 23, 'Conectar cabo'),
(22, 24, 'Ligar'),
(24, 25, 'Conectar cabo'),
(24, 22, 'Desligar'),
(25, 23, 'Desligar'),
(26, 27, 'Consertar'),
(28, 29, 'Cortar'),
(30, 31, 'Colocar mangueira'),
(31, 32, 'Pegar gasolina');

INSERT INTO Encaminha (IdLocalidade, IdLocalidadeAdjacente, Tempo) VALUES
(1, 2, 10),
(1, 3, 10),
(1, 4, 10),
(1, 5, 10),
(2, 3, 10),
(2, 4, 20),
(2, 5, 10),
(3, 4, 10),
(3, 5, 20),
(4, 5, 10);

INSERT INTO Tarefa (IdItemInterador, IdItemInteragido, Tempo) VALUES
(1, 29, 10),
(1, 32, 240),
(6, 35, 120),
(7, 28, 170),
(19, 34, 210),
(26, 32, 120);

INSERT INTO InteracaoJogador (IdInstanciaInteravel, IdJogador) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 2),
(12, 2),
(13, 2),
(14, 2),
(15, 2),
(16, 2),
(17, 2),
(18, 2),
(19, 2),
(20, 2);

-- Adicionando comodos adjacentes
UPDATE Comodo SET SaidaDireita = 3, SaidaEsquerda = 4 WHERE IdComodo = 1;
UPDATE Comodo SET SaidaDireita = 5, SaidaEsquerda = 3 WHERE IdComodo = 2;
UPDATE Comodo SET SaidaDireita = 2, SaidaEsquerda = 1 WHERE IdComodo = 3;
UPDATE Comodo SET SaidaDireita = 1 WHERE IdComodo = 4;
UPDATE Comodo SET SaidaDireita = 7, SaidaMeio = 2, SaidaEsquerda = 6 WHERE IdComodo = 5;
UPDATE Comodo SET SaidaDireita = 5 WHERE IdComodo = 6;
UPDATE Comodo SET SaidaEsquerda = 5 WHERE IdComodo = 7;
UPDATE Comodo SET SaidaDireita = 9 WHERE IdComodo = 8;
UPDATE Comodo SET SaidaDireita = 8 WHERE IdComodo = 9;
UPDATE Comodo SET SaidaDireita = 12, SaidaEsquerda = 11 WHERE IdComodo = 10;
UPDATE Comodo SET SaidaDireita = 10 WHERE IdComodo = 11;
UPDATE Comodo SET SaidaDireita = 10 WHERE IdComodo = 12;
UPDATE Comodo SET SaidaDireita = 14 WHERE IdComodo = 13;
UPDATE Comodo SET SaidaDireita = 15, SaidaEsquerda = 13 WHERE IdComodo = 14;
UPDATE Comodo SET SaidaEsquerda = 14 WHERE IdComodo = 15;

