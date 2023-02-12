import {
  createContext,
  useState,
  FunctionComponent,
  useEffect,
  ReactNode,
  useRef,
  createRef,
} from "react";
import { Route, RouteContextProps } from "../@types/route";
import { Map } from '../utils'
import { API_URL } from '../constants'

const RouteContext = createContext<RouteContextProps>({
  routes: [],
  mapRef: createRef()
})

const RouteContextProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const mapRef = useRef<Map>(null);

  useEffect(() => {
    fetch(`${API_URL}/routes`)
      .then((data) => data.json())
      .then((response) => setRoutes(response));
  }, []);

  return (
    <RouteContext.Provider value={{ routes, mapRef }}>
      {children}
    </RouteContext.Provider>
  );
};

export { RouteContextProvider, RouteContext }