/* eslint-disable @typescript-eslint/no-unsafe-return */
import { renderHook } from '@testing-library/react-hooks';
import { useObject } from './useObject';

describe('useObject', () => {
    const instance1 = { n: 1 };
    const instance2 = { n: 2 };

    it.each([
        123,
        'string',
        undefined
    ])('should throw if input is %s', input => {
        expect(() => {
            const { result } = renderHook(() => useObject(input as any));
            return result.current;
        }).toThrowError(/^useObject requires an object/);
    });
    it('should throw if input is array', () => {
        expect(() => {
            const { result } = renderHook(() => useObject([]));
            return result.current;
        }).toThrowError(/^Use useArray for arrays/);
    });

    it('should return same instance on first and next render', () => {
        const { rerender, result } = renderHook(() => useObject(instance1));

        expect(result.current).toBe(instance1);
        rerender();
        expect(result.current).toBe(instance1);
    });

    it('should return new instance if instance changes', () => {
        let object = instance1;
        const { rerender, result } = renderHook(() => useObject(object));
        object = instance2;
        rerender();

        expect(result.current).toBe(instance2);
    });

    it('should call isEqual', () => {
        const comp = jest.fn(() => false);

        let object = instance1;
        const { rerender, result } = renderHook(() => useObject(object, comp));
        object = instance2;
        rerender();

        expect(comp).toBeCalledWith(instance1, instance2);
        expect(result.current).toBe(instance2);
    });

    it('should return same instance if isEqual returns true', () => {
        let object = instance1;
        const { rerender, result } = renderHook(() => useObject(object, () => true));
        object = instance2;
        rerender();

        expect(result.current).toBe(instance1);
    });

    it('should return new instance if isEqual returns false', () => {
        let object = instance1;
        const { rerender, result } = renderHook(() => useObject(object, () => false));
        object = instance2;
        rerender();

        expect(result.current).toBe(instance2);
    });
});
