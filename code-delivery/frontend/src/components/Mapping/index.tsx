import { Grid, Select, MenuItem, Button } from "@material-ui/core";
import { useState, useEffect, FormEvent, useCallback } from "react";
import { Route } from "../../util/models";

interface Props {}
const API_URL = process.env.REACT_APP_API_URL;

export const Mapping = (props: Props) => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [routeIdSelected, setRouteIdSelected] = useState<string>("");

  useEffect(() => {
    fetch(`${API_URL}/routes`)
      .then((data) => data.json())
      .then((response) => setRoutes(response));
  }, []);

  const handleStartRoute = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      console.log("routeIdSelected", routeIdSelected);
    },
    [routeIdSelected]
  );

  return (
    <Grid container>
      <Grid item xs={12} sm={3}>
        <form onSubmit={handleStartRoute}>
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
          <Button type="submit" color="primary" variant="contained">
            Iniciar uma corrida
          </Button>
        </form>
      </Grid>
      <Grid item xs={12} sm={9}>
        <div id="map"></div>
      </Grid>
    </Grid>
  );
};
