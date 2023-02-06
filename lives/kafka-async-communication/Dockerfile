FROM golang:latest

WORKDIR /go/app 

RUN apt-get update && apt-get install -y librdkafka-dev

ENV CGO_ENABLED 1

CMD ["tail", "-f", "/dev/null"]