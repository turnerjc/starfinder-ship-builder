import { createApp } from 'vue'
import Ship from './components/Ship.vue'
import Graphics from './components/Graphics.vue'
import Nav from './components/Nav.vue'
import Summary from './components/Summary.vue'
import App from './App.vue'

const app = createApp(App)

app
  .component('Ship', Ship)
  .component('Graphics', Graphics)
  .component('Nav', Nav)
  .component('Summary', Summary)
// .component('RecentUpdates', RecentUpdates)
// .component('Patreon', Patreon)
// .component('Sources', Sources)
// .component('Input', Input)
// .component('Concept', Concept)
// .component('Tier', Tier)
// .component('ShipFrame', ShipFrame)
// .component('CustomFrame', CustomFrame)
// .component('PowerCore', PowerCore)
// .component('Thrusters', Thrusters)
// .component('OtherSystems', OtherSystems)
// .component('AblativeArmor', AblativeArmor)
// .component('Armor', Armor)
// .component('Computer', Computer)
// .component('CrewQuarters', CrewQuarters)
// .component('Defenses', Defenses)
// .component('DriftEngines', DriftEngines)
// .component('ExpansionBays', ExpansionBays)
// .component('FortifiedHull', FortifiedHull)
// .component('ReinforcedBulkhead', ReinforcedBulkhead)
// .component('Security', Security)
// .component('Sensors', Sensors)
// .component('Shields', Shields)
// .component('WeaponMounts', WeaponMounts)
// .component('CustomComponents', CustomComponents)
// .component('Crew', Crew)
// .component('Output', Output)
// .component('JSONOutput', JSONOutput)
// .component('Footer', Footer)

app.mount('#app')
