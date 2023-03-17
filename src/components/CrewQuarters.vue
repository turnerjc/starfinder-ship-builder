<template>
  <!--
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			|	CREW QUARTERS
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			-->

  <div class="box">
    <header class="box__header">
      <h3 id="crewQuarters">Crew Quarters</h3>
    </header>
    <div class="box__select">
      <div class="form-group">
        <label for="crewQuartersSelect">Crew Quarters</label>
        <select
          id="crewQuartersSelect"
          class="form-control"
          v-model="params.crewQuartersId">
          <option
            v-for="option in selectOptionsCrewQuarters"
            :value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="box__cost">
      <svg class="icon">
        <use xlink:href="#icon-build" />
      </svg>
      {{ crewQuarters.bpCost }}
    </div>
  </div>
</template>

<script>
  import Ship from './Ship.vue'
</script>
