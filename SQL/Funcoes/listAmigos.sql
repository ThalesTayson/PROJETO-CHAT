SELECT
    A.usuario2 as id,
    U.nome as nome,
    U.username as username
FROM
    Amigos A
WHERE
    A.usuario1 = ?
INNER JOIN
    Usuario U
ON A.usuario2 = U.id