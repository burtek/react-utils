import commonjs from '@rollup/plugin-commonjs';
import { dirname } from 'path';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import ts from 'rollup-plugin-ts';
import * as pkg from './package.json';

const baseConfig = {
    input: 'src/index.ts',
    preserveModules: true
};

export default [{
    ...baseConfig,
    output: [{
        dir: dirname(pkg.main),
        format: 'cjs',
        sourcemap: 'inline'
    }, {
        dir: dirname(pkg.module),
        format: 'esm',
        sourcemap: 'inline'
    }],
    plugins: [
        peerDepsExternal(), // React
        ts(),
        commonjs()
    ]
}, {
    ...baseConfig,
    output: {
        dir: dirname(pkg.types),
        format: 'esm'
    },
    plugins: [dts()]
}];
