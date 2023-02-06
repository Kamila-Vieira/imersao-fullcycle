package main

import (
	"fmt"

	"github.com/confluentinc/confluent-kafka-go/kafka"
)

func main() {
	i := 0
	for {
		i++
		produce([]byte(fmt.Sprintf("NFE %d emitida\n", i)), "nfe")
		fmt.Println("NFE emitida: ", i)
	}
}

func produce(msg []byte, topic string) {
	// Abre uma conexão com o Kafka
	configMap := &kafka.ConfigMap{
		"bootstrap.servers": "host.docker.internal:9094",
	}
	kafkaProducer, err := kafka.NewProducer(configMap)
	if err != nil {
		panic(err)
	}
	// Produz a mensagem para o Kafka
	err = kafkaProducer.Produce(&kafka.Message{
		TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: kafka.PartitionAny},
		Value: msg,
	}, nil)
}
