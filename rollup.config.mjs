import babel from '@rollup/plugin-babel';
import sass from 'rollup-plugin-scss';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: 'src/Table.jsx',
    output: [
        {
            file: 'dist/index.js',
            format: 'esm',
        },
    ],
    plugins: [
        nodeResolve({
            extensions: ['.js', '.jsx', '.scss'],
            moduleDirectories: ['node_modules', 'src'],
        }),
        sass({
            insert: true,
            api: 'modern',
            options: {
                style: 'compressed',
            },
            include: ['src/**/*.scss'],
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
