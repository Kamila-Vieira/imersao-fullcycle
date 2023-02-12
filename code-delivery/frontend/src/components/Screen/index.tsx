import { FunctionComponent, useRef, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Form } from "../Form";
import { Mapping } from "../Mapping";
import { API_URL } from "../../constants";
import { useStyles } from "./styles";

export const Screen: FunctionComponent = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root}>
      <Form />
      <Mapping />
    </Grid>
  );
}