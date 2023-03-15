# Starfinder RPG Ship Builder

A single-page web app for building starships for the Starfinder RPG, by Paizo Inc.

## Production and Development Modes

For development, work on the base folder. Run `grunt watch` to compile in dev mode. Run `grunt` to compile once for production deployment.

When ready to deploy, run Grunt. Minified files will appear in the `app` folder. Just copy this folder to the server.

To use Vue.js browser extension (dev mode) add this script towards end of `index.php`:

    <script src="https://unpkg.com/vue"></script>

For production, use:

    <script src="vendor/vue/vue.min.js"></script>

### Dependencies: Sass

Run `sass` to compile CSS. Sass is not included in Grunt watch; I didn't think styles would change that much. May need to create `/css` folder manually. To install sass, make sure Ruby is installed, then:

    gem install sass

Note that I tried `npm install -g sass`, but this causes an error. Then, to run sass:

    sass --watch sass:css --style compressed

### Dependencies: vue.js and clipboard.js

Set up these files:

    vendor/vue/vue.min.js
    vendor/clipboard/dist/clipboard.min.js

Visit respective vendor sites to get files.

Might also need to copy vendor folder into app.

### Images

SVGs are embedded, so no probs. Might need to copy /img to /app

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

- If building sample ships using the ship builder, output from the ship builder should go in the `params` property in the JSON file. E.g.:

  {
  "id": "inheritorworks-shieldcraft",
  "src": "pact",
  "name": "Inheritorworks Shieldcraft",
  "tier": "8",
  "params": {
  // ship builder output goes here
  }
  }
