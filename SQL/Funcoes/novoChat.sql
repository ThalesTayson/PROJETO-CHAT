CREATE TEMP TABLE IF NOT EXISTS Variaveis (variavel CHAR(15) PRIMARY KEY, valor INT);

INSERT OR REPLACE INTO Variaveis VALUES ('remetente', ? );
INSERT OR REPLACE INTO Variaveis VALUES ('destinatario', ? );

INSERT OR REPLACE INTO Variaveis VALUES ('idBatePapo',
    INSERT INTO BatePapo(grupo)
    OUTPUT Inserted.id
    VALUES ('FALSE');
);

INSERT INTO UsuarioxBatePapo(usuario, batePapo)
VALUES (
    SELECT valor FROM Variaveis WHERE variavel = 'remetente',
    SELECT valor FROM Variaveis WHERE variavel = 'idBatePapo'
);

INSERT INTO UsuarioxBatePapo(usuario, batePapo)
            VALUES (
    SELECT valor FROM Variaveis WHERE variavel = 'destinatario',
    SELECT valor FROM Variaveis WHERE variavel = 'idBatePapo'
);

INSERT INTO Mensagem(usuario, batePapo, mensagem, diaeHora)
VALUES (
    SELECT valor FROM Variaveis WHERE variavel = 'remetente',
    SELECT valor FROM Variaveis WHERE variavel = 'idBatePapo'
    ,?,?)