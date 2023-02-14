## Code Delivery - Kafka

Serviço Apache Kafka para registro de mensagens recebidas e consumidas pelo simulador.

**Importante:** Deve ser a primeira aplicação a ser executada.

### Rodar a aplicação

````bash
chown -R 1000:1000 es01/
chown -R 777 es01/
rm es01/nodes/0/node.lock
docker compose up

# testar producer kafka
docker exec -it kafka-kafka-1 bash
> kafka-console-producer --bootstrap-server=localhost:9092 --topic=route.new-direction 
````