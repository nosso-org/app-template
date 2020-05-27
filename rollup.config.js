import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import {terser} from 'rollup-plugin-terser'

import clear from 'rollup-plugin-clear'
import alias from '@rollup/plugin-alias'
import json from '@rollup/plugin-json'
import sveltePreprocess from 'svelte-preprocess'
import workbox from 'rollup-plugin-workbox-build'

const production = !process.env.ROLLUP_WATCH

export default {
    input: 'src/main.js',
    output: {
        sourcemap: !production,
        format: 'esm',
        name: 'app',
        dir: 'public/build/',
        chunkFileNames: '[hash].js',
    },
    plugins: [
        json(),
        alias({
            // Aliasing @amplify packages to our custom bundle
            // This is a hack. We keep using the @aws-amplify namespace throughout the code
            entries: {
                '@aws-amplify/core': 'local-amplify/dist/index.js',
                '@aws-amplify/auth': 'local-amplify/dist/index.js',
                '@aws-amplify/datastore': 'local-amplify/dist/index.js',
                '@aws-amplify/api': 'local-amplify/dist/index.js',
            },
        }),
        clear({
            targets: ['public/build'],
        }),
        svelte({
            dev: !production,
            css: (css) => {
                css.write('public/build/bundle.css', !production)
            },
            preprocess: sveltePreprocess({postcss: true}),
        }),
        resolve({
            browser: true,
            dedupe: ['svelte'],
        }),
        commonjs(),        

        workbox({
            mode: 'injectManifest',
            options: {
                swSrc: "./sw.js",
                swDest: 'public/sw.js',
                globDirectory: 'public/'
            },
        }),

        !production && serve(),

        !production && livereload('public'),

        production && terser(),
    ],
    watch: {
        clearScreen: false,
    },
}

function serve() {
    let started = false

    return {
        writeBundle() {
            if (!started) {
                started = true
                require('child_process').spawn(
                    'npm',
                    ['run', 'start', '--', '--dev'],
                    {
                        stdio: ['ignore', 'inherit', 'inherit'],
                        shell: true,
                    }
                )
            }
        },
    }
}
