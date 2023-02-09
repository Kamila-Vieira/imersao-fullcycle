## Live APIs e Mensageria com Golang

Aplicação de produtos com com golang e envio de mensagens com kafka

### Comandos úteis

- Criar a aplicação Go:

```bash
go mod init <nome do repositório do pacote>

# go mod init github.com/Kamila-Vieira/imersao-fullcycle/tree/main/lives/apis-mensageria-golang
```

- Instalar pacotes importados:

```bash
go mod tidy
```

- Executar go:

```bash
go run <arquivo .go> 

# go run cmd/app/main.go 
```

- Em Go "*" referência o ponteiro e "&" representa a referência. Ex.:

```go
func NewProduct(name string, price float64) *Product{
  return &Product{
    ID: uuid.New().String(),
    Name: name,
    Price: price,
  }
}
```

- Após rodar os container com o docker compose:

```bash
# Acessar o Mysql
docker compose exec mysql bash
mysql -uroot -p products
# password: root
# criar tabela de produtos
create table products (id varchar(255), name varchar(255), price float);

# Acessar o Kafka
docker compose exec kafka bash
# criar tópico products
kafka-topics --bootstrap-server=localhost:9092 --topic=products --create
# Acessar o control center do Confluent em http://localhost:9021

# Rodar a aplicação go
docker compose exec goapp bash
go run cmd/app/main.go

# teste de requisições http no arquivo products.http
# teste de envio de mensagem kafka

kafka-console-producer --bootstrap-server=localhost:9092 --topic=products
# Enviar os dados de um produto. Ex.: {"name": "sofá","price": 2500}. Será inserido um novo registro desse produto no banco de dados
```