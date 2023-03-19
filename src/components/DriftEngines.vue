<template>
  <!--
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			|	DRIFT ENGINE
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			-->

  <div class="box">
    <header class="box__header">
      <h3 id="driftEngine">Drift Engine</h3>
    </header>
    <div class="box__select">
      <div class="form-group">
        <label for="driftEngineSelect">Drift Engine</label>
        <select
          v-model="params.driftEngineId"
          id="driftEngineSelect"
          class="form-control">
          <template v-for="option in selectOptionsDriftEngine">
            <option :value="option.id">{{ option.name }}</option>
          </template>
        </select>
      </div>
    </div>
    <div
      class="box__info"
      v-if="driftEngine.notes !== undefined">
      <em>Note: </em>{{ driftEngine.notes }}
    </div>
    <div class="box__info"><strong>Engine Rating</strong> {{ driftEngine.engineRating }}</div>
    <div class="box__cost">
      <svg class="icon">
        <use xlink:href="#icon-build" />
      </svg>
      {{ driftEngineBpCost }}
    </div>
  </div>
</template>

<script>
  import Ship from './Ship.vue'
</script>
