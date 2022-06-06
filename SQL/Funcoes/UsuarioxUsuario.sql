SELECT 
    (
        SELECT
            nome
        FROM
            Usuario
        WHERE
            id = UsuarioxBatePapo.usuario            
    ) as nome
FROM 
    UsuarioxBatePapo
WHERE
    batePapo = ? AND usuario != ?;