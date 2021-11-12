# @dtrw/react-utils

![npm version](https://badge.fury.io/js/@dtrw%2Freact-utils.svg)
![NPM License](https://img.shields.io/npm/l/@dtrw/react-utils)

This is repository with some react utils (just hooks for now) that are used (or will be used) in my other projects, but can also be used by anyone

- [Install](#install)
- [Usage](#usage)
  + [`useArray`](#-usearray-)
  + [`useObject`](#-useobject-)

## Install

```bash
yarn add -D @dtrw/react-utils
```

or

```bash
npm i -D @dtrw/react-utils
```

## Usage

### `useArray`

This hook aims to achieve two goals:

- allows using arrays in `useMemo`/`useCallback`/`useEffect`-like hooks and make sure they won't rerun if arrays don't actually change
- allows using arrays in above mentioned hooks' dependency arrays just like that (without spread workarounds etc) without triggering [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks)' `exhaustive-deps` rule

```ts
function useArray<T>(
    data: T[], // array of interest
    isEqual?: (prev: T, current: T) => boolean // method for deep-checking if any of elements changed or not
): T[];
```

`isEqual` defaults to reference `===` check. If provided, will be called for each pair of previous' and current's arrays' elements ONLY IF those arrays are not the same reference and are of same length.

Example:

```tsx
import { useMemo } from 'react';
import { useArray } from '@dtrw/react-utils';

function Component({ data }: Props) {
    const memoedData = useArray(data);

    // useMemo won't re-calculate until `data`'s contents actually changes
    const rendered = useMemo(() => memoedData.map(renderElement), [memoedData]);

    return <>{rendered}</>
}
function Component2({ data }: Props) {
    const memoedData = useArray(data);

    // SomeComponent won't rerender until `data`'s contents actually changes
    return <SomeComponent data={memoedData} />
}
```

### `useObject`

This hook allows using object in `useMemo`/`useCallback`/`useEffect`-like hooks while making sure they won't rerun unless the object's content actually changes

```ts
function useObject<T>(
    object: T, // object of interest
    isEqual?: (prev: T, current: T) => boolean // method for deep-checking if object actually changed
): T[];
```

`isEqual` defaults to reference `===` check. If provided, will be called on each render ONLY IF current reference differs from previous one. If it returns true, the previous reference will be returned. If not provided, `useObject` becomes a no-op.

Example:

```tsx
import { useMemo } from 'react';
import { useObject } from '@dtrw/react-utils';

function Component() {
    const date = useObject(new Date(), (oldDate, nowDate) => oldDate.getFullYear() === nowDate.getFullYear());

    const rendered = useEffect(() => alert('Year changed to ' + date.getFullYear()), [date]);

    return <div />
}
```

### `useToggle`

This hook is a wrapper on `boolean` `useState` that also returns a method for toggling the state

Usage:

```tsx
import { useToggle } from '@dtrw/react-utils';

// state and setState come directly from `useState`
const [state, toggle, setState] = useToggle(true) // accepts boolean initialState
// or
const [state, toggle, setState] = useToggle() // defaults to false
```

### `usePrevious`

This hook remembers it's argument's value from previous render

Usage:

```tsx
import { usePrevious } from '@dtrw/react-utils';

const previous = usePrevious(current)
```

Example of return values:

render | argument value | return value
------:|----------------|--------------
\#0 | `1` | `undefined`
\#1 | `2` | `1`
\#2 | `2` | `2`
\#3 | `'abc'` | `2`
\#4 | `null` | `'abc'`
\#5 | `null` | `null`
\#6 | `1` | `null`

etc...
