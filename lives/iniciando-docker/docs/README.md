### Links úteis

- Instalação no wsl: https://github.com/codeedu/wsl2-docker-quickstart#docker-engine-docker-nativo-diretamente-instalado-no-wsl2
- Repositório de imagens: https://hub.docker.com/


### Comandos úteis 

- Iniciar docker (depois da instalação):
```sh
  sudo service docker start
```

- Rodar imagem hello-world para verificar se a instalação ocorreu com sucesso:
```sh
  docker run hello-world
```

- Baixar imagem do Docker hub:
  - Versão latest:
    ```sh
      docker pull nginx
    ```
  - Determinando a versão:
    ```sh
      docker pull nginx:1.22.1-alpine
    ```

- Verificar todas as imagens que estão na máquina:
```sh
  docker image ls
```

- Pesquisar entre as imagens que estão na máquina:
```sh
  docker image ls | grep <query da pesquisa>
```

- Excluir imagem da máquina:
```sh
  docker rmi <nome da imagem>
```

- Verificar todos os containers criados:
```sh
  docker ps
```

- Subir container com um nome customizado:
```sh
  docker run --name teste nginx
```

- Rodar container com porta customizada:
```sh
  docker run -p 8000:80 nginx
```

- Subir container desacoplado do terminal:
```sh
  docker run -d -p 8000:80 nginx
```

- Entrar no container através da linha de comando:
```sh
  docker exec -it <ID do container> bash
```

- Iniciar a execução de um container:
```sh
  docker start <ID do container>
```

- Parar a execução do container:
```sh
  docker stop <ID do container>
```

- Parar a execução de todos os containers ativos:
```sh
  docker stop $(docker ps -a -q)
```

- Subir container sincronizando com projetos locais (criação de volume):
```sh
  docker run -v $(pwd):/usr/share/nginx/html -d -p 8000:80 nginx
```

- Subir container com variáveis de ambiente:
```sh
  docker run --env MYSQL_ROOT_PASSWORD=root --env MYSQL_DATABASE=meu_banco mysql:5.7
```

- Gerar nova image (Após criação e configuração do dockerfile):
```sh
  docker build -t <nome da imagem> <caminho dos arquivos a serem incluídos na imagem>
```

- Subir nova imagem na conta do docker hub:
  - Fazer um build com o nome do usuário do docker hub no nome da imagem:
    ```sh
      docker build -t <nome do usuário>/<nome da imagem> <caminho dos arquivos a serem incluídos na imagem>
    ```
  - Fazer login:
    ```sh
      docker login -u <nome do usuário>
    ```
  - Subir a imagem:
    ```sh
      docker push <nome do usuário>/<nome da imagem>
    ```
  - Agora é possível instalar a imagem criada a partir do docker hub com o comando:
    ```sh
      docker pull <nome do usuário>/<nome da imagem>
      docker run -d -p 8000:80 <nome do usuário>/<nome da imagem>
    ```
    
### Criando uma aplicação com conexão entre containers:

- Criar container com imagem do mysql (adicionando variáveis de ambiente):
````bash
  docker run --env MYSQL_ROOT_PASSWORD=root --env MYSQL_DATABASE=meu_banco mysql:5.7
````

- Executar banco de dados e depois logar:
````bash
  docker exec -it <ID do container> bash
  
  mysql -uroot -proot
````

- Criar uma imagem customizada de node adicionar comando ``CMD [ "tail", "-f", "/dev/null" ]`` no Dockerfile da pasta nodejs para ficar assistindo as mudanças dos arquivos:
````bash
  cd nodejs && docker build -t kamisvsa/custom-nodejs .
````

- Criar um container a partir da imagem de node customizada injetando os arquivos da pasta atual (nodejs):
````bash
  cd nodejs && docker run -v $(pwd):/home/node/app -p 3000:3000 kamisvsa/custom-nodejs
````

- Executar o container customizado de node:
````bash
  cd nodejs && docker exec -it <ID do container> bash
````

- Entrar no diretório onde os arquivos foram copiados:
````bash
  cd /home/node/app
````

- Criar package.json:
````bash
  npm init -y && npm i express
````

- Gerar docker compose para subir os containers acoplados:
````yaml
version: '3'

services: 

  app:
    build: ./nodejs
      
  mysql:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD=root
      MYSQL_DATABASE=meu_banco
````

- Rodar o docker compose:
````bash
  docker compose up
````

- Parar o docker compose:
````bash
  docker compose stop
````

- Parar o docker compose e apagar containers:
````bash
  docker compose kill
````

Obs.: 
  - O arquivo ``Dockerfile`` é um manifesto do docker, responsável pela criação de novas imagens
  - Instalar as extensões Docker e Dev Containers 
  - O arquivo ``docker-compose.yaml`` serve para gerenciar vários containers de uma vez
  
