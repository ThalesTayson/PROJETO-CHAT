CREATE TABLE IF NOT EXISTS Usuario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username CHAR(20) NOT NULL UNIQUE,
    senha CHAR(10) NOT NULL,
    nome CHAR(70) NOT NULL
);


CREATE TABLE IF NOT EXISTS Amigos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario1 INTEGER REFERENCES Usuario(id) ON UPDATE CASCADE,
    usuario2 INTEGER REFERENCES Usuario(id) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS BatePapo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    grupo BIT NOT NULL
);

CREATE TABLE IF NOT EXISTS Grupo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nomeGrupo CHAR(30) NOT NULL,
    criador INTEGER REFERENCES Usuario(id) ON UPDATE CASCADE,
    batePapo INTEGER REFERENCES BatePapo(id) ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS UsuarioxBatePapo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario INTEGER REFERENCES Usuario(id) ON UPDATE CASCADE,
    lido BIT NOT NULL DEFAULT "FALSE",
    batePapo INTEGER REFERENCES BatePapo(id) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Mensagem (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuaio INTEGER REFERENCES Usuario(id) ON UPDATE CASCADE,
    batePapo INTEGER REFERENCES BatePapo(id) ON UPDATE CASCADE,
    mensagem TEXT NOT NULL,
    diaeHora DATETIME
);
