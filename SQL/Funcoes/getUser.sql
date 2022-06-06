SELECT 
    U.id as Id, U.nome as Nome, U.username as Usuario 
FROM Usuario U
WHERE
    username = ? AND senha = ?;