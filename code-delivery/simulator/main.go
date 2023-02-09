package main

import (
	"fmt"

	"github.com/codeedu/imersaofsfc2-simulator/application/route"
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