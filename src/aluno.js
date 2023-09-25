import conexao from './banco.js';

// CRUD


// LER/EXIBIR todos os alunos
function ler(res) {
    const sql = "SELECT * FROM alunos ORDER BY nome";
    conexao.query(sql, (erro, resultados) => {
        // verificação para ver se há conteúdo
        if(resultados.length === 0){
            res.status(204).end(); // É importante trabalhar com os status http. 204 = sem conteúdo. .end() encerra a execução.
            return;
        }
        if(erro) {
            res.status(400).json(erro.code); // 400 = BAD Request
        } else { 
            res.status(200).json(resultados)
        }
    });
}

// INSERINDO alunos no banco de dados
function inserir(aluno, res){
    const sql = "INSERT INTO alunos SET ?"; // Respeita a ordem do próprio banco de dados, simplificando a sintaxe
    conexao.query(sql, aluno, (erro) => {
        if(erro){
            res.status(400).json(erro.code);
        } else {
            res.status(201).json({"Status" : "Aluno inserido"}); // Comando mais amigavel
            // res.status(201).end();
        }
    });
}

// LER UM ALUNO

function lerUm(id, res)
{
    const sql = "SELECT * FROM alunos WHERE id = ?";
    conexao.query(sql, id, (erro, resultados) => 
    {
        if(resultados === 0)
        {
            res.status(204).end();
            return;
        } 

        if(erro)
        {
            res.status(400).json(erro.code);
        } else 
        {
            res.status(200).json(resultados[0]);
        }
    });
}

// ATUALIZAR todos/alguns dados de um aluno
function atualizar(id, aluno, res)
{
    const sql = "UPDATE alunos SET ? WHERE id = ?";
    conexao.query(sql, [aluno, id], (erro, resultados) => 
    {
        if(erro)
        {
            res.status(400).json(erro.code);
        } else 
        {
            // res.status(200).json({"Status" : "Atualizado com sucesso"});
            res.status(200).json({...aluno, id}); // spread operator "..."
        }
    })
}

function excluir(id, res)
{
    const sql = "DELETE FROM alunos WHERE id = ?";
    conexao.query(sql, id, (erro, resultados) => 
    {
        if(erro){
            res.status(400).json(erro.code);
        } else 
        {
            res.status(200).json({"Status" : "Aluno excluído", id});
        }
    });
}

export { ler, inserir, lerUm, atualizar, excluir };