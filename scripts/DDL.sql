DROP TABLE Comodo CASCADE;
DROP TABLE Localidade CASCADE;
DROP TABLE Item CASCADE;
DROP TABLE Coletavel CASCADE;
DROP TABLE InstanciaColetavel CASCADE;
DROP TABLE Estado CASCADE;
DROP TABLE Interavel CASCADE;
DROP TABLE InstanciaInteravel CASCADE;
DROP TABLE Partida CASCADE;
DROP TABLE Personagem CASCADE;
DROP TABLE Inimigo CASCADE;
DROP TABLE Npc CASCADE;
DROP TABLE Jogador CASCADE;
DROP TABLE Amizade CASCADE;
DROP TABLE MaquinaDeEstados CASCADE;
DROP TABLE Encaminha CASCADE;
DROP TABLE Inventario CASCADE;
DROP TABLE Tarefa CASCADE;
DROP TABLE Enfrenta CASCADE;

DROP TYPE Dificuldade CASCADE;
DROP TYPE TipoPersonagem CASCADE;
DROP TYPE TipoItem CASCADE;
DROP TYPE TipoSituacao CASCADE;


CREATE TYPE Dificuldade AS ENUM('Fácil', 'Médio', 'Difícil');
CREATE TYPE TipoPersonagem AS ENUM('inimigo', 'npc', 'jogador');
CREATE TYPE TipoItem AS ENUM('coletavel', 'interavel');
CREATE TYPE TipoSituacao AS ENUM('normal', 'fraco', 'critico');

CREATE TABLE Comodo (
    IdComodo SERIAL,
    Nome VARCHAR(50) NOT NULL,
    Descricao VARCHAR(100) NOT NULL,
    SaidaDireita INTEGER,
    SaidaEsquerda INTEGER,
    SaidaMeio INTEGER,
    
    CONSTRAINT Comodo_pk PRIMARY KEY(IdComodo),
    CONSTRAINT id_SaidaDireita_fk FOREIGN KEY(SaidaDireita) REFERENCES Comodo(IdComodo),
    CONSTRAINT id_SaidaEsquerda_fk FOREIGN KEY(SaidaEsquerda) REFERENCES Comodo(IdComodo),
    CONSTRAINT id_SaidaMeio_fk FOREIGN KEY(SaidaMeio) REFERENCES Comodo(IdComodo)
);

CREATE TABLE Localidade (
    IdLocalidade SERIAL,
    ComodoInicial INTEGER NOT NULL,
	Nome VARCHAR(50) NOT NULL,
    
    CONSTRAINT Localidade_pk PRIMARY KEY(IdLocalidade),
    CONSTRAINT id_ComodoInicial_fk FOREIGN KEY(ComodoInicial) REFERENCES Comodo(IdComodo)
);

CREATE TABLE Item (
    IdItem SERIAL,
    Nome VARCHAR(50) NOT NULL,
    Descricao VARCHAR(100) NOT NULL,
    Comodo INTEGER NOT NULL,
    Tipo TipoItem,
    
    CONSTRAINT item_pk PRIMARY KEY(IdItem),
    CONSTRAINT id_Comodo_fk FOREIGN KEY(Comodo) REFERENCES Comodo(IdComodo)
);

CREATE TABLE Coletavel (
    IdColetavel INTEGER,
    Lugar VARCHAR(50) NOT NULL,
    
    CONSTRAINT id_coletavel_pk PRIMARY KEY(IdColetavel),
    CONSTRAINT id_Item_fk FOREIGN KEY(IdColetavel) REFERENCES Item(IdItem)
);

CREATE TABLE Estado (
    IdEstado SERIAL,
	Descricao VARCHAR(100) NOT NULL,
    Pontos INTEGER NOT NULL,
    
    CONSTRAINT Estado_pk PRIMARY KEY(IdEstado)
);

CREATE TABLE Interavel (
    IdInteravel INTEGER,
    EstadoInicial INTEGER NOT NULL,
    
    CONSTRAINT id_interavel_pk PRIMARY KEY (IdInteravel),
    CONSTRAINT id_interavel_fk FOREIGN KEY(IdInteravel) REFERENCES Item(IdItem),
    CONSTRAINT estadoInicial_fk FOREIGN KEY(EstadoInicial) REFERENCES Estado(IdEstado)
);

