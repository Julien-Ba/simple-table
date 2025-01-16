import babel from '@rollup/plugin-babel';
import sass from 'rollup-plugin-sass';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: 'src/Table.jsx',
    output: {
        dir: 'dist',
        format: 'es',
        preserveModules: true,
        preserveModulesRoot: 'src',
        exports: 'named',
    },
    plugins: [
        nodeResolve({
            extensions: ['.js', '.jsx', '.scss'],
        }),
        sass({
            insert: true,
            api: 'modern',
            options: {
                style: 'compressed',
            },
            include: ['**/*.scss'],
            exclude: ['node_modules/**'],
        }),
        babel({
            babelHelpers: 'bundled',
            presets: ['@babel/preset-react'],
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx'],
        }),
    ],
    external: ['react', 'react-dom', 'prop-types', 'str-case-converter'],
};
