## Code Delivery - Simulador

Simulador de corrida feito com Golang, conectando-se com o Kafka para registrar as mensagens do caminho percorrido da corrida.

**Importante:** A aplicação do Apache Kafka deve estar rodando primeiro.

### Rodar a aplicação

````bash
docker compose up -d
# Entrar no container
docker compose exec app bash
# Rodar a aplicação Golang
go run main.go
````