## Comunicação assíncrona com Apache Kafka

https://kafka.apache.org/

Kafka é um sistema streaming de eventos que trabalha de forma distribuída possibilitando a transferência de um grande número de dados.

- Consegue receber um grande numero de requisições (Alto throughput) com uma baixa latência;
- Escalável;
- Storage permanente;
- Alta disponibilidade;
- Dividido em brokers (sistemas rodando o Kafka, onde cada um possui um banco de dados), e esses sistemas juntos formam um cluster;
- Os dados em Kafka são imutáveis.

### Comandos úteis

- Iniciar containers:
````bash
docker compose up -d
````

- Ver containers do docker compose:
````bash
docker compose ps
````

- Ver logs do Kafka:
````bash
docker compose logs kafka
````

- Acessar o control center do Confluent em http://localhost:9021

- Entrar no container do Kafka:
````bash
docker compose exec kafka bash
````

- Consumir mensagem de um tópico específico:
````bash
kafka-console-consumer --bootstrap-server=localhost:9092 --topic=nfe --from-beginning
````

- Enviar mensagem para um tópico específico:
````bash
kafka-console-producer --bootstrap-server=localhost:9092 --topic=nfe

# digitar a mensagem a ser enviada
> {"status": 1}
````

- Consumir apenas a última mensagem enviada de um tópico específico:
````bash
kafka-console-consumer --bootstrap-server=localhost:9092 --topic=nfe
````

- Clonar projeto Go do Github:
````bash
go mod init github.com/devfullcycle/imersao-12-esquenta-kafka
````

- Rodar arquivo Go:
````bash
go run cmd/producer/main.go
````

- Baixar pacotes não instalados em Go:
````bash
go mod tidy
````

- Entrar no container do Go:
````bash
docker compose exec goapp bash
````

- Executar a emissão de mensagens no producer:
````bash
go run cmd/producer/main.go 
````

- Consumir em paralelo emissão de mensagens no consumer:
````bash
go run cmd/consumer/main.go 
````