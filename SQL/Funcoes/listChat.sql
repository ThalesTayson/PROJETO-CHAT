SELECT
  B.id AS id,
  B.grupo AS grupo,
  IIF(B.grupo, 
    SELECT G.nomeGrupo FROM Grupo G WHERE batepapo = B.id, 
    SELECT U.nome FROM UsuarioxBatePapo R 
    WHERE R.batepapo = B.id AND R.usuario != ?
    INNER JOIN Usuario
    ON R.usuario = U.id
  ) AS nomeBatePapo
  UsuarioxBatePapo.lido AS lido
FROM
  UsuarioxBatePapo
WHERE
  UsuarioxBatePapo.usuario = ?
INNER JOIN
  BatePapo B
ON UsuarioxBatePapo.batePapo = B.id