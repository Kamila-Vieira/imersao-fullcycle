import { FunctionComponent, useCallback, FormEvent, useState } from "react";
import { Grid, Select, MenuItem, Button } from "@material-ui/core";
import { useSnackbar } from 'notistack'

import { useRouteContext } from "../../hooks/use-route-context";
import { generateRandomColor, makeCarIcon, makeMarkerIcon } from "../../utils";

import { RouteExistsError } from "../../errors/route-exists.error";
import { Navbar } from "../Navbar";

import { useStyles } from "./styles";

export const Form: FunctionComponent = () => {
  const [routeIdSelected, setRouteIdSelected] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();
  const { routes, mapRef, socketIORef } = useRouteContext();
  const classes = useStyles()

  const handleStartRoute = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const route = routes.find(route => route._id === routeIdSelected)
      const color = generateRandomColor()
      try {
        mapRef.current?.addRoute(routeIdSelected,
          {
            currentMarkerOptions: {
              position: route?.startPosition,
              icon: makeCarIcon(color)
            },
            endMarkerOptions: {
              position: route?.endPosition,
              icon: makeMarkerIcon(color)
            }
          }
        );
        socketIORef.current?.emit("new-direction", {
          routeId: routeIdSelected,
        });
      } catch (error) {
        if (error instanceof RouteExistsError) {
          enqueueSnackbar(`A rota "${route?.title}" já foi adicionada, espere finalizar.`, {
            variant: 'error'
          })
          return
        }
        throw Error;
      }
    },
    [routes, routeIdSelected, mapRef, socketIORef, enqueueSnackbar]
  );

  return (
    <Grid item xs={12} sm={3}>
      <Navbar />
      <form onSubmit={handleStartRoute} className={classes.form}>
        <Select
          fullWidth
          displayEmpty
          value={routeIdSelected}
          onChange={(event) => setRouteIdSelected(event.target.value + "")}
        >
          <MenuItem value="">
            <em>Selecione uma corrida</em>
          </MenuItem>
          {routes.map((route, key) => (
            <MenuItem key={key} value={route._id}>
              <em>{route.title}</em>
            </MenuItem>
          ))}
        </Select>
        <div className={classes.btnSubmitWrapper}>
          <Button type="submit" color="primary" variant="contained">
            Iniciar uma corrida
          </Button>
        </div>
      </form>
    </Grid>
  );
}