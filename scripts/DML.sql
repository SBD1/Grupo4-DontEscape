INSERT INTO Comodo (Nome, Descricao, SaidaDireita, SaidaEsquerda, SaidaMeio) VALUES 
('Fundo da garagem da base', 'Cômodo pequeno com um poço', null, null, null),
('Entrada da garagem da base', 'Cômodo com grande entrada e com mofo no teto', null, null, null),
('Meio da garagem da base', 'Cômodo com paredes descascadas e vigas aparentes', null, null, null),
('Porão da garagem da base', 'Lugar estreito com bastante sujeira', null, null, null),
('Exterior Frontal da base', 'Chão com grama seca com vista para uma floresta', null, null, null),
('Exterior Lateral da base', 'Uma parede que já esteve em melhores condições', null, null, null),
('Saída da base', 'Local rodeado por altas cercas', null, null, null),
('Exterior da igreja', 'Local bem arrumado para o fim do mundo, posso ver uma estátua de anjo', null, null, null),
('Interior da igreja', 'O reflexo do sol nos vitrais geram uma atmosfera sombria', null, null, null),
('Entrada do posto de gasolina', 'Três cheias e solitárias bombas de gasolina', null, null, null),
('Exterior do posto de gasolina', 'As prateleiras que um foram cheias, estão vazias', null, null, null),
('Escritório do posto de gasolina', 'Local bem arrumado cum uma poltrona e livros ao fundo', null, null, null),
('Exterior da loja', 'Uma grande área pavimentada com uma loja ao fundo', null, null, null),
('Interior da loja', 'Local escuro com grandes prateleiras vazias', null, null, null),
('Buraco extranho na loja', 'Local que um dia foi utilizado para guardar estoque', null, null, null),
('Cruzamento da rodovia', 'Cruzamento de três vias com dois carros colididos no meio', null, null, null);

INSERT INTO Localidade (ComodoInicial, nome) VALUES 
(7, 'Base'),
(8, 'Igreja'),
(10, 'Posto de Gasolina'),
(13, 'Loja'),
(16, 'Rodovia');

INSERT INTO Partida (TempoTotal, Qtdzumbis, DificuldadePartida) VALUES 
(600, 50, 'Fácil'),
(480, 50, 'Médio'),
(390, 82, 'Difícil');

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
(1, 'parede da esquerda'),
(2, 'Lixeira'),
(3, 'Lixeira'),
(4, 'Chão'),
(5, 'Buraco na parede'),
(6, 'Tronco de madeira'),
(7, 'Chão'),
(8, 'Chão'),
(9, 'Chão'),
(10, 'Chão'),
(11, 'Chão'),
(12, 'Caixa registradora quebrada'),
(13, 'Prateleira'),
(14, 'Caixa de primeiros socorros'),
(15, 'Embaixo da poltrona'),
(16, 'Chão'),
(17, 'Ao lado de Jeremy'),
(18, 'Parede da loja'),
(19, 'Fundo da loja'),
(20, 'Estante'),
(21, 'Ao lado da aranha'),
(22, 'Baira da estrada'),
(23, 'Chão'),
(24, 'Chão'),
(25, 'Chão'),
(26, 'Árvores');

--conferir pontuação correta
INSERT INTO Estado (Descricao, Pontos) VALUES
('Uma porta resistente aberta', 0), --1--
('Uma porta resistente fechada', 5), --2--
('A porta está trancada', 10), --3--
('Uma janela quebrada', 0), --4--
('A janela está bloqueada', 10), --5--
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
('Agora está fechado', 5), --16--
('Preciso achar algo para colocar aqui', 0), --17--
('Um buraco deve atrasá-los um pouco', 15), --18--
('Essa armadilha deve atrasá-los um pouco', 15), --19--
('O gerador não está funcionando', 0), --20--
('O gerador está conectado mas ainda está sem combustível', 0), --21--
('O gerador está desligado', 0), --22--
('O gerador está conectado mas ainda está desligado', 0), --23--
('O gerador está ligado', 0), --24--
('O gerador está ligado e agora a cerca também está eletrificada', 5), --25--
('Uma cerca quebrada', 0), --26--
('Essa cerca não vai segurá-los por muito tempo', 15), --27--
('Posso conseguir alguns gravetos com essas árvores', 0), --28--
('Já peguei algumas varas aqui', 0), --29--
('O tanque de gasolina está cheio', 0), --30--
('Agora posso pegar um pouco de gasolina dele', 0), --31--
('Não tem mais gasolia para eu pegar aqui', 0); --32--

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

INSERT INTO Personagem (Personagem) VALUES 
('inimigo'),
('npc'),
('npc'),
('npc');

INSERT INTO Inimigo (IdInimigo, Nome, Comodo, ItemProtegido) VALUES 
(1, 'Aranha Gigante', 15, 21);

INSERT INTO Npc (IdNpc, Nome, Comodo, AjudaEmTempo, FalaInicial, FalaAjuda, ItemBloqueado, ItemDesejado) VALUES 
(2, 'Padre Bernardo', 9, 50, 'Eu perdi minha fé, não há esperança para nenhum de nós. Apenas me deixe só para morrer', 'Vamos sair logo daqui', null, 18),
(3, 'Bill', 3, 0, 'A dor... não consigo suportar a dor', 'Obrigado, não sinto mais dor. Mas ainda estou infectado', null, 14),
(4, 'Jeremy', 15, 50, 'Oi, me chamo Jeremy. Me desculpe, não consigo ver perfeitamente, eu perdi meus óculos. Eu posso te ajudar se você encontrá-los para mim. Perdi eles em algum lugar dentro da loja', 'Obrigado, agora consigo ver perfeitamente', 17, 21);

-- Apos inserir itens
INSERT INTO MaquinaDeEstados(IdEstado, IdEstadoPossivel, Acao, idItem) VALUES
(01, 02, 'fechar', null),
(02, 01, 'Abrir', null ),
(02, 03, 'Trancar', 2),
(03, 02, 'Destrancar', 2),
(04, 05, 'Bloquear', 7),
(06, 07, 'Adicionar água', 13),
(06, 08, 'Adicionar cimento', 8),
(07, 09, 'Adicionar cimento', 8),
(08, 09, 'Adicionar água', 13),
(09, 10, 'Misturar', 1),
(12, 13, 'Quebrar', 4),
(14, 16, 'Fechar', null),
(16, 15, 'Abrir', null),
(17, 18, 'Cavar buraco', 1),
(17, 19, 'Colocar armadilha', 26),
(20, 21, 'Conectar', 3),
(20, 22, 'Adicionar gasolina', 11),
(21, 24, 'Adicionar gasolina', 11),
(22, 23, 'Conectar cabo', 3),
(22, 24, 'Ligar', null),
(24, 25, 'Conectar cabo', 3),
(24, 22, 'Desligar', null),
(25, 23, 'Desligar', null),
(26, 27, 'Consertar', 19),
(28, 29, 'Cortar', 6),
(30, 31, 'Colocar mangueira', 16),
(31, 32, 'Pegar gasolina', 10);

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

