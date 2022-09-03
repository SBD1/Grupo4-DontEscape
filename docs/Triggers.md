# Triggers

|    Data    | Versão |        Descrição         |      Autor      |
| :--------: | :----: | :----------------------: | :-------------: |
| 03/09/2022 |  0.1   | Atualização do documento | Brenno Oliveira |

## Triggers v0.1

```sql
-- Verifica se o jogador possui o item "carrinho" no inventário para coletar os ítens pesados
CREATE OR REPLACE FUNCTION verifica_carrinho_foi_coletado() RETURNS trigger AS $verifica_carrinho_foi_coletado$
BEGIN
    PERFORM * FROM Inventario WHERE Jogador = NEW.Jogador AND InstanciaColetavel = 17;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Muito pesado para carregar com as mãos.';
    END IF;

    RETURN NEW;
END;
$verifica_carrinho_foi_coletado$ LANGUAGE plpgsql;

CREATE TRIGGER verifica_carrinho_foi_coletado
BEFORE INSERT ON Inventario
FOR EACH ROW
WHEN (NEW.InstanciaColetavel = 7 OR NEW.InstanciaColetavel = 8 OR NEW.InstanciaColetavel = 19)
EXECUTE PROCEDURE verifica_carrinho_foi_coletado();


-- Verifica se o item que o jogador está tentando coletar é bloqueado por um NPC
CREATE OR REPLACE FUNCTION verifica_bloqueado() RETURNS trigger AS $verifica_bloqueado$
BEGIN
    PERFORM * FROM Npc WHERE ItemBloqueado = 17;
    IF FOUND THEN
        RAISE EXCEPTION 'Item Bloqueado';
    END IF;

    RETURN NEW;
END;
$verifica_bloqueado$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS verifica_bloqueado ON inventario;

CREATE TRIGGER verifica_bloqueado
BEFORE INSERT ON Inventario
FOR EACH ROW
WHEN (NEW.InstanciaColetavel = 17)
EXECUTE PROCEDURE verifica_bloqueado();


-- Verifica se o item que o jogador está tentando coletar é protegido por um inimigo
CREATE OR REPLACE FUNCTION verifica_protegido() RETURNS trigger AS $verifica_protegido$
BEGIN
    PERFORM * FROM Inimigo WHERE ItemProtegido = 21;
    IF FOUND THEN
        RAISE EXCEPTION 'Não posso pegar os óculos sem passar pela aranha';
    END IF;

    RETURN NEW;
END;
$verifica_protegido$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS verifica_protegido ON inventario;

CREATE TRIGGER verifica_protegido
BEFORE INSERT ON Inventario
FOR EACH ROW
WHEN (NEW.InstanciaColetavel = 21)
EXECUTE PROCEDURE verifica_protegido();


-- Substitui o item "galão vazio" por "galão cheio" no inventário do jogador quando ele interage com o carro com a mangueira
CREATE OR REPLACE FUNCTION enche_galao() RETURNS trigger AS $enche_galao$
BEGIN
    PERFORM * FROM (SELECT * FROM InteracaoJogador WHERE idJogador = NEW.Jogador) IntJogador
    JOIN InstanciaInteravel InstInteravel ON IntJogador.IdInstanciaInteravel = InstInteravel.IdInstanciaInteravel
    AND InstInteravel.IdItem = 36 AND InstInteravel.EstadoAtual = 31;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'O tanque de gasolina está cheio';
    END IF;

	DELETE FROM Inventario WHERE jogador=NEW.Jogador AND EXISTS (SELECT I.InstanciaColetavel, I.Jogador FROM (SELECT * FROM Inventario WHERE Jogador = NEW.Jogador) I
										 JOIN InstanciaColetavel IC ON I.InstanciaColetavel = IC.IdInstanciaColetavel AND IC.IdItem = 10);

    RETURN NEW;
END;
$enche_galao$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enche_galao ON inventario;

CREATE TRIGGER enche_galao
BEFORE INSERT ON Inventario
FOR EACH ROW
WHEN (new.InstanciaColetavel = 11)
EXECUTE PROCEDURE enche_galao();


-- Cria novas instancias de itens para cada jogador criado
CREATE OR REPLACE FUNCTION cria_Instancia() RETURNS trigger AS $cria_Instancia$
BEGIN

WITH rows as ( INSERT INTO InstanciaInteravel (IdItem, EstadoAtual) VALUES (27, 1) RETURNING IdInstanciaInteravel )
INSERT INTO InteracaoJogador (IdInstanciaInteravel, IdJogador) SELECT IdInstanciaInteravel, NEW.IdJogador FROM rows;

WITH rows as ( INSERT INTO InstanciaInteravel (IdItem, EstadoAtual) VALUES (28, 4) RETURNING IdInstanciaInteravel )
INSERT INTO InteracaoJogador (IdInstanciaInteravel, IdJogador) SELECT IdInstanciaInteravel, NEW.IdJogador FROM rows;

WITH rows as ( INSERT INTO InstanciaInteravel (IdItem, EstadoAtual) VALUES (29, 6) RETURNING IdInstanciaInteravel )
INSERT INTO InteracaoJogador (IdInstanciaInteravel, IdJogador) SELECT IdInstanciaInteravel, NEW.IdJogador FROM rows;

WITH rows as ( INSERT INTO InstanciaInteravel (IdItem, EstadoAtual) VALUES (30, 12) RETURNING IdInstanciaInteravel )
INSERT INTO InteracaoJogador (IdInstanciaInteravel, IdJogador) SELECT IdInstanciaInteravel, NEW.IdJogador FROM rows;

WITH rows as ( INSERT INTO InstanciaInteravel (IdItem, EstadoAtual) VALUES (31, 14) RETURNING IdInstanciaInteravel )
INSERT INTO InteracaoJogador (IdInstanciaInteravel, IdJogador) SELECT IdInstanciaInteravel, NEW.IdJogador FROM rows;

WITH rows as ( INSERT INTO InstanciaInteravel (IdItem, EstadoAtual) VALUES (32, 17) RETURNING IdInstanciaInteravel )
INSERT INTO InteracaoJogador (IdInstanciaInteravel, IdJogador) SELECT IdInstanciaInteravel, NEW.IdJogador FROM rows;

WITH rows as ( INSERT INTO InstanciaInteravel (IdItem, EstadoAtual) VALUES (33, 20) RETURNING IdInstanciaInteravel )
INSERT INTO InteracaoJogador (IdInstanciaInteravel, IdJogador) SELECT IdInstanciaInteravel, NEW.IdJogador FROM rows;

WITH rows as ( INSERT INTO InstanciaInteravel (IdItem, EstadoAtual) VALUES (34, 26) RETURNING IdInstanciaInteravel )
INSERT INTO InteracaoJogador (IdInstanciaInteravel, IdJogador) SELECT IdInstanciaInteravel, NEW.IdJogador FROM rows;

WITH rows as ( INSERT INTO InstanciaInteravel (IdItem, EstadoAtual) VALUES (35, 28) RETURNING IdInstanciaInteravel )
INSERT INTO InteracaoJogador (IdInstanciaInteravel, IdJogador) SELECT IdInstanciaInteravel, NEW.IdJogador FROM rows;

WITH rows as ( INSERT INTO InstanciaInteravel (IdItem, EstadoAtual) VALUES (36, 30) RETURNING IdInstanciaInteravel )
INSERT INTO InteracaoJogador (IdInstanciaInteravel, IdJogador) SELECT IdInstanciaInteravel, NEW.IdJogador FROM rows;

    RETURN NEW;
END;
$cria_Instancia$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS cria_Instancia ON jogador;

CREATE TRIGGER cria_Instancia
AFTER INSERT ON Jogador
FOR EACH ROW
EXECUTE PROCEDURE cria_Instancia();

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

CREATE TRIGGER garante_especializacao_inimigo
BEFORE UPDATE OR INSERT ON Inimigo
FOR EACH ROW EXECUTE PROCEDURE garante_especializacao_inimigo();

-- Procedure de enfrentamento
CREATE OR REPLACE FUNCTION enfrentamento() RETURNS trigger AS $enfrentamento$
DECLARE
    idItem INTEGER := (SELECT IdItem FROM InstanciaColetavel WHERE IdInstanciaColetavel = NEW.Arma);

BEGIN
    IF IdItem = 23 OR IdItem = 24 OR IdItem = 25 THEN
        INSERT INTO Enfrenta (idJogador, idInimigo, Tempo) VALUES (New.idJogador, NEW.idInimigo, 0);
    ELSIF IdItem = 6 THEN
        INSERT INTO Enfrenta (idJogador, idInimigo, Tempo) VALUES (New.idJogador, NEW.idInimigo, 10);
    ELSIF IdItem = 1 THEN
        INSERT INTO Enfrenta (idJogador, idInimigo, Tempo) VALUES (New.idJogador, NEW.idInimigo, 30);
        UPDATE Jogador SET Situacao = 'fraco' WHERE IdJogador = New.idJogador;
    ELSE
        INSERT INTO Enfrenta (idJogador, idInimigo, Tempo) VALUES (New.idJogador, NEW.idInimigo, 60);
        UPDATE Jogador SET Situacao = 'critico' WHERE IdJogador = New.idJogador;
    END IF;

    RETURN NULL;
END;
$enfrentamento$ LANGUAGE plpgsql;

CREATE TRIGGER enfrentamento
BEFORE INSERT OR UPDATE
ON Enfrenta FOR EACH ROW
WHEN (pg_trigger_depth() = 0)
EXECUTE PROCEDURE enfrentamento();
```
