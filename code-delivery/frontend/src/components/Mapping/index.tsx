import { Grid } from "@material-ui/core";
import { useEffect, FunctionComponent } from "react";

import { useRouteContext } from "../../hooks/use-route-context";
import { getCurrentPosition, googleMapsLoader, Map } from "../../utils";
import { useStyles } from "./styles";

export const Mapping: FunctionComponent = () => {
  const { mapRef } = useRouteContext();
  const classes = useStyles()

  useEffect(() => {
    (async () => {
      const [, position] = await Promise.all([
        googleMapsLoader.load(),
        getCurrentPosition({ enableHighAccuracy: true })
      ])

      const containerMap = document.getElementById('map') as HTMLElement;
      mapRef.current = new Map(containerMap, {
        zoom: 15,
        center: position
      })

    })()
  }, [mapRef]);

  return (
    <Grid item xs={12} sm={9}>
      <div id="map" className={classes.map} />
    </Grid>
  );
};
