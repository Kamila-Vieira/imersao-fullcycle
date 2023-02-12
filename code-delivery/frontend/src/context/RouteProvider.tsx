import {
  createContext,
  useState,
  FunctionComponent,
  useEffect,
  ReactNode,
  useRef,
  createRef,
  useCallback
} from "react";
import io from "socket.io-client";
import { useSnackbar } from 'notistack'

import { Route, RouteContextProps } from "../@types/route";
import { Map } from '../utils'
import { API_URL } from '../constants'

const RouteContext = createContext<RouteContextProps>({
  routes: [],
  mapRef: createRef(),
  socketIORef: createRef(),
})

const RouteContextProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const mapRef = useRef<Map>(null);
  const socketIORef = useRef<SocketIOClient.Socket>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetch(`${API_URL}/routes`)
      .then((data) => data.json())
      .then((response) => setRoutes(response));
  }, []);

  const finishRoute = useCallback(
    (route: Route) => {
      enqueueSnackbar(`A rota "${route.title}" foi finalizada!`, {
        variant: "success",
      });
      mapRef.current?.removeRoute(route._id);
    },
    [enqueueSnackbar]
  );

  useEffect(() => {
    if (!socketIORef.current?.connected) {
      socketIORef.current = io.connect(API_URL);
      socketIORef.current?.on("connect", () => console.log("conectou"));
    }

    const handleChangePosition = (data: {
      routeId: string,
      position: [number, number],
      finished: boolean
    }) => {
      const [lat, lng] = data.position
      mapRef.current?.moveCurrentMarker(data.routeId, { lat, lng })
      const route = routes.find(route => route._id === data.routeId) as Route
      if (data.finished) {
        setTimeout(() => {
          finishRoute(route);
        }, 500)
      }
    }
    socketIORef.current?.on('new-position', handleChangePosition)

    return () => {
      socketIORef.current?.off('new-position', handleChangePosition)
    }
  }, [finishRoute, routes])

  return (
    <RouteContext.Provider value={{ routes, mapRef, socketIORef }}>
      {children}
    </RouteContext.Provider>
  );
};

export { RouteContextProvider, RouteContext }