import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState } from 'react';

export function useToggle(initial = false): [boolean, () => void, Dispatch<SetStateAction<boolean>>] {
    const [state, setState] = useState(initial);
    const toggle = useCallback(() => {
        setState(prev => !prev);
    }, []);
    return [state, toggle, setState];
}
