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

### Deploy da aplicação

1. Criar cluster de Kubernetes no Google Cloud platform;

2. Criar conta no Confluent cloud. Pegar variáveis de ambiente da Confluent cloud e atualizar o .env:
````.env
KafkaBootstrapServers=
security.protocol=
sasl.mechanisms=
sasl.username=
sasl.password=
````

3. Criar a imagem do simulador:
````.env
docker build -t kamisvsa/code-delivery-simulator -f Dockerfile.prod .
````

4. Subir imagem para o docker hub:
````.env
docker push kamisvsa/code-delivery-simulator
````

5. Criar os tópicos (route.new-direction e route.new-position) do kafka no Confluent cloud.

6. Instalar Kubectl e GCloud (e plugin do gcloud [gke-gcloud-auth-plugin](https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke)).

7. Verificar os nodes do Kubernetes que estão rodando no GCP:
```bash
kubectl get nodes
```

8. Criar configMap do simulador:
```bash
kubectl apply -f k8s/simulator/configmap.yaml
# Verificar status da configuração
kubectl get configmap
```

9. Criar deploy do simulador:
```bash
kubectl apply -f k8s/simulator/deploy.yaml
# Verificar status dos containers
kubectl get pods
# Verificar logs do container
kubectl logs simulator-8698754788-27fgk # kubectl logs <nome do container>
```