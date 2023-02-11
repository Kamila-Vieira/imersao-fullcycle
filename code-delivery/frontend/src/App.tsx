import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from 'notistack'
import { RouteContextProvider } from './context/RouteProvider'
import { Screen } from "./components/Screen";
import theme from "./theme";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <RouteContextProvider>
          <CssBaseline />
          <Screen />
        </RouteContextProvider>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
}

export default App;
