import { UUID } from 'crypto';
import { Int2, Float2, Grid } from './core';
import { v4 as uuidv4 } from 'uuid';
import { SortedArray } from 'typescript';
import { quickSort, binarySearch} from './sorting';

const enum Orientation {
    Vertical,
    Horizontal
}

let placedShips = Grid<number>; // numbers corrospond to a ships id, which can be looked up on a hash map 

interface Ship {
    id: number;
    orientation: Orientation;
    lowestIndex: Int2;
    length: number;
    hit: boolean;
}

interface PlayerInstance {
    board: Grid<number>;
    // Sorted for quick lookup with binary search
    ships: SortedArray<Ship>;
}

class GameInstance {
    playerInstances: {[key: UUID]: PlayerInstance | undefined} = {};

    /**
     * Attempts to hit a ship at the coordinates specified.
     * @param id the UUID of the player
     * @param coord the corrdinate to hit on the players board
     * @returns true if the querry hit a ship, false if not.
     */
    hitPlayerShip(id: UUID, coord: Int2): boolean {
        let p = this.playerInstances[id];
        if (p === undefined)
            throw new ReferenceError(`Player with ID (${id}) does not exist in this game instance!`);
        
        let shipId =  p.board.getData(coord);
        // -1 indicates that there is no ship on that index
        if (shipId === -1)
            return false;

        let ship = binarySearch(
            p.ships, 
            (s) => s.id > shipId, 
            (s) => s.id === shipId) as Ship;
        ship.hit = true;
        return true;
    }

    /**
     * Checks if the player has lost the game.
     * @param id The UUID of the player
     * @returns true if the player has no unhit ships left
     */
    playerHasLost(id: UUID): boolean {
        let p = this.playerInstances[id];
        if (p === undefined)
            throw new ReferenceError(`Player with ID (${id}) does not exist in this game instance!`);

        p.ships.forEach((s) => {
            // You only need one unhit ship to keep playing.
            if (!s.hit)
                return false;
        });
        return true;
    }
}