import { useRef } from 'react';

type Disallow<T extends object, D> = T extends D ? never : T;
type ActualObject<T extends object> = Disallow<T, null | unknown[]>;

function assertActualObject<T extends object>(object: unknown): asserts object is ActualObject<T> {
    if (typeof object !== 'object') {
        throw new TypeError(`useObject requires an object, got ${typeof object}`);
    } else if (Array.isArray(object)) {
        throw new TypeError('Use useArray for arrays');
    }
}

/**
 * Takes an object and for subsequent renders compares reference. Is actual no-op if not using comparing method
 *
 * @param object
 */
export function useObject<T>(object: T): T;
/**
 * Takes an object and for subsequent renders compares reference and contents using `isEqual` method.
 *
 * If reference is same or if `isEqual` return true, returns previous reference
 *
 * @param object
 * @param isEqual method to compare objects. Called only if reference is different.
 */
export function useObject<T>(object: T, isEqual: (prevObject: T, currentObject: T) => boolean): T;
export function useObject(object: unknown, isEqual = (prev: unknown, curr: unknown) => prev === curr) {
    const ref = useRef(object);

    assertActualObject(object);

    if (ref.current !== object && !isEqual(ref.current, object)) {
        ref.current = object;
    }

    return ref.current;
}
