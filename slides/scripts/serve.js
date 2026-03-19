const fs = require('fs');
const liveServer = require('live-server');
const {build} = require("./build-presentation");

build();

fs.watchFile('presentation.adoc', () => build());
fs.watchFile('docinfo-footer-revealjs.html', () => build());
fs.watch('slides', { recursive: true }, () => build());
fs.watch('styles', { recursive: true }, () => build());

liveServer.start({
    open: false,
    file: 'presentation.html',
})
