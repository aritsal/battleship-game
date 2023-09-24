import { UUID } from "crypto";
import { Maybe, bindMaybe } from "./monads";

type ShipId = number;
type Orientation = boolean;
const VERTICAL: Orientation = true;
const HORIZONTAL: Orientation = false;

interface Ship {
  id: ShipId;
  orientation: Orientation;
  length: number;
  hit: boolean;
  x: number;
  y: number;
}

interface MarkedCoord {
  x: number;
  y: number;
  hit: boolean;
}

interface PlayerInstance {
  uuid: UUID;
  markedCoords: MarkedCoord[];
  ships: Ship[];
  alive: boolean;
}

class GameInstance {
  /** The width of the game's board */
  width: number;
  /** The height of the game's board */
  height: number;
  players: PlayerInstance[] = [];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

function findPlayer(
  players: PlayerInstance[],
  playerId: UUID
): Maybe<PlayerInstance> {
  return players.find((p) => p.uuid === playerId);
}

function findShip(ships: Ship[], id: ShipId): Maybe<Ship> {
  return ships.find((s) => s.id === id);
  0;
}

function coordIsOnShip(ship: Ship, x: number, y: number): boolean {
  if (ship.orientation === VERTICAL) {
    if (x !== ship.x) return false;
    if (y < ship.y || ship.length + ship.y < y) return false;
  } else {
    if (y !== ship.y) return false;
    if (x < ship.x || ship.length + ship.x < x) return false;
  }
  return true;
}
