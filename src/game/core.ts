interface Vector2<T> {
    x: T;
    y: T;
}

interface Clonable<T> {
    clone: () => T;
}

export class Float2 implements Vector2<number>, Clonable<Float2> {
    public x: number = 0;
    public y: number = 0;

    public toString = (): string => {
        return `(${this.x}, ${this.y})`;
    }

    clone(): Float2 {
        return new Float2(this.x = 0, this.y = 0);
    }
    
    constructor (x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Int2 implements Vector2<number>, Clonable<Int2> {
    private _x: number = Math.floor(0) | 0;
    private _y: number = Math.floor(0) | 0;

    public toString = (): string => {
        return `(${this._x}, ${this._y})`;
    }

    set x(v: number) {
        this._x = Math.floor(v) | 0;
    }

    set y(v: number) {
        this._y = Math.floor(v) | 0;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    /**
     * Creates a deep copy of this vector.
     * @returns 
     */
    clone(): Int2 {
        return new Int2(this.x, this.y);
    }

    constructor (x: number = 0, y: number = 0) {
        this._x = Math.floor(x) | 0;
        this._y = Math.floor(y) | 0;
    }
}

export class Grid<T> implements Clonable<Grid<T>> {
    public readonly size: Int2;
    private _data: T[];

    /**
     * Returns true if the vector is in range of the grid *(0,0) <= i < (size.x, size.y)*.
     */
    isInRange(i: Int2) {
        return (0 <= i.x && i.x < this.size.x) && (0 <= i.y && i.y < this.size.y);
    }

    forEach(callback: (value: T, index: Int2) => void) {
        for(let y = 0; y < this.size.y; y++) {
            for(let x = 0; x < this.size.x; x++) {
                callback(this._data[x + y * this.size.y], new Int2(x, y));
            }
        }
    }

    /**
     * Returns the data stored at a coordinate
     * @param i The index (coordinate) to access
     */
    getData(i: Int2): T {
        if (!this.isInRange(i)) throw RangeError(`Value ${i.toString()} is out of range of the grid, ${this.size}!`);
        return this._data[i.x + i.y * this.size.y];
    }

    /**
     * Sets the data stored at an index
     * @param i The index (coordinate) to set
     * @param value The value to copy into index i
     */
    setData(i: Int2, value:T) {
        if (!this.isInRange(i)) throw RangeError(`Value ${i.toString()} is out of range of the grid, ${this.size}!`);
        this._data[i.x + i.y * this.size.y] = value;
    }

    /**
     * Clones this grid.
     */
    clone() {
        let g = new Grid<T>(this.size, () => undefined as T);
        g._data = structuredClone(this._data);
        return g;
    }

    constructor(size: Int2, factory: (i: Int2) => T) {
        this.size = size.clone();
        this._data = new Array(size.x * size.y);
        if (factory !== undefined) {
            this.forEach((_, i) => this.setData(i, factory(i.clone())));
        }
    }
}