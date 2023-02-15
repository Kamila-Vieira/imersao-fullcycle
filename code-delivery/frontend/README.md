## Code Delivery - Backend

Frontend da aplicação desenvolvido em React com Typescript e API do google maps, dispara a solicitação de nova corrida para o backend, recebe as informações do trajeto percorrido em real time e mostra o caminho sendo percorrido no mapa.

**Importante:** A aplicação do Apache Kafka, o simulador e o backend devem estar rodando primeiro.

### Rodar a aplicação

```bash
docker compose up
```

### Deploy da aplicação

1. Criar a imagem do frontend:
````bash
docker build -t kamisvsa/code-delivery-frontend -f Dockerfile.prod .
````

2. Subir imagem para o docker hub:
````bash
docker push kamisvsa/code-delivery-frontend
````

3. Criar deploy e serviço do frontend:
```bash
kubectl apply -f k8s/frontend
# Verificar status dos containers
kubectl get pods
# verificar se há um serviço do frontend e 
# pegar o EXTERNAL-IP que será responsável pelo tráfego do frontend na web
kubectl get svc
```

4. Acessar chrome://flags/ e adicionar o endereço do IP frontend em "Insecure origins treated as secure
" e ativar a opção, para que o Google Maps funcione na aplicação.