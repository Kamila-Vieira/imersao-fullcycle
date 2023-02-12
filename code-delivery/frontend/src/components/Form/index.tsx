import { FunctionComponent, useCallback, FormEvent, useState } from "react";
import { Grid, Select, MenuItem, Button } from "@material-ui/core";
import { sample, shuffle } from 'lodash'
import { useSnackbar } from 'notistack'

import { makeCarIcon, makeMarkerIcon } from "../../utils";
import { COLORS_TO_RANDOM, DEFAULT_RANDOM_COLOR } from "../../constants";
import { useRouteContext } from "../../hooks/use-route-context";
import { RouteExistsError } from "../../errors/route-exists.error";
import { useStyles } from "./styles";
import { Navbar } from "../Navbar";

export const Form: FunctionComponent = () => {
  const [routeIdSelected, setRouteIdSelected] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();
  const { routes, mapRef } = useRouteContext();
  const classes = useStyles()

  const handleStartRoute = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const route = routes.find(route => route._id === routeIdSelected)
      const color = sample(shuffle(COLORS_TO_RANDOM)) || DEFAULT_RANDOM_COLOR;
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
        )
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
    [routeIdSelected, routes, enqueueSnackbar]
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