CREATE TABLE Partida (
    IdPartida SERIAL,
    TempoTotal INTEGER NOT NULL,
    Qtdzumbis INTEGER NOT NULL,
    DificuldadePartida Dificuldade NOT NULL,

    CONSTRAINT partida_pk PRIMARY KEY(IdPartida)
);

CREATE TABLE Personagem (
    IdPersonagem SERIAL,
    Personagem TipoPersonagem NOT NULL,

    CONSTRAINT personagem_pk PRIMARY KEY(IdPersonagem)
);

CREATE TABLE Jogador (
    IdJogador INTEGER,
    Nome VARCHAR(20) NOT NULL,
    Partida INTEGER NOT NULL,
    Comodo INTEGER NOT NULL,
    Situacao TipoSituacao DEFAULT 'normal',
    
    CONSTRAINT jogador_pk PRIMARY KEY(IdJogador),
    CONSTRAINT id_Comodo_fk FOREIGN KEY(Comodo) REFERENCES Comodo(IdComodo),
    CONSTRAINT id_Partida_fk FOREIGN KEY(Partida) REFERENCES Partida(IdPartida),
    CONSTRAINT id_Personagem_fk FOREIGN KEY(IdJogador) REFERENCES Personagem(IdPersonagem)
);

CREATE TABLE InstanciaColetavel (
    IdInstanciaColetavel SERIAL,
    IdItem INTEGER NOT NULL,
    FoiColetado BOOL NOT NULL,
	Jogador INTEGER NOT NULL,
    
    CONSTRAINT id_instanciaColetavel_pk PRIMARY KEY (IdInstanciaColetavel),
    CONSTRAINT id_item_fk FOREIGN KEY(IdItem) REFERENCES Item(IdItem),
	CONSTRAINT id_jogador_fk FOREIGN KEY(Jogador) REFERENCES Jogador(idJogador)
);

CREATE TABLE InstanciaInteravel (
    IdInstanciaInteravel SERIAL,
    IdItem INTEGER NOT NULL,
    EstadoAtual INTEGER NOT NULL,
    Jogador INTEGER NOT NULL,
    
    CONSTRAINT id_instancia_interavel_pk PRIMARY KEY (IdInstanciaInteravel),
    CONSTRAINT id_item_fk FOREIGN KEY(IdItem) REFERENCES Item(IdItem),
    CONSTRAINT id_estadoAtual_fk FOREIGN KEY(EstadoAtual) REFERENCES Estado(IdEstado),
    CONSTRAINT id_jogador_fk FOREIGN KEY(Jogador) REFERENCES Jogador(idJogador)
);

CREATE TABLE Inimigo (
    IdInimigo INTEGER,
    Nome VARCHAR(20) NOT NULL,
    Comodo INTEGER NOT NULL,
    ItemProtegido INTEGER,

    CONSTRAINT inimigo_pk PRIMARY KEY(IdInimigo),
    CONSTRAINT id_Comodo_fk FOREIGN KEY(Comodo) REFERENCES Comodo(IdComodo),
    CONSTRAINT id_presonagem_fk FOREIGN KEY(IdInimigo) REFERENCES Personagem(IdPersonagem),
    CONSTRAINT id_itemProtegido_fk FOREIGN KEY(ItemProtegido) REFERENCES Coletavel(IdColetavel)
);

CREATE TABLE Npc (
    IdNpc INTEGER,
    Nome VARCHAR(20) NOT NULL,
    Comodo INTEGER NOT NULL,
    AjudaEmTempo INTEGER CHECK(AjudaEmTempo >= 0 AND AjudaEmTempo <= 100),
	FalaInicial VARCHAR(200) NOT NULL,
	FalaAjuda VARCHAR(200) NOT NULL,
    ItemDesejado INTEGER NOT NULL,
    ItemBloqueado INTEGER,
    
    CONSTRAINT npc_pk PRIMARY KEY(IdNpc),
    CONSTRAINT id_Comodo_fk FOREIGN KEY(Comodo) REFERENCES Comodo(IdComodo),
    CONSTRAINT id_presonagem_fk FOREIGN KEY(IdNpc) REFERENCES Personagem(IdPersonagem),
    CONSTRAINT id_ItemDesejado_fk FOREIGN KEY(ItemDesejado) REFERENCES Coletavel(IdColetavel),
    CONSTRAINT id_itemBloqueado_fk FOREIGN KEY(ItemBloqueado) REFERENCES Coletavel(IdColetavel)

);

