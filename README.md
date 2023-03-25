# Starforger RPG Ship Builder

A single-page web app for building starships for the Starfinder RPG, by Paizo Inc.

Thanks to [James Turner](https://twitter.com/james_c_turner) for creating the
original 
[Starfinder RPG Ship Builder](http://jamesturneronline.net/starfinder-ship-builder/)

This version has been modified to be D&D 5th Edition compatible for use in our
Starforger campaign. Starforger uses rules from Dark Matter by Mage Hand Press.

## Production and Development Modes

The development process has been converted to [Vite](https://vitejs.dev/) and
Vue2 code has been migrated to [Vue3](https://vuejs.org/).  

Run `npm install` to install the approprate NPM modules.  

Run `npm run dev` to start a dev server with Hot Module Replacement (HMR). This
will serve up the app on a localhost port and will update as you make changes.

Run `npm run build` to build a deployable distribution.

Run `npm run deploy` to deploy to GitHub pages. 

### Changes from upstream

Vue components have been created for each section of the website, but only a few
are currently working as components. The remaining components have been copied
back inline into App.vue and the intention is to revisit them to get them
working as Vue components.

sfsshipbuilder
├── README.md
├── *original*
│   ├── index.html
│   ├── script.js
│   └── ship-builder.json
├── package.json
├── *src*
│   ├── App.vue
│   ├── app.js
│   ├── *components*
│   ├── *data*
│   ├── *img*
│   ├── index.html
│   ├── index.js
│   ├── *modules*
│   └── *sass*
├── vite.config.js

The webpage layout has moved from index.html to App.vue. The new entry point is
index.html which simply invokes index.js to setup Vue and invoke App.vue.
App.vue contains the webpage layout (formerly in index.html) and invokes app.js
(formerly js/script.js).

The functions that weren't in the root component have been moved to src/modules.

src/modules
├── clipboard.js
├── helpers.js
├── stringPrototypes.js
└── weaponMount.js

The helper functions in script.js moved to modules/helper.js. The clipboard function moved to modules/clipboard.js. The weapon mount function object moved to modules/weaponMount.js. 

Currently, the majority of the HTML is still in App.vue. The various sections
have been copied to files in the `components` directory. As of 03/24/2023, the
following sections are working as components, with props passed from the App to
the component, where needed.

- Nav
- Summary
- RecentUpdates
- Patreon (commented out)
- Sources

The following sections are inline in Apps.vue and still need to be implemented
as components.

- Input
- Concept
- Tier
- ShipFrame
- CustomFrame
- PowerCore
- Thrusters
- Armor
  - AblativeArmor
  - FortifiedHull
  - ReinforcedBulkhead
- Computer
- CrewQuarters
- Defenses
- DriftEngines
- ExpansionBays
- Security
- Sensors
- Shields
- WeaponMounts
- OtherSystems
- CustomComponents
- Crew
- Output
- JSONOutput (clipboard button not working)
- Footer

### Dependencies

Vite takes care of loading the correct NPM modules for development vs.
production. See `package.json` for dependencies.

- Vite runs `sass` automagically to compile SCSS files. Sass is installed via `package.json`. 
- Vite supports `gh-pages` to deploy to GitHub Pages.

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

- If building sample ships using the ship builder, output from the ship builder
should go in the `params` property in the JSON file. E.g.:

```
{
  "id": "inheritorworks-shieldcraft",
  "source": "pact",
  "name": "Inheritorworks Shieldcraft",
  "tier": "8",
  "params": {
    // ship builder output goes here
  }
}
```