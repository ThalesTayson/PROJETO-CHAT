SELECT 
    id, nome, username 
FROM Usuario
WHERE
    username = ? AND
    senha = ?;