package main

import (
	"fmt"
	"log"

	kafka2 "github.com/Kamila-Vieira/imersao-fullcycle/tree/main/code-delivery/simulator/application/kafka"
	"github.com/Kamila-Vieira/imersao-fullcycle/tree/main/code-delivery/simulator/infra/kafka"
	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/joho/godotenv"
)

//{"clientId":"1","routeId":"1"}
//{"clientId":"2","routeId":"2"}
//{"clientId":"3","routeId":"3}
func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("error loading .env file")
	}
}

func main() {
	magChan := make(chan *ckafka.Message)
	consumer := kafka.NewKafkaConsumer(magChan)
	go consumer.Consume()

	for msg := range magChan {
		fmt.Println(string(msg.Value))
		go kafka2.Produce(msg)
	}
}
