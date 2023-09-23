import { UUID } from 'crypto';
import { Int2, Float2 } from './core';
import { v4 as uuidv4 } from 'uuid';
import { SortedArray } from 'typescript';
import {Maybe, bindMaybe} from './monads';

const enum Orientation {
    Vertical,
    Horizontal
}

interface Ship {
    id: number;
    orientation: Orientation;
    lowestIndex: Int2;
    length: number;
    hit: boolean;
}

interface PlayerInstance {
    // Sorted for quick lookup with binary search
    ships: SortedArray<Ship>;
}

class GameInstance {
    
}