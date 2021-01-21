# marvel-site-api_stonecase
Essa api tem a finalidade de fornecer funções de cadastro, login e criação de favoritos para a aplicação contida no repositório marvel-site-api_stonecase.
## Tecnologias escolhidas
### express
Framework comumente utilizado para aplicações em Node.js que traz diversas funções que auxiliam no desenvolvimento da aplicação
### Postgres
Postgres é um sistema gerenciador de Bancos de dados relacionais. Ele foi escolhido simplesmente pela possibilidade da fácil criação de um banco grátis na nuvem através do elephatsql facilitando assim o início do projeto.
### Sequelize
Sequelize é uma ORM para bancos de dados relacionais. Ela possui diversas funcionalidades mas a principal razão de sua utilização aqui é pelo fato de facilitar imensamente a lidar com BD relacionais possbilitando a criação de models e simplifincando o uso de queries para se criar, encontrar e deletar itens das tabelas do BD.
### sequelize-cli
O sequelize-cli adiciona diversos comandos no terminal que possibilitam uma rápida e fácil criação e destruição de tabelas. Estas duas não são suas únicas funções mas foram o motivo de sua utilização.
### jsonwebtoken bcrypt e body-parser
Algumas das outras dependências do projeto. O body-parser está sendo utilizado aqui para a leitura de arquivos json enviados nas requests, o bcrypt para a criptografa das senhas armazenadas no BD e o jsonwebtoken para permitir funcionalidades de login e assim proteger rotas que precisam de um usuário logado para funcionar.
## Antes de começar
 Depois de clonar o repositório, o primeiro passo para utilizar esta API é possuir acesso a um BD postgres, para isso você pode ter fácil acesso a um online e gratuitamente através de https://www.elephantsql.com/ se for de sua preferência também é possível criar um locamente em sua máquina mas não irei tratar disto aqui. 

Além disso também precisamos configurar algumas variáveis de ambiente, são elas um arquivo nodemon.json :
``` bash
{
    "env": {
        # esta variável é a url que constitui sua conexão com sua base de dados
        "DATABASE": "linkparasuabasededadosaqui",

        #chave de sua prefrência para o funcionamento do jsonwebtoken
        "JWT_KEY": "chaveaqui"
    }
}
```

E um segundo arquivo config.json que deve estar dentro da pasta config, ele é necessário para o funcionamento correto do sequelize-cli:

``` bash
module.exports = {
    # llinguagem da sua base de dados
    dialect: "",
    #local em que sua base de dados está hospedada, se for local é localhost
    host: "tuffi.db.elephantsql.com",
    #usuario e senha da sua base de dados
    username: "usuario",
    password: "senha",
    #identificação da sua base de dados
    database: "nome",

    #esta configuração deve permanecer como está para que os campos createdAt e updatedAt sejam atalizados automaticamente
    define: {
        "timestamps": true
    }
};

```
## Rodando sa aplicação
Primeiramente é necessário instalar as dependências necessárias com:
``` bash
$ npm i
```
Se esta for sua primeira vez utilizando a api é necessário que você crie as tabelas necessárias no banco de dados, para isto basta utilizar o comando:

``` bash
$ npx sequelize-cli db:migrate
```
então para rodar a aplicação utilize:
``` bash
$ npm start
```
