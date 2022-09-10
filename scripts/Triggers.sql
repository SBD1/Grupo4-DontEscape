-- Verifica restriçoes do item coletado
CREATE OR REPLACE FUNCTION verifica_coletado() RETURNS trigger AS $verifica_coletado$
DECLARE
    idItem INTEGER := (SELECT IdItem FROM InstanciaColetavel WHERE IdInstanciaColetavel = NEW.InstanciaColetavel);
    idGalaoVazio INTEGER := (SELECT IdInstanciaColetavel FROM InstanciaColetavel IC WHERE IC.IdItem = 10 AND Jogador = NEW.Jogador);
BEGIN
    -- Verifica se o carrinho está no inventário do jogador para os itens pesados
    IF idItem = 7 OR idItem = 8 OR idItem = 19 THEN
        PERFORM * FROM Inventario WHERE Jogador = NEW.Jogador AND InstanciaColetavel = idCarrinho;
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Muito pesado para carregar com as mãos.';
        END IF;

    -- Verifica se o item que o jogador está tentando coletar é bloqueado por um NPC
    ELSEIF idItem = 17 THEN
        PERFORM * FROM Npc WHERE ItemBloqueado = 17;
        IF FOUND THEN
            PERFORM * FROM Amizade WHERE IdNpc = 4 AND IdJogador = New.Jogador AND Relacao = true;
            IF NOT FOUND THEN
                RAISE EXCEPTION 'Item Bloqueado';
            END IF;
        END IF;

    -- Verifica se o item que o jogador está tentando coletar é protegido por um inimigo
    ELSEIF idItem = 21 THEN
        PERFORM * FROM Inimigo WHERE ItemProtegido = 21;
        IF FOUND THEN
            PERFORM * FROM Enfrenta WHERE IdInimigo = 1 AND IdJogador = New.Jogador;
            IF NOT FOUND THEN
                RAISE EXCEPTION 'Não posso pegar os óculos sem passar pela aranha';
            END IF;
        END IF;

    -- Substitui o item "galão vazio" por "galão cheio" no inventário do jogador quando ele interage com o carro com a mangueira
    ELSEIF idItem = 11 THEN
        PERFORM * FROM InstanciaInteravel InstInteravel WHERE Jogador = NEW.Jogador AND 
        InstInteravel.IdItem = 36 AND InstInteravel.EstadoAtual = 31;
        IF NOT FOUND THEN
            RAISE EXCEPTION 'O tanque de gasolina está cheio';
        END IF;
    
	    DELETE FROM Inventario WHERE InstanciaColetavel = idGalaoVazio;
    
    END IF;
        UPDATE InstanciaColetavel SET FoiColetado = true WHERE IdInstanciaColetavel = NEW.InstanciaColetavel;

    RETURN NEW;
END;
$verifica_coletado$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS verifica_coletado ON Inventario;

CREATE TRIGGER verifica_coletado 
BEFORE INSERT ON Inventario
FOR EACH ROW 
EXECUTE PROCEDURE verifica_coletado();

-- Cria novas instancias de itens para cada jogador criado
CREATE OR REPLACE FUNCTION cria_Instancias() RETURNS trigger AS $cria_Instancias$
BEGIN

    INSERT INTO InstanciaInteravel (IdItem, EstadoAtual, Jogador) VALUES 
    (27, 1, NEW.IdJogador),
    (28, 4, NEW.IdJogador),
    (29, 6, NEW.IdJogador),
    (30, 12, NEW.IdJogador),
    (31, 14, NEW.IdJogador),
    (32, 17, NEW.IdJogador),
    (33, 20, NEW.IdJogador),
    (34, 26, NEW.IdJogador),
    (35, 28, NEW.IdJogador),
    (36, 30, NEW.IdJogador);

    INSERT INTO InstanciaColetavel (IdItem, FoiColetado, Jogador) VALUES
    (1, false, NEW.IdJogador),
    (2, false, NEW.IdJogador),
    (3, false, NEW.IdJogador),
    (4, false, NEW.IdJogador),
    (5, false, NEW.IdJogador),
    (6, false, NEW.IdJogador),
    (7, false, NEW.IdJogador),
    (8, false, NEW.IdJogador),
    (9, false, NEW.IdJogador),
    (10, false, NEW.IdJogador),
    (11, false, NEW.IdJogador),
    (12, false, NEW.IdJogador),
    (13, false, NEW.IdJogador),
    (14, false, NEW.IdJogador),
    (15, false, NEW.IdJogador),
    (16, false, NEW.IdJogador),
    (17, false, NEW.IdJogador),
    (18, false, NEW.IdJogador),
    (19, false, NEW.IdJogador),
    (20, false, NEW.IdJogador),
    (21, false, NEW.IdJogador),
    (22, false, NEW.IdJogador),
    (23, false, NEW.IdJogador),
    (24, false, NEW.IdJogador),
    (25, false, NEW.IdJogador),
    (26, false, NEW.IdJogador);

    RETURN NEW;
