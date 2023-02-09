package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Kamila-Vieira/imersao-fullcycle/tree/main/lives/apis-mensageria-golang/internal/infra/akafka"
	"github.com/Kamila-Vieira/imersao-fullcycle/tree/main/lives/apis-mensageria-golang/internal/infra/repository"
	"github.com/Kamila-Vieira/imersao-fullcycle/tree/main/lives/apis-mensageria-golang/internal/infra/web"
	"github.com/Kamila-Vieira/imersao-fullcycle/tree/main/lives/apis-mensageria-golang/internal/usecase"
	"github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/go-chi/chi/v5"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	/* CONFIGURAÇÃO DO BANCO DE DADOS */
	db, err := sql.Open("mysql", "root:root@tcp(host.docker.internal:3306)/products")
	if err != nil {
		panic(err)
	}

	defer db.Close()

	repository := repository.NewProductRepositoryMysql(db)
	createProductUseCase := usecase.NewCreateProductUseCase(repository)
	listProductUseCase := usecase.NewListProductsUseCase(repository)

	/* CONFIGURAÇÃO DO REST */
	productHandlers := web.NewProductHandlers(createProductUseCase, listProductUseCase)
	router := chi.NewRouter()
	router.Post("/products", productHandlers.CreateProductHandler)
	router.Get("/products", productHandlers.ListProductsHandler)

	go http.ListenAndServe(":8000", router) // ​GoRoutines => Cria uma thread separada da thread do mysql

	/* CONFIGURAÇÃO DO KAFKA */
	msgChan := make(chan *kafka.Message)
	go akafka.Consume([]string{"products"}, "host.docker.internal:9094", msgChan) // ​GoRoutines => Cria uma thread separada da thread do mysql e do rest

	for msg := range msgChan {
		dto := usecase.CreateProductInputDto{}
		err := json.Unmarshal(msg.Value, &dto)
		if err != nil {
			fmt.Println(err.Error())
		}
		_, err = createProductUseCase.Execute(dto)
	}
}
