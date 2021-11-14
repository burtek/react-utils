import { act, renderHook } from '@testing-library/react-hooks';
import { useToggle } from './useToggle';

describe('useToggle', () => {
    it('should return false by default', () => {
        const { result } = renderHook(() => useToggle());

        const [state] = result.current;

        expect(state).toBe(false);
    });

    it.each([true, false])('should return initial value %s by default', initial => {
        const { result } = renderHook(() => useToggle(initial));

        const [state] = result.current;

        expect(state).toBe(initial);
    });

    it.each([true, false])('should toggle value starting from %s', initial => {
        const { result } = renderHook(() => useToggle(initial));

        act(() => {
            const [, toggle] = result.current;
            toggle();
        });

        expect(result.current[0]).toBe(!initial);

        act(() => {
            const [, toggle] = result.current;
            toggle();
        });

        expect(result.current[0]).toBe(initial);
    });

    it.each([
        [false, false],
        [true, false],
        [false, true],
        [true, true]
    ])('should set state from %s to %s and then toggle', (initial, target) => {
        const { result } = renderHook(() => useToggle(initial));

        expect(result.current[0]).toBe(initial);

        act(() => {
            const [, , setState] = result.current;
            setState(target);
        });

        expect(result.current[0]).toBe(target);

        act(() => {
            const [, toggle] = result.current;
            toggle();
        });

        expect(result.current[0]).toBe(!target);
    });

    it('should work with multiple calls at once', () => {
        const { result } = renderHook(() => useToggle(true));

        act(() => {
            const [, toggle, setState] = result.current;
            setState(false);
            toggle();
        });

        expect(result.current[0]).toBe(true);
    });
});