END;
$cria_Instancias$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS cria_Instancias ON jogador;

CREATE TRIGGER cria_Instancias 
AFTER INSERT ON Jogador
FOR EACH ROW 
EXECUTE PROCEDURE cria_Instancias();

-- Garantir especialização do coletavel
CREATE OR REPLACE FUNCTION garante_especializacao_coletavel() RETURNS trigger AS $garante_especializacao_coletavel$
BEGIN
    PERFORM * FROM Interavel WHERE NEW.IdColetavel = IdInteravel;
    IF FOUND THEN
        RAISE EXCEPTION 'Item já cadastrado como interavel';
    END IF;

    PERFORM * FROM Item WHERE NEW.IdColetavel = IdItem AND Tipo <> 'coletavel';
    IF FOUND THEN
        RAISE EXCEPTION 'Tipo do item incompatível';
    END IF;

    RETURN NEW;
END;
$garante_especializacao_coletavel$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS garante_especializacao_coletavel ON coletavel;

CREATE TRIGGER garante_especializacao_coletavel 
BEFORE UPDATE OR INSERT ON Coletavel
FOR EACH ROW EXECUTE PROCEDURE garante_especializacao_coletavel();

-- Garantir especialização do interavel
CREATE OR REPLACE FUNCTION garante_especializacao_interavel() RETURNS trigger AS $garante_especializacao_interavel$
BEGIN
    PERFORM * FROM Coletavel WHERE NEW.IdInteravel = IdColetavel;
    IF FOUND THEN
        RAISE EXCEPTION 'Item já cadastrado como coletavel';
    END IF;

    PERFORM * FROM Item WHERE NEW.IdInteravel = IdItem AND Tipo <> 'interavel';
    IF FOUND THEN
        RAISE EXCEPTION 'Tipo do item incompatível';
    END IF;

    RETURN NEW;
END;
$garante_especializacao_interavel$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS garante_especializacao_interavel ON interavel;

CREATE TRIGGER garante_especializacao_interavel 
BEFORE UPDATE OR INSERT ON interavel
FOR EACH ROW EXECUTE PROCEDURE garante_especializacao_interavel();

-- Garantir especialização do NPC
CREATE OR REPLACE FUNCTION garante_especializacao_npc() RETURNS trigger AS $garante_especializacao_npc$
BEGIN
    PERFORM * FROM Inimigo WHERE NEW.IdNpc = IdInimigo;
    IF FOUND THEN
        RAISE EXCEPTION 'Personagem já cadastrado como Inimigo';
    END IF;

    PERFORM * FROM Jogador WHERE NEW.IdNpc = IdJogador;
    IF FOUND THEN
        RAISE EXCEPTION 'Personagem já cadastrado como Jogador';
    END IF;

    PERFORM * FROM Personagem WHERE NEW.IdNpc = IdPersonagem AND Personagem <> 'npc';
    IF FOUND THEN
        RAISE EXCEPTION 'Tipo de personagem incompatível';
    END IF;

    RETURN NEW;
END;
$garante_especializacao_npc$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS garante_especializacao_npc ON NPC;

CREATE TRIGGER garante_especializacao_npc 
BEFORE UPDATE OR INSERT ON NPC
FOR EACH ROW EXECUTE PROCEDURE garante_especializacao_npc();

-- Garantir especialização do Jogador
CREATE OR REPLACE FUNCTION garante_especializacao_jogador() RETURNS trigger AS $garante_especializacao_jogador$
BEGIN
    PERFORM * FROM Inimigo WHERE NEW.IdJogador = IdInimigo;
    IF FOUND THEN
        RAISE EXCEPTION 'Personagem já cadastrado como Inimigo';
    END IF;

    PERFORM * FROM NPC WHERE NEW.IdJogador = IdNpc;
    IF FOUND THEN
        RAISE EXCEPTION 'Personagem já cadastrado como NPC';
    END IF;

    PERFORM * FROM Personagem WHERE NEW.IdJogador = IdPersonagem AND Personagem <> 'jogador';
    IF FOUND THEN
        RAISE EXCEPTION 'Tipo de personagem incompatível';
    END IF;

    RETURN NEW;
