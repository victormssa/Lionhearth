use axum::{handler::post, Router};
use serde::{Deserialize, Serialize};
use surrealdb::Database;

#[tokio::main]
async fn main() {
    // Crie uma nova instância do banco de dados SurrealDB
    let db = Database::new();

    // Defina o manipulador para a rota de registro de usuário
    async fn register_user(user: axum::extract::Json<User>) -> String {
        // Adicione aqui a lógica para salvar o usuário no banco de dados
        // No exemplo abaixo, apenas retorna uma mensagem com os dados do usuário
        format!("Usuário registrado: {:?}", user.0)
    }

    // Defina as rotas da API
    let app = Router::new()
        .route("/register", post(register_user));

    // Inicie o servidor na porta 3000
    axum::Server::bind(&"0.0.0.0:8000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}

#[derive(Debug, Serialize, Deserialize)]
struct User {
    name: String,
    email: String,
    // Adicione outros campos necessários aqui
}