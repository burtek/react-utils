import { renderHook } from '@testing-library/react-hooks';
import { usePrevious } from './usePrevious';

describe('usePrevious', () => {
    it('should return undefined on first render', () => {
        const { result } = renderHook(() => usePrevious(123));

        expect(result.current).toBe(undefined);
    });

    it('should return given value on next render', () => {
        const value = 123;

        const { rerender, result } = renderHook(() => usePrevious(value));
        rerender();

        expect(result.current).toBe(value);
    });

    it('should return previous value on next render', () => {
        const value1 = 123;
        const value2 = 'aaa';
        const value3 = [1, 'a', null];

        let value: typeof value1 | typeof value2 | typeof value3 = value1;

        const { rerender, result } = renderHook(() => usePrevious(value));
        expect(result.current).toBe(undefined);

        value = value2;
        rerender();
        expect(result.current).toBe(value1);

        value = value3;
        rerender();
        expect(result.current).toBe(value2);

        rerender();
        expect(result.current).toBe(value3);
    });
});
