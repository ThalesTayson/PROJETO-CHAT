CREATE TEMP TABLE IF NOT EXISTS Variaveis (variavel CHAR(15) PRIMARY KEY, valor INT);

INSERT OR REPLACE INTO Variaveis VALUES ('remetente', ? );
INSERT OR REPLACE INTO Variaveis VALUES ('batepapo', ? );

INSERT INTO Mensagem(usuario, batePapo, mensagem, diaeHora)
VALUES (
    SELECT valor FROM Variaveis WHERE variavel = 'remetente',
    SELECT valor FROM Variaveis WHERE variavel = 'idBatePapo',
?,?);

UPDATE UsuarioxBatePapo
SET lido = 0
WHERE
    batePapo = SELECT valor FROM Variaveis WHERE variavel = 'idBatePapo' AND 
    usuario !=  SELECT valor FROM Variaveis WHERE variavel = 'remetente'
;
