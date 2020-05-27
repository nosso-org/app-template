var fs = require('fs');
var chalk = require('chalk');

module.exports = {
    input: [
        'src/**/*.{js,svelte}',
        // Use ! to filter out files or directories
        '!src/**/*.spec.{js,svelte}',
        '!i18n/**',
        '!**/node_modules/**',
    ],
    output: './',
    options: {
        debug: true,
        func: {
            list: ['i18next.t', 'i18n.t'],
            extensions: ['.js', '.svelte']
        },        
        lngs: ['pt-BR', 'pt-PT'],        
        defaultValue: '__missing__',
        resource: {
            loadPath: 'public/i18n/{{lng}}/{{ns}}.json',
            savePath: 'public/i18n/{{lng}}/{{ns}}.json',
            jsonIndent: 4,
            lineEnding: '\n'
        },        
        fallbackLng: false,
        interpolation: {
            prefix: '{{',
            suffix: '}}'
        }
    },
    transform: function customTransform(file, enc, done) {
        "use strict";
        const parser = this.parser;
        const content = fs.readFileSync(file.path, enc);
        let count = 0;

        parser.parseFuncFromString(content, { list: ['i18next._', 'i18next.__'] }, (key, options) => {
            parser.set(key, Object.assign({}, options, {
                nsSeparator: false,
                keySeparator: false
            }));
            ++count;
        });

        if (count > 0) {
            console.log(`i18next-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(JSON.stringify(file.relative))}`);
        }

        done();
    }
};