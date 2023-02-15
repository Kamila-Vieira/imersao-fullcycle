## Code Delivery - Backend

Backend da aplicação desenvolvido em Nestjs com Typescript, Websocket e Socket.io, conecta-se com o simulador enviando a solicitação de nova corrida e recebendo o caminho percorrido em real time.

**Importante:** A aplicação do Apache Kafka, e o simulador devem estar rodando primeiro.

### Rodar a aplicação

```bash
docker compose up
```

### Deploy da aplicação

1. Criar a imagem do simulador:
````bash
docker build -t kamisvsa/code-delivery-backend -f Dockerfile.prod .
````

2. Subir imagem para o docker hub:
````bash
docker push kamisvsa/code-delivery-backend
````

3. Instalar [Helm](https://helm.sh/docs/intro/install/) e lib [Bitnami/mongodb](https://github.com/bitnami/charts/tree/main/bitnami/mongodb) para manipular o mongodb:
````bash
helm repo add my-repo https://charts.bitnami.com/bitnami

helm install mongodb bitname/mongodb --set=auth.rootPassword="root",auth.database="nest",auth.username="root"

# rodar senha root
export MONGODB_ROOT_PASSWORD=$(kubectl get secret --namespace default mongodb -o jsonpath="{.data.mongodb-root-password}" | base64 -d)

# rodar o banco de dados
kubectl run --namespace default mongodb-client --rm --tty -i --restart='Never' --env="MONGODB_ROOT_PASSWORD=$MONGODB_ROOT_PASSWORD" --image docker.io/bitnami/mongodb:6.0.4-debian-11-r0 --command -- bash
> mongosh admin --host "mongodb" --authenticationDatabase admin -u root -p $MONGODB_ROOT_PASSWORD
> use nest
# inserir dados do arquivo ./.docker/mongo/init.js

# Voltar para o terminal e verificar se existe o container de banco de dados
kubectl get po

# verificar se há um serviço do mongodb
kubectl get svc
````

4. Criar configMap do backend:
```bash
kubectl apply -f k8s/backend/configmap.yaml
# Verificar status da configuração
kubectl get configmap
```

5. Criar deploy do backend:
```bash
kubectl apply -f k8s/backend/deploy.yaml
# Verificar status dos containers
kubectl get pods
# Verificar logs do pod
kubectl logs <nome do pod> # kubectl logs backend-547c775d9b-45z87
```

6. Criar o service do backend:
```bash
kubectl apply -f k8s/backend/service.yaml
# verificar se há um serviço do backend e 
# pegar o EXTERNAL-IP que será responsável pelo tráfego do backend (acessar na porta 3000)
kubectl get svc
```