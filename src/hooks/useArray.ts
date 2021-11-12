import { useRef } from 'react';

function assertTArray<T>(array: unknown): asserts array is T[] {
    if (!Array.isArray(array)) {
        let type: string;
        if (typeof array === 'object' && array !== null) {
            const typeString = Object.prototype.toString.call(array);
            type = /^\[object (.+)\]$/g.exec(typeString)?.[1] ?? typeof array;
        } else {
            type = array === null ? 'null' : typeof array;
        }
        throw new TypeError(`useArray requires array, got ${type}`);
    }
}

/**
 * Takes an array and for subsequent renders compares reference, length and actual items.
 *
 * If reference is same or if length and items did not change, returns previous reference
 *
 * @param array
 */
export function useArray<T>(array: T[]): T[];
/**
 * Takes an array and for subsequent renders compares reference, length and actual items.
 *
 * If reference is same or if length and items did not change, returns previous reference
 *
 * @param array
 * @param isEqual method to compare items. Called only if reference is different and length did not change.
 */
export function useArray<T>(array: T[], isEqual: (prevElement: T, currentElement: T) => boolean): T[];
export function useArray<T>(array: T[] | unknown, isEqual = (prev: unknown, curr: unknown) => prev === curr) {
    const ref = useRef(array);

    assertTArray(array);
    assertTArray(ref.current);

    if (ref.current !== array && (ref.current.length !== array.length || ref.current.some((arg, index) => !isEqual(arg, array[index])))) {
        ref.current = array;
    }

    return ref.current;
}
