import {
  createContext,
  useState,
  FunctionComponent,
  useEffect,
  useContext,
  ReactNode,
  useRef,
  createRef,
  MutableRefObject
} from "react";
import { Route } from "../@types/route";
import { Map } from '../utils'
import { API_URL } from '../constants'

interface ContextProps {
  routes: Route[]
  mapRef: MutableRefObject<Map | null>
}

const RouteContext = createContext<ContextProps>({
  routes: [],
  mapRef: createRef()
})

export const RouteContextProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
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

export const useRouteContext = () => useContext(RouteContext);