export type Maybe<T> = T | null | undefined;

export function bindMaybe<A, R>(m: Maybe<A>, func: (a: A) => Maybe<R>): Maybe<R> {
    if (m !== null || m !== undefined) 
        return func(m as A);
    return null;
}