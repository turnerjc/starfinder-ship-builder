# Starfinder RPG Ship Builder

A single-page web app for building starships for the Starfinder RPG.
Forked from https://github.com/turnerjc/starfinder-ship-builder


## Getting Started
    You can do local development by running 
    `npm install` and grunt watch.

    If you don't want install all of the dependencies you can rebuild the docker image with
    `docker-compose up --build`

## Production and Development Modes

For development, work on the base folder. Run `grunt watch` to compile in dev mode. Run `grunt` to compile once for production deployment.

### Dependencies: Sass

Run `sass` to compile CSS. Sass is not included in Grunt watch; I didn't think styles would change that much. May need to create `/css` folder manually. To install sass, make sure Ruby is installed, then:

    gem install sass

Note that I tried `npm install -g sass`, but this causes an error. Then, to run sass:

    sass --watch sass:css --style compressed

### Dependencies: vue.js and clipboard.js

vue.js and clipboard.js are copied over to dist by grunt, and copied from node_modules folder.

### Images

SVGs are embedded, so no problems. Grunt copies these over to dist.

### File structure

Expected file structure of /app

    /css
    /data
    /img
    /js
    /vendor
    .htaccess
    index.html
    
### Data

A few things to note:

* If building sample ships using the ship builder, output from the ship builder should go in the `params` property in the JSON file. E.g.:

    {
        "id": "inheritorworks-shieldcraft",
        "src": "pact",
        "name": "Inheritorworks Shieldcraft",
        "tier": "8",
        "params": {
            // ship builder output goes here
        }
    }

