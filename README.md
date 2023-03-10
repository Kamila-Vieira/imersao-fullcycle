# Code Delivery

## Estudo de caso pratico da aplicação

### O que foi desenvolvido?

- Sistema de entregas que permite visualizar em tempo real o veiculo do entregador;
- Há a possibilidade de múltiplos entregadores simultâneos;
- Serviço simulador que enviará a posição em tempo real de cada entregador;
- Os dados de cada entrega, bem como as posições, serão armazenadas no Elasticsearch para futuras analises.


### Alguns desafios

- Para evitar perda de informação caso o serviço backend fique indisponível por alguns momentos, NÃO, trabalharemos com REST.

**Solução**: Trabalharemos com o Apache Kafka para o envio e recebimento de dados entre os sistemas.

- Nao é responsabilidade do serviço backend persistir os dados no Elasticsearch. Logo, como armazenar as informações no Elasticsearch?

**Solução**: Utilizaremos o Kafka Connect que também consumira os dados do simulador e fará a inserção no Elasticsearch

- Precisaremos exibir em tempo real a localização de cada entregador 

**Solução**: Trabalharemos com websockets. O backend recebera os dados do simulador, e enviar as posições para o frontend via websocket.


### Dinâmica do sistema

<img src="./screenshots/dinamica.png" width="100%"/>


### Tecnologias utilizadas

- Simulador: Golang
- Backend: Nest.js com Typescript, Mongodb, Websockets e socket.io
- Frontend: React com Typescript
- Docker no Wsl 
- Kafka e Kafka connect
- Elasticsearch & Kibana
- Deploy com Kubernetes


### Links úteis:

- Docker:
  - [Docker no WSL](https://github.com/codeedu/wsl2-docker-quickstart#docker-engine-docker-nativo-diretamente-instalado-no-wsl2)
  - [Docker Hub](https://hub.docker.com/)
  
- Kafka:
  - [Confluent Cloud](https://confluent.cloud/)
  
- Kubernetes:
  - [Google Cloud platform](https://console.cloud.google.com/kubernetes/)
  - [Download Kubectl](https://kubernetes.io/docs/tasks/tools/)
  - [GCloud sdk](https://cloud.google.com/sdk/docs/install?hl=pt-br)
  - [Bitnami helm charts MongoDB](https://github.com/bitnami/charts/tree/main/bitnami/mongodb)