SELECT
    A.usuario2 as id,
    U.nome as nome,
    U.username as username
FROM
    Amigos A
INNER JOIN Usuario U ON  U.id = A.usuario2
WHERE
    A.usuario1 = ?;