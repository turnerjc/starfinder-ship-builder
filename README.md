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

Run `npm run build` to build a deployable distribution in the `dist` directory
and deploy to GitHub pages using `vite-pluging-gh-pages`. 

### Changes from upstream

The file layout has changed. 

    sfshipbuilder/
    ├── README.md
    ├── dist/
    │   ├── assets/
    │   └── index.html
    ├── index.html
    ├── node_modules/
    ├── package-lock.json
    ├── package.json
    ├── src/
    │   ├── App.vue
    │   ├── app.js
    │   ├── components/
    │   ├── data/
    │   ├── img/
    │   ├── main.js
    │   ├── modules/
    │   └── sass/
    └── vite.config.js

Vite can set the root directory anywhere in the repo, but the GitHub plugin
worked best when `index.html` was in the top level git directory. `index.html`
is now just a wrapper to invoke `main.js`. `main.js` creates the app from
`App.vue`. The majority of the webpage layout has moved from `index.html` to
`App.vue` and the javascript has moved from `js/script.js` to `app.js`.
Together, `App.vue` and `app.js` compose the root component.

Vue components have been created for each section of the website, but only a few
are currently working as components. The remaining components have been copied
back inline into App.vue and the intention is to revisit them to get them
working as Vue components.

The functions that were not part of the root component have been moved to
src/modules.

src/modules/
├── clipboard.js
├── helpers.js
├── stringPrototypes.js
└── weaponMount.js

The helper functions in script.js moved to modules/helper.js. The clipboard
function moved to modules/clipboard.js. The weapon mount function object moved
to modules/weaponMount.js. 

Currently, the majority of the HTML is still in App.vue. The various sections
have been copied to files in the `components` directory. As of March 2023, the
following sections are working as components, with props passed from the App to
the component, where needed.

- Nav
- Summary
- Intro (including Recent Updates)
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
- SystemsAndUpgrades
- CustomComponents
- Crew
- Output
- JSONOutput (clipboard button not working)
- Footer

### Dependencies

Vite takes care of loading the correct NPM modules for development vs.
production. See `package.json` for dependencies.

- `vite` runs `sass` automagically to compile SCSS files. Sass is installed via `package.json`. 
- `vite build` uses `vite-plugin-gh-pages` to deploy to GitHub Pages.
- Not currently using `clipboard`
- Not currently using `vuetify`

### Images

SVGs for the ship sheet are defined as HTML, so as soon as I figure that out, it
should work good. I've disabled the ship-blue background and removed the image
credit in the footer. 

### Dist directory structure

`npm run build` runs `vite build` which produces the build output in the
`dist` directory. 


    dist
    ├── .nojekyll
    ├── assets
    │   ├── favicon-48478529.ico
    │   ├── index-682549de.css
    │   ├── index-86803141.js
    │   └── starfinder-logo-xs-c3d77868.png
    └── index.html

The GitHub plugin copies these files to the `gh-pages` branch and pushes it to
GitHub. You don't need to merge `gh-pages` branch to master or your working
branch. The GitHub Page can configured in the Settings on GitHub. Under
Pages->Build and deployment->Source select `Deploy from a branch`.  Under
Pages->Build and deployment->Source select `gh-pages` `/(root)` and `Save`.  If
you have a custom domain, you can set that here as well.

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
Dark Matter/Starforger/5e Compatible options contain values which are used when
AC/TL and bonus calculations are made. The following computed values and methods
check for Dark Matter.

...

