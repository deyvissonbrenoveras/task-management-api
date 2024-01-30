# Task Management API

## Introdução

Projeto criado para meu portfólio e para o curso gratuito de Nest JS no meu [canal do Youtube](https://www.youtube.com/@BrenoVeras-dev). Nele iremos abordar os seguintes recursos:

- CRUD de tarefas (Controllers, Decorators, Services, Modules)
- Validação de DTO com class-validator
- Variáveis de ambiente com ConfigService
- Autenticação (JwtService, App guard)
- Password hash
- Banco de dados - TODO

## Instalação

### Pré-requisitos

Esse projeto foi desenvolvido utilizando a seguinte versão do node:

[Node v18.12.0 LTS](https://nodejs.org/en/blog/release/v18.12.0)

### Passos de Instalação

1. Clone o repositório: `git clone git@github.com:deyvissonbrenoveras/task-management-api.git`
2. Navegue até o diretório do projeto: `cd task-management-api`
3. Instale as dependências: `npm install`


## Configuração

- Crie copie o arquivo .env.example e renomeie para .env, preenchendo todas a variáveis.
- Inicialize o container do banco de dados com: 
```
  docker-compose up -d
```
- Execute as migrations com:
```
npm run migration:run
```  

## Migrations

Criar uma migration:
```
npm run migration:create -name=nome-da-migration
```

Executar as migrations:
```
  npm run migration:run
```

Reverter as migrations:
```
  npm run migration:revert
```  


## Uso

O task-management-api expõe um endpoint para cadastro, atualização, busca e exclusão de tarefas. também foi desenvolvido um endpoint para criação de usuários e um endpoint de autenticação, onde é possível realizar o login passando um usuário e senha.

### Curls

Copie os Curls abaixo e cole no seu testador de apis favorito, como [Insomnia](https://insomnia.rest/download) ou [Postman](https://www.postman.com/).

#### Usuários
```
curl --request POST \
  --url http://localhost:3000/users \
  --header 'Content-Type: application/json' \
  --data ' {
	 "username": "username",
	 "password": "password"
 }'
```

#### Autenticação
```
curl --request POST \
  --url http://localhost:3000/auth/login \
  --header 'Content-Type: application/json' \
  --data ' {
	 "username": "username",
	 "password": "password"
 }'
```

#### Tarefas

##### Criar
```
curl --request POST \
  --url http://localhost:3000/task \
  --header 'Authorization: Bearer token' \
  --header 'Content-Type: application/json' \
  --data ' {
    "title":"title",
    "description": "description",
    "expirationDate": "2024-01-01"
 }'
```

##### Atualizar
```
curl --request PUT \
  --url http://localhost:3000/task \
  --header 'Authorization: Bearer token' \
  --header 'Content-Type: application/json' \
  --data ' {
	 "id": "uuid here",
    "title":"updated title",
    "description": "updated description",
    "status": "IN_PROGRESS",
    "expirationDate": "2024-01-04"
 }'
 ```

##### Encontrar por id
```
curl --request GET \
  --url http://localhost:3000/task/1 \
  --header 'Authorization: Bearer token'
 ```

##### Buscar com filtros
```
 curl --request GET \
  --url 'http://localhost:3000/task?title=task%203&status=IN_PROGRESS' \
  --header 'Authorization: Bearer token'
```

##### Excluir
```
curl --request DELETE \
  --url http://localhost:3000/task/uuid-here \
  --header 'Authorization: Bearer token'
```