CREATE TABLE Amizade (
    IdJogador INTEGER,
    IdNpc INTEGER,
    
    CONSTRAINT amizade_pk PRIMARY KEY(IdJogador, IdNpc),
    CONSTRAINT id_Jogador_fk FOREIGN KEY(IdJogador) REFERENCES Jogador(IdJogador),
    CONSTRAINT id_Npc_fk FOREIGN KEY(IdNpc) REFERENCES Npc(IdNpc)
);

CREATE TABLE MaquinaDeEstados (
    IdEstado INTEGER,
    IdEstadoPossivel INTEGER,
	Acao VARCHAR(100) NOT NULL,
    idItem INTEGER,
    
    CONSTRAINT maquinaDeEstados_pk PRIMARY KEY(IdEstado, IdEstadoPossivel),
    CONSTRAINT id_estado_fk FOREIGN KEY(IdEstado) REFERENCES Estado(IdEstado),
    CONSTRAINT id_estadoPossivel_fk FOREIGN KEY(IdEstadoPossivel) REFERENCES Estado(IdEstado),
    CONSTRAINT id_item_fk FOREIGN KEY(idItem) REFERENCES Item(idItem)
);

CREATE TABLE Encaminha (
    IdLocalidade INTEGER,
	IdLocalidadeAdjacente INTEGER,
    Tempo INTEGER NOT NULL,
    
    CONSTRAINT encaminha_pk PRIMARY KEY(IdLocalidade, IdLocalidadeAdjacente),
    CONSTRAINT id_Localidade_fk FOREIGN KEY(IdLocalidade) REFERENCES Localidade(IdLocalidade),
	CONSTRAINT id_Localidade_Adjacente_fk FOREIGN KEY(IdLocalidadeAdjacente) REFERENCES Localidade(IdLocalidade)
);

CREATE TABLE Inventario (
    Jogador INTEGER,
    InstanciaColetavel INTEGER,
    
    CONSTRAINT inventario_pk PRIMARY KEY(Jogador, InstanciaColetavel),
    CONSTRAINT id_jogador_fk FOREIGN KEY(Jogador) REFERENCES Jogador(IdJogador),
    CONSTRAINT id_instanciaColetavel_fk FOREIGN KEY(InstanciaColetavel) REFERENCES InstanciaColetavel(IdInstanciaColetavel)
);

CREATE TABLE Tarefa (
    IdTarefa SERIAL,
    IdItemInterador INTEGER NOT NULL,
    IdItemInteragido INTEGER NOT NULL,
	Tempo INTEGER NOT NULL,
    
    CONSTRAINT tarefa_pk PRIMARY KEY(idTarefa),
    CONSTRAINT id_item_interador FOREIGN KEY(IdItemInterador) REFERENCES Item(IdItem),
    CONSTRAINT id__item_Interagido FOREIGN KEY(IdItemInteragido) REFERENCES Item(IdItem)
);

CREATE TABLE Enfrenta (
    idJogador INTEGER,
    idInimigo INTEGER,
    Arma INTEGER,
    Tempo INTEGER,

    CONSTRAINT id_enfrenta_pk PRIMARY KEY(idJogador, idInimigo),
    CONSTRAINT id_jogador_fk FOREIGN KEY(idJogador) REFERENCES Jogador(IdJogador),
    CONSTRAINT id_inimigo_fk FOREIGN KEY(idInimigo) REFERENCES Inimigo(IdInimigo),
    CONSTRAINT id_arma FOREIGN KEY(Arma) REFERENCES InstanciaColetavel(IdInstanciaColetavel)
);