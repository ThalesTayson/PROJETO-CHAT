CREATE TEMP TABLE IF NOT EXISTS Variaveis (variavel CHAR(15) PRIMARY KEY, valor INT);

INSERT OR REPLACE INTO Variaveis VALUES ('idBatePapo',
    (INSERT INTO BatePapo(grupo)
    OUTPUT Inserted.id
    VALUES ('TRUE'))
);

INSERT INTO Grupo(nomeGrupo, criador, batePapo)
VALUES (?,?,
    (SELECT valor FROM Variaveis WHERE variavel = 'idBatePapo')
);
