import { createApp } from 'vue'
import App from './App.vue'
import Graphics from './components/Graphics.vue'
import Nav from './components/Nav.vue'
// import Summary from './components/Summary.vue'
// import RecentUpdates from './components/RecentUpdates.vue'
// import Patreon from './components/Patreon.vue'
// import Sources from './components/Sources.vue'
// import Input from './components/Input.vue'
// import Concept from './components/Concept.vue'
// import Tier from './components/Tier.vue'
// import ShipFrame from './components/ShipFrame.vue'
// import CustomFrame from './components/CustomFrame.vue'
// import PowerCore from './components/PowerCore.vue'
// import Thrusters from './components/Thrusters.vue'
// import AblativeArmor from './components/AblativeArmor.vue'
// import Armor from './components/Armor.vue'
// import Computer from './components/Computer.vue'
// import CrewQuarters from './components/CrewQuarters.vue'
// import Defenses from './components/Defenses.vue'
// import DriftEngines from './components/DriftEngines.vue'
// import ExpansionBays from './components/ExpansionBays.vue'
// import FortifiedHull from './components/FortifiedHull.vue'
// import ReinforcedBulkhead from './components/ReinforcedBulkhead.vue'
// import Security from './components/Security.vue'
// import Sensors from './components/Sensors.vue'
// import Shields from './components/Shields.vue'
// import WeaponMounts from './components/WeaponMounts.vue'
// import OtherSystems from './components/OtherSystems.vue'
// import CustomComponents from './components/CustomComponents.vue'
// import Crew from './components/Crew.vue'
// import Output from './components/Output.vue'
// import JSONOutput from './components/JSONOutput.vue'
// import Footer from './components/Footer.vue'

const app = createApp(App)

app.component('Graphics', Graphics).component('Nav', Nav)
// .component('Summary', Summary)
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
