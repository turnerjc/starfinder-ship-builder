<script setup>
  const props = defineProps(['params', 'frame']);
  // console.log('Nav.vue', props);
</script>

<template>
  <!-- Sidebar Navigation -->
  <nav class="contents">
    <ul class="contents__0">
      <li><a href="#title">Intro</a></li>
      <li><a href="#readout">Ship Readout</a></li>
      <li><a href="#sources">Sources</a></li>
      <li><a href="#sampleships">Sample Ships</a></li>
      <li><a href="#loadsave">Load/Save</a></li>
      <li><a href="#concept">Concept</a></li>
      <li><a href="#tier">Tier</a></li>
      <li><a href="#frame">Frame</a></li>
      <li><a href="#crew">Crew</a></li>
      <li><a href="#crewQuarters">Crew Quarters</a></li>
      <li><a href="#powerCore">Power Core</a></li>
      <li><a href="#thrusters">Thrusters</a></li>
      <li><a href="#otherSystems">Other Systems</a></li>
      <ul class="contents__1">
        <li><a href="#armor">Armor</a></li>
        <ul class="contents__1">
          <li v-if="params.sourcesInUse.som"><a href="#ablativeArmor">Ablative Armor</a></li>
          <li v-if="params.sourcesInUse.som"><a href="#fortified-hull">Fortified Hull</a></li>
          <li v-if="params.sourcesInUse.som">
            <a href="#reinforced-bulkhead">Reinforced Bulkhead</a>
          </li>
        </ul>
        <li><a href="#computer">Computer</a></li>
        <li><a href="#defensiveCountermeasures">Defensive Countermeasures</a></li>
        <li><a href="#driftEngine">Hyperdrive</a></li>
        <li v-if="frame.expansionBays !== 0"><a href="#expansionBays">Expansion Bays</a></li>
        <li><a href="#security">Security</a></li>
        <li><a href="#sensors">Sensors</a></li>
        <li><a href="#shields">Shields</a></li>
        <li><a href="#weapons">Weapons</a></li>
        <li v-if="params.sourcesInUse.pw || params.sourcesInUse.som || params.sourcesInUse.dnd">
          <a href="#other">Systems and Upgrades</a>
        </li>
        <li><a href="#custom-components">Custom Components</a></li>
      </ul>
    </ul>
  </nav>
</template>
