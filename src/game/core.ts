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