<script setup>
  import { defineProps } from 'vue';

  const props = defineProps(['params', 'frame']);
  console.log(props);
</script>

<template>
  <!-- Sidebar Navigation -->
  <nav class="contents">
    <ul class="contents__0">
      <li><a href="#sources">Sources</a></li>
      <li><a href="#input">Input</a></li>
      <li><a href="#concept">Concept</a></li>
      <li><a href="#tier">Tier</a></li>
      <li><a href="#frame">Frame</a></li>
      <li><a href="#powerCore">Power Core</a></li>
      <li><a href="#thrusters">Thrusters</a></li>
      <li><a href="#otherSystems">Other Systems</a></li>
      <ul class="contents__1">
        <li v-if="params.sourceBooksInUse.som"><a href="#ablativeArmor">Ablative Armor</a></li>
        <li><a href="#armor">Armor</a></li>
        <li><a href="#computer">Computer</a></li>
        <li><a href="#crewQuarters">Crew Quarters</a></li>
        <li><a href="#defensiveCountermeasures">Defensive Countermeasures</a></li>
        <li><a href="#driftEngine">Drift Engine</a></li>
        <li v-if="frame.expansionBays !== 0"><a href="#expansionBays">Expansion Bays</a></li>
        <li v-if="params.sourceBooksInUse.som"><a href="#fortified-hull">Fortified Hull</a></li>
        <li v-if="params.sourceBooksInUse.som">
          <a href="#reinforced-bulkhead">Reinforced Bulkhead</a>
        </li>
        <li><a href="#security">Security</a></li>
        <li><a href="#sensors">Sensors</a></li>
        <li><a href="#shields">Shields</a></li>
        <li><a href="#weapons">Weapons</a></li>
        <li v-if="params.sourceBooksInUse.pw || params.sourceBooksInUse.som">
          <a href="#other">Other Systems</a>
        </li>
      </ul>
      <li><a href="#custom-components">Custom Components</a></li>
      <li><a href="#crew">Crew</a></li>
      <li><a href="#output">Output</a></li>
    </ul>
  </nav>
</template>
