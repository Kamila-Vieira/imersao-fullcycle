import { useContext } from "react";
import { RouteContext } from "../context/RouteProvider";

export const useRouteContext = () => useContext(RouteContext);