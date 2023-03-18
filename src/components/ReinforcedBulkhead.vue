<template>
  <!--
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			|	REINFORCED BULKHEAD
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			-->

  <div
    class="box"
    v-if="params.sources.som == true">
    <header class="box__header">
      <h3 id="reinforced-bulkhead">Reinforced Bulkhead</h3>
    </header>
    <div class="box__select">
      <div class="form-group">
        <label for="reinforcedBulkheadSelect">Reinforced Bulkhead</label>
        <select
          id="reinforcedBulkheadSelect"
          class="form-control"
          v-model="params.reinforcedBulkheadId">
          <option
            v-for="option in selectOptions.reinforcedBulkhead"
            :value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="box__info">
      <strong>Fortification</strong> {{ reinforcedBulkhead.fortification }}
    </div>
    <div class="box__cost">
      <svg class="icon">
        <use xlink:href="#icon-build" />
      </svg>
      {{ reinforcedBulkhead.bpCost }}
    </div>
  </div>
</template>

<script>
  import ShipApp from './ShipApp.vue'
</script>
