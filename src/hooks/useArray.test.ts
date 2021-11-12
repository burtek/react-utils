import { renderHook } from '@testing-library/react-hooks';
import { useArray } from './useArray';

describe('useArray', () => {
    const initialArray = [1, 2, 3];

    it.each([
        null,
        123,
        'string',
        {}
    ])('should throw if input is %s', input => {
        expect(() => {
            const { result } = renderHook(() => useArray(input as any));
            return result.current;
        }).toThrowError(/^useArray requires array, got/);
    });

    it('should return reference to input on first and next render', () => {
        const { rerender, result } = renderHook(() => useArray(initialArray));

        expect(result.current).toBe(initialArray);
        rerender();
        expect(result.current).toBe(initialArray);
    });

    it('should return same reference if contents did not change', () => {
        let array = initialArray;
        const { rerender, result } = renderHook(() => useArray(array));
        array = [...array];
        rerender();

        expect(result.current).toBe(initialArray);
    });

    it('should return new reference if length changed', () => {
        let array = initialArray;
        const { rerender, result } = renderHook(() => useArray(array));
        array = [...array, 4];
        rerender();

        expect(result.current).toBe(array);
    });

    it('should return new reference if element changed', () => {
        let array = initialArray;
        const { rerender, result } = renderHook(() => useArray(array));
        array = [...array];
        array[0] = 4;
        rerender();

        expect(result.current).toBe(array);
    });

    it('should call isEqual', () => {
        let array = initialArray;
        const comp = jest.fn((prev: number, curr: number) => prev === curr);

        const { rerender, result } = renderHook(() => useArray(array, comp));
        array = [array[0], 5, 6];
        rerender();

        expect(comp).toHaveBeenCalledTimes(2);
        expect(comp).toHaveBeenNthCalledWith(1, initialArray[0], array[0]);
        expect(comp).toHaveBeenNthCalledWith(2, initialArray[1], array[1]);

        expect(result.current).toBe(array);
    });

    it('should return same reference if element changed but isEqual returns true', () => {
        let array = initialArray;
        const { rerender, result } = renderHook(() => useArray(array, () => true));
        array = [array[0], 5, 6];
        rerender();

        expect(result.current).toBe(initialArray);
    });

    it('should return new reference if length changed and isEqual returns true', () => {
        let array = initialArray;
        const { rerender, result } = renderHook(() => useArray(array, () => true));
        array = [...array, 4];
        rerender();

        expect(result.current).toBe(array);
    });
});
