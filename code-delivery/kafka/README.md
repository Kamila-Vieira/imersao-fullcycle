## Code Delivery - Kafka

Serviço Apache Kafka para registro de mensagens recebidas e consumidas pelo simulador.

**Importante:** Deve ser a primeira aplicação a ser executada.

### Rodar a aplicação

````bash
chown -R 1000:1000 es01/
sudo chown -R 777 es01/
rm es01/nodes/0/node.lock
docker compose up

# testar envio de dados no kafka
docker exec -it kafka-kafka-1 bash
> kafka-console-producer --bootstrap-server=localhost:9092 --topic=route.new-direction 
# {"clientId": "a", "routeId": "1"}
# {"clientId": "a", "routeId": "2"}
# {"clientId": "c", "routeId": "3"}
# {"clientId": "b", "routeId": "3"}
# {"clientId": "c", "routeId": "2"}
# {"clientId": "d", "routeId": "2"} 
````

1. Acessar o control center em http://localhost:9021/;
2. subir as propriedades do sink elasticsearch (./connectors/elasticsearch.properties) na aba connect do control center;
3. Acessar o Kibana em http://localhost:5601/;