END;
$garante_especializacao_jogador$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS garante_especializacao_jogador ON jogador;

CREATE TRIGGER garante_especializacao_jogador 
BEFORE UPDATE OR INSERT ON Jogador
FOR EACH ROW EXECUTE PROCEDURE garante_especializacao_jogador();

-- Garantir especialização do Inimigo
CREATE OR REPLACE FUNCTION garante_especializacao_inimigo() RETURNS trigger AS $garante_especializacao_inimigo$
BEGIN
    PERFORM * FROM Jogador WHERE NEW.idInimigo = IdJogador;
    IF FOUND THEN
        RAISE EXCEPTION 'Personagem já cadastrado como Jogador';
    END IF;

    PERFORM * FROM NPC WHERE NEW.idInimigo = IdNpc;
    IF FOUND THEN
        RAISE EXCEPTION 'Personagem já cadastrado como NPC';
    END IF;

    PERFORM * FROM Personagem WHERE NEW.idInimigo = IdPersonagem AND Personagem <> 'inimigo';
    IF FOUND THEN
        RAISE EXCEPTION 'Tipo de personagem incompatível';
    END IF;

    RETURN NEW;
END;
$garante_especializacao_inimigo$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS garante_especializacao_inimigo ON Inimigo;

CREATE TRIGGER garante_especializacao_inimigo 
BEFORE UPDATE OR INSERT ON Inimigo
FOR EACH ROW EXECUTE PROCEDURE garante_especializacao_inimigo();

-- Procedure de enfrentamento
CREATE OR REPLACE FUNCTION enfrentamento() RETURNS trigger AS $enfrentamento$
DECLARE
    idItem INTEGER := (SELECT IdItem FROM InstanciaColetavel WHERE IdInstanciaColetavel = NEW.Arma);
    
BEGIN
    IF IdItem = 23 OR IdItem = 24 OR IdItem = 25 THEN
        NEW.Tempo := 0;
        DELETE FROM Inventario WHERE Inventario.InstanciaColetavel = NEW.Arma AND Inventario.Jogador = New.idJogador;
    ELSIF IdItem = 6 THEN
        NEW.Tempo := 10;
    ELSIF IdItem = 1 THEN
        NEW.Tempo := 30;
        UPDATE Jogador SET Situacao = 'fraco' WHERE IdJogador = New.idJogador;
    ELSE
        NEW.Tempo := 60;
        UPDATE Jogador SET Situacao = 'critico' WHERE IdJogador = New.idJogador;
    END IF;

    RETURN NEW;
END;
$enfrentamento$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enfrentamento ON Enfrenta;

CREATE TRIGGER enfrentamento 
BEFORE INSERT OR UPDATE 
ON Enfrenta FOR EACH ROW  
EXECUTE PROCEDURE enfrentamento();

-- Atualiza o estado da caixa de areia quando a janela muda para o estado bloqueado
CREATE OR REPLACE FUNCTION limpa_caixa_de_areia() RETURNS trigger AS $limpa_caixa_de_areia$
BEGIN

        UPDATE InstanciaInteravel SET EstadoAtual = 11 WHERE Jogador = NEW.Jogador
        AND IdItem = 29;

        DELETE FROM Inventario WHERE jogador=NEW.Jogador AND EXISTS (SELECT I.InstanciaColetavel, I.Jogador FROM (SELECT * FROM Inventario WHERE Jogador = NEW.Jogador) I     
										 JOIN InstanciaColetavel IC ON I.InstanciaColetavel = IC.IdInstanciaColetavel AND IC.IdItem = 7);
	
    RETURN NEW;
END;
$limpa_caixa_de_areia$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS limpa_caixa_de_areia ON InstanciaInteravel;

CREATE TRIGGER limpa_caixa_de_areia 
AFTER UPDATE ON InstanciaInteravel
FOR EACH ROW 
WHEN (old.idItem = 28)
EXECUTE PROCEDURE limpa_caixa_de_areia();