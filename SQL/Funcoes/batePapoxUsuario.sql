SELECT 
    R.batePapo AS id, lido, B.grupo AS grupo
FROM 
    UsuarioxBatePapo R
INNER JOIN
    BatePapo B
ON
    B.id = batePapo
WHERE
    usuario = ?;