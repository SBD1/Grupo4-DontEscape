CREATE TYPE Dificuldade AS ENUM('F', 'M', 'D');
CREATE TYPE Personagem AS ENUM('inimigo', 'npc', 'jogador');
CREATE TYPE TipoItem AS ENUM('coletavel', 'naoColetavel');

CREATE TABLE Partida (
    IdPartida INTEGER,
    TempoTotal INTEGER NOT NULL,
    Qtdzumbis INTEGER NOT NULL,
    DificuldadePartida Dificuldade NOT NULL,

    CONSTRAINT partida_pk PRIMARY KEY(IdPartida)
);

CREATE TABLE TipoPersonagem (
    IdPersonagem INTEGER,
    TipoPersonagem Personagem NOT NULL,

    CONSTRAINT personagem_pk PRIMARY KEY(IdPersonagem)
);

CREATE TABLE Inimigo (
    IdInimigo INTEGER,
    Ataque INTEGER NOT NULL,
    Nome VARCHAR(20) NOT NULL,

    CONSTRAINT inimigo_pk PRIMARY KEY(IdInimigo),
    CONSTRAINT id_presonagem_fk FOREIGN KEY(IdInimigo) REFERENCES TipoPersonagem(IdPersonagem)
);

CREATE TABLE Npc (
    IdNpc INTEGER,
    Nome VARCHAR(20) NOT NULL,
    AjudaEmTempo INTEGER CHECK(AjudaEmTempo >= 0 AND AjudaEmTempo <= 100),
	FalaInicial VARCHAR(150) NOT NULL,
	FalaAjuda VARCHAR(150),
	FalaAtrapalha VARCHAR(150),
    
    CONSTRAINT npc_pk PRIMARY KEY(IdNpc),
    CONSTRAINT id_presonagem_fk FOREIGN KEY(IdNpc) REFERENCES TipoPersonagem(IdPersonagem)
);

CREATE TABLE Comodo (
    IdComodo INTEGER,
    Nome VARCHAR(20) NOT NULL,
    Descricao VARCHAR(100) NOT NULL,
    SaidaDireita INTEGER,
    SaidaEsquerda INTEGER,
    SaidaMeio INTEGER,
    
    CONSTRAINT Comodo_pk PRIMARY KEY(IdComodo),
    CONSTRAINT id_SaidaDireita_fk FOREIGN KEY(SaidaDireita) REFERENCES Comodo(IdComodo),
    CONSTRAINT id_SaidaEsquerda_fk FOREIGN KEY(SaidaEsquerda) REFERENCES Comodo(IdComodo),
    CONSTRAINT id_SaidaMeio_fk FOREIGN KEY(SaidaMeio) REFERENCES Comodo(IdComodo)
);

CREATE TABLE Jogador (
    IdJogador INTEGER,
    Nome VARCHAR(20) NOT NULL,
    Partida INTEGER NOT NULL,
    Comodo INTEGER NOT NULL,
    
    CONSTRAINT jogador_pk PRIMARY KEY(IdJogador),
    CONSTRAINT id_Comodo_fk FOREIGN KEY(Comodo) REFERENCES Comodo(IdComodo),
    CONSTRAINT id_Partida_fk FOREIGN KEY(Partida) REFERENCES Partida(IdPartida),
    CONSTRAINT id_Personagem_fk FOREIGN KEY(IdJogador) REFERENCES TipoPersonagem(IdPersonagem)
);

CREATE TABLE Amizade (
    IdJogador INTEGER,
    IdNpc INTEGER,
    Acao VARCHAR(100),
    Relacao BOOL,
    
    CONSTRAINT amizade_pk PRIMARY KEY(IdJogador, IdNpc, Acao),
    CONSTRAINT id_Jogador_fk FOREIGN KEY(IdJogador) REFERENCES Jogador(IdJogador),
    CONSTRAINT id_Npc_fk FOREIGN KEY(IdNpc) REFERENCES Npc(IdNpc)
);

CREATE TABLE Estado (
    IdEstado INTEGER,
	Descricao VARCHAR(100) NOT NULL,
    Pontos INTEGER,
    
    CONSTRAINT Estado_pk PRIMARY KEY(IdEstado)
);

CREATE TABLE Item (
    IdItem INTEGER,
    Nome VARCHAR(20) NOT NULL,
    Descricao VARCHAR(100) NOT NULL,
    Lugar VARCHAR(20) NOT NULL,
    Comodo INTEGER NOT NULL,
    Tipo TipoItem,
    
    CONSTRAINT item_pk PRIMARY KEY(IdItem),
    CONSTRAINT id_Comodo_fk FOREIGN KEY(Comodo) REFERENCES Comodo(IdComodo)
);

CREATE TABLE Coletavel (
    IdColetavel INTEGER,
    
    CONSTRAINT coletavel_pk PRIMARY KEY(IdColetavel),
    CONSTRAINT id_Item_fk FOREIGN KEY(IdColetavel) REFERENCES Item(IdItem)
);

CREATE TABLE NaoColetavel (
   	IdNaoColetavel INTEGER,
	DescricaoInicial VARCHAR(100) NOT NULL,
    
    CONSTRAINT nao_coletavel_pk PRIMARY KEY(IdNaoColetavel),
    CONSTRAINT id_Item_fk FOREIGN KEY(IdNaoColetavel) REFERENCES Item(IdItem)
);

CREATE TABLE Interage (
   	IdItemInteravel INTEGER,
	IdItemInteragido INTEGER,
	Tempo INTEGER,
    
    CONSTRAINT interage_pk PRIMARY KEY(IdItemInteravel, IdItemInteragido),
    CONSTRAINT id_Item_Interavel_fk FOREIGN KEY(IdItemInteravel) REFERENCES Item(IdItem),
	CONSTRAINT id_Item_Interagido_fk FOREIGN KEY(IdItemInteragido) REFERENCES Item(IdItem)
);


CREATE TABLE Localidade (
    IdLocalidade INTEGER,
    ComodoInicial INTEGER NOT NULL,
	Nome VARCHAR(50) NOT NULL,
    
    CONSTRAINT Localidade_pk PRIMARY KEY(IdLocalidade),
    CONSTRAINT id_ComodoInicial_fk FOREIGN KEY(ComodoInicial) REFERENCES Comodo(IdComodo)
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
    Coletavel INTEGER,
    
    CONSTRAINT inventario_pk PRIMARY KEY(Jogador, Coletavel),
    CONSTRAINT id_jogador_fk FOREIGN KEY(Jogador) REFERENCES Jogador(IdJogador),
    CONSTRAINT id_coletavel_fk FOREIGN KEY(Coletavel) REFERENCES Coletavel(IdColetavel)
);

CREATE TABLE Tarefa (
    idTarefa INTEGER,
    Jogador INTEGER,
    NaoColetavel INTEGER,
    Estado INTEGER,
    
    CONSTRAINT tarefa_pk PRIMARY KEY(idTarefa, Jogador, NaoColetavel),
    CONSTRAINT id_jogador_fk FOREIGN KEY(Jogador) REFERENCES Jogador(IdJogador),
    CONSTRAINT id_estado_fk FOREIGN KEY(Estado) REFERENCES Estado(IdEstado),
    CONSTRAINT id_naoColetavel_fk FOREIGN KEY(NaoColetavel) REFERENCES NaoColetavel(IdNaoColetavel)
);