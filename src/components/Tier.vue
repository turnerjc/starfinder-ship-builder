<template>
  <!--
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |  TIER
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      -->

  <div class="box">
    <header class="box__header">
      <h2 id="tier">Step 1: Tier</h2>
    </header>
    <div class="box__select">
      <div class="form-group">
        <label for="tierSelect">Tier</label>
        <select
          class="form-control"
          id="tierSelect"
          v-model="params.tierId"
          v-on:change="setDefaultCrewSkillValues">
          <option v-for="option in selectOptions.tier" :value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="box__info">
      <strong>Build Point Budget</strong>: {{ tier.bpBudget }}; <strong>HP Increase</strong>:
      {{ tier.hpIncrease }}
    </div>
  </div>
</template>

<script></script>
