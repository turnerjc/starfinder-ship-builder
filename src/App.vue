<template>
  <!--
	| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	|	APP
	| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	-->
  <div id="app" class="wrapper">
    <Ship></Ship>
    <Graphics></Graphics>

    <!--
    | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    | SIDEBAR
    | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    -->

    <div class="sidebar" id="sidebar">
      <a href="#" class="sidebar__control sidebar__close">
        <svg class="icon">
          <use xlink:href="#icon-close" />
        </svg>
      </a>

      <h3>{{ shipName }} (Tier&nbsp;{{ tier.name }})</h3>
    </div>
    <!-- sidebar -->

    <!--
    | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    | MAIN
    | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    -->

    <div class="main">
      <a href="#sidebar" class="sidebar__control sidebar__open">
        <div class="sidebar__close__left">
          <!-- BP -->
          <svg class="icon">
            <use xlink:href="#icon-build" />
          </svg>
          <span
            class="cost__current"
            v-bind:class="{ 'cost__current--danger': isBpCostOverBudget }"
            >{{ totalBpCost }}</span
          >
          /
          <span class="cost__budget">{{ tier.bpBudget }}</span>

          <!-- PCU -->
          <svg class="icon">
            <use xlink:href="#icon-power" />
          </svg>
          <span
            class="cost__budget"
            title="Total PCU cost, including both essential and non-essential systems">
            {{ totalPcuCost.essential + totalPcuCost.nonEssential }}</span
          >
          /
          <span
            class="cost__current"
            v-bind:class="{ 'cost__current--danger': isPcuCostOverBudget }"
            title="Total PCU cost of essential systems only (weapons, shields, thrusters and defensive countermeasures)">
            {{ totalPcuCost.essential }}</span
          >
          /
          <span class="cost__budget">{{ pcuBudget }}</span>
        </div>

        <div class="sidebar__close__right">
          <svg class="icon">
            <use xlink:href="#icon-menu" />
          </svg>
        </div>
      </a>

      <header class="app-header">
        <h1>Starfinder RPG Ship Builder</h1>

        <div class="app-header__logo">
          <img src="img/starfinder-logo-xs.png" width="150" height="auto" alt="Starfinder Logo" />
        </div>
      </header>

      <!--
      <RecentUpdates />
      <Patreon />
      <Sources />
      <Input />
      <Concept />
      <Tier />
      <ShipFrame />
      <CustomFrame />
      <PowerCore />
      <Thrusters />
      -->

      <h2 id="otherSystems">Step 5: Other Systems</h2>

      <!--
      <AblativeArmor />
      <Armor />
      <Computer />
      <CrewQuarters />
      <Defenses />
      <DriftEngines />
      <ExpansionBays />
      <FortifiedHull />
      <ReinforcedBulkhead />
      <Security />
      <Sensors />
      <Shields />
      <WeaponMounts />
      <OtherSystems />
      <CustomComponents />
      <Crew />
      <Output />
      <JSON />
      <Footer />
      -->
    </div>
    <!-- main -->
  </div>
  <!-- #app wrapper -->
</template>

<script setup>
  import Ship from './components/Ship.vue'
  import Graphics from './components/Graphics.vue'
  import Nav from './components/Nav.vue'
  import Summary from './components/Summary.vue'
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

  const app = createApp(ShipApp)

  app.component('Ship', Ship).component('Graphics', Graphics).component('Nav', Nav)
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
</script>
