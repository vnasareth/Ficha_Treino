const mysql = require('mysql2');

// Configurações de conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'academia'
});

// Função para executar consultas SQL
function executeQuery(sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Função para adicionar um novo treino
function adicionarTreino(codUser, exercicio, qtd_series, qtd_repeticoes, carga) {
  const sql = `INSERT INTO tb_treino (codUser, exercicio, qtd_series, qtd_repeticoes, carga) VALUES (?, ?, ?, ?, ?)`;
  const values = [codUser, exercicio, qtd_series, qtd_repeticoes, carga];

  return executeQuery(sql, values);
}

// Função para adicionar um novo usuário
function adicionarUsuario(codUser, email, senha) {
  const sql = `INSERT INTO tb_usuario (codUser, email, senha) VALUES (?, ?, ?)`;
  const values = [codUser, email, senha];

  return executeQuery(sql, values);
}

// Função para adicionar informações de um usuário
function adicionarInfoUsuario(codInfoUser, codUser, nome, peso, altura) {
  const sql = `INSERT INTO tb_info_usuario (codInfoUser, codUser, nome, peso, altura) VALUES (?, ?, ?, ?, ?)`;
  const values = [codInfoUser, codUser, nome, peso, altura];

  return executeQuery(sql, values);
}

// Função para consultar os treinos cadastrados
function consultarTreinos() {
  const sql = `SELECT * FROM tb_treino`;
  return executeQuery(sql);
}

// Exemplo de uso das funções
async function exemplo() {
  try {
    await adicionarTreino(1, 'Agachamento', 4, 10, 50.5);
    await adicionarUsuario(1, 'exemplo@gmail.com', 'senha123');
    await adicionarInfoUsuario(1, 1, 'João', 70.5, 1.75);

    console.log('Dados inseridos com sucesso!');

    const treinos = await consultarTreinos();
    console.log('Treinos cadastrados:', treinos);
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
  } finally {
    connection.end();
  }
}

exemplo();


   
