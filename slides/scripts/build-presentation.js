const asciidoctor = require('@asciidoctor/core')();
const asciidoctorRevealjs = require('@asciidoctor/reveal.js');
const sass = require('sass');
const fs = require('fs');
const { pathToFileURL} = require('url');

asciidoctorRevealjs.register()

function build() {
    console.log('Building presentation...');
    try {
        buildStyles();
    }catch (err) {
        console.error('Error building styles:', err);
    }
    try {
        buildPresentation();
    }catch (err) {
        console.error('Error building presentation:', err);
    }
    console.log('Done')
}

function buildStyles() {
    const stylesheet = sass.compile('styles/styles.scss', {
        importers: [{
            findFileUrl(url) {
                if (!url.startsWith('~')) {
                    return null;
                }
                return new URL(url.substring(1), pathToFileURL('node_modules/'));
            }
        }],
    });
    fs.writeFileSync('styles.css', stylesheet.css);
}

function buildPresentation() {
    const options = {
        safe: 'safe',
        backend: 'revealjs',
    }
    asciidoctor.convertFile('presentation.adoc', options);
}

module.exports = {build}
