<template>
  <!--
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			|	FRAME
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			-->

  <div class="box">
    <header class="box__header">
      <h2 id="frame">Step 2: Frame</h2>
    </header>
    <div class="box__select">
      <div class="form-group">
        <label for="frameSelect">Frame</label>
        <select
          name="frame"
          id="frameSelect"
          class="form-control"
          v-model="params.frameId"
          @change="updateFrame">
          <option
            v-for="option in selectOptions.frame"
            :value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="box__info">
      <strong>Size</strong> {{ frame.size }}; <strong>Maneuverability</strong>
      {{ frame.maneuverability }}; <strong>HP</strong> {{ hp }}; <strong>DT</strong> {{ frame.dt }};
      <strong>CT</strong> {{ criticalThreshold }}; <strong>Expansion Bays</strong>
      {{ frame.expansionBays }}; <strong>Minimum Crew</strong> {{ frame.minCrew }};
      <strong>Maximum Crew</strong> {{ frame.maxCrew }}
    </div>
    <div class="box__cost">
      <svg class="icon">
        <use xlink:href="#icon-build" />
      </svg>
      {{ frame.bpCost }}
    </div>
  </div>
</template>

<script>
  import ShipApp from './ShipApp.vue'
</script>
