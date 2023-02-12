import { MutableRefObject } from 'react'
import { Map } from '../utils'
import { Position } from './position'

export interface Route {
  _id: string;
  title: string;
  startPosition: Position;
  endPosition: Position;
}

export interface RouteContextProps {
  routes: Route[]
  mapRef: MutableRefObject<Map | null>
}
