import { SortedArray } from 'typescript';

/**
 * The quick sort algorithm, famous for sorting things quickly.
 * @param arr An unsorted array
 * @param greaterThan A function that returns true if a is greater than b (a > b)
 * @returns A new array, with all the elements in order
 */
export function quickSort<T>(arr: T[], greaterThan: (a: T, b: T) => boolean): SortedArray<T> {
    if (arr.length < 2)
      return arr as SortedArray<T>;

    let less: T[] = [];
    let greater: T[] = [];
    let pivotIndex = Math.floor(Math.random() * arr.length);
    let pivot = arr[pivotIndex];
    
    arr.forEach((val, i) => {
        if (i === pivotIndex)
            return;

        if (greaterThan(val, pivot)) {
            greater.push(val);
        } else {
            less.push(val)
        }
    });

    return quickSort(less, greaterThan).concat([pivot], quickSort(greater, greaterThan)) as SortedArray<T>;
}

/**
 * Binary search algorithm, famous for searching.
 * @param arr A sorted array.
 * @param greaterThanTarget A function that checks if a value ***is greater than*** the target.
 * @param isTarget A function that checks if the value ***is*** the target
 * @returns The *index of the target*, or *-1* if not found
 */
export function binarySearchIndex<T>(arr: SortedArray<T>, greaterThanTarget: (a: T) => boolean, isTarget: (a: T) => boolean): number {
    let min = 0;
    let max = arr.length - 1;
    let mid = Math.floor((min + max) / 2);

    while (!isTarget(arr[mid]) && min !== max) {
        if (greaterThanTarget(arr[mid])) 
            max = mid - 1;
        else 
            min = mid + 1;
        mid = Math.floor((min + max) / 2);
    }
    
    return isTarget(arr[mid]) ? mid : -1;
}

/**
 * Binary search algorithm, famous for searching.
 * @param arr A sorted array.
 * @param greaterThanTarget A function that checks if a value ***is greater than*** the target.
 * @param isTarget A function that checks if the value ***is*** the target
 * @returns The *target*, or *undefined* if not found
 */
export function binarySearch<T>(arr: SortedArray<T>, greaterThanTarget: (a: T) => boolean, isTarget: (a: T) => boolean): T | undefined {
    return arr[binarySearchIndex(arr, greaterThanTarget, isTarget)];
}