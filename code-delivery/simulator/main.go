package main

import (
	"fmt"

	"github.com/Kamila-Vieira/imersao-fullcycle/tree/main/code-delivery/simulator/application/route"
)

func main(){
  route := route.Route{
    ID: "1",
    ClientId: "1",
  }
  
  route.LoadPositions()
  
  stringJson, _ := route.ExportJsonPositions()
  
  fmt.Printf(stringJson[0])
}