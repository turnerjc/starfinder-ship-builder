<script setup>
  import { defineProps, computed } from 'vue';

  const props = defineProps(['totalBpCost', 'bpBudget', 'totalPcuCost', 'pcuBudget']);
  console.log(props);

  const isBpCostOverBudget = computed(() => {
    return props.totalBpCost > props.bpBudget;
  });

  const isPcuCostOverBudget = computed(() => {
    return props.totalPcuCost.essential > props.pcuBudget;
  });
</script>

<template>
  <!-- SUMMARY -->

  <div class="cost">
    <p class="cost__item">
      <span class="cost__name">Build Points</span>
      <span class="cost__values">
        <svg class="icon"><use xlink:href="#icon-build" /></svg>
        <span
          class="cost__current"
          v-bind:class="{ 'cost__current--danger': isBpCostOverBudget }"
          >{{ totalBpCost }}</span
        >
        /
        <span class="cost__budget">{{ bpBudget }}</span>
      </span>
    </p>
    <p class="cost__item">
      <span class="cost__name">Power Core Units</span>
      <span class="cost__values">
        <svg class="icon"><use xlink:href="#icon-power" /></svg>
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
      </span>
    </p>
  </div>
</template>
