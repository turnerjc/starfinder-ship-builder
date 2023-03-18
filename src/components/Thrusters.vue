<template>
  <!--
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			|	THRUSTERS
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			-->

  <div class="box">
    <header class="box__header">
      <h2 id="thrusters">Step 4: Thrusters</h2>
    </header>
    <div class="box__select">
      <div class="form-group">
        <label for="thrustersSelect">Thrusters</label>
        <select
          id="thrustersSelect"
          class="form-control"
          v-model="params.thrustersId">
          <template v-for="option in selectOptionsThruster">
            <option :value="option.id">{{ option.name }}</option>
          </template>
        </select>
      </div>

      <!-- special materials -->
      <div
        class="form"
        v-if="params.sources.som">
        <div class="form-group">
          Special Material:
          <!-- none -->
          <div class="radio">
            <label>
              <input
                type="radio"
                name="thrustersMaterialId"
                value="none"
                v-model="params.thrustersMaterialId" />
              None
            </label>
          </div>
          <!-- horacalcum -->
          <div class="radio">
            <label>
              <input
                type="radio"
                name="thrustersMaterialId"
                value="horacalcum"
                v-model="params.thrustersMaterialId" />
              Horacalcum (+1 max speed; -1 Piloting check penalty based on max speed)
            </label>
          </div>
          <!-- inubrix -->
          <div class="radio">
            <label>
              <input
                type="radio"
                name="thrustersMaterialId"
                value="inubrix"
                v-model="params.thrustersMaterialId" />
              Inubrix (+1 to Piloting checks to avoid hazards)
            </label>
          </div>
        </div>
      </div>
      <!-- special materials -->
    </div>

    <!-- booster thrusters-->
    <div
      class="box__select"
      v-if="params.sources.som && hasBoosterThrusterHousing">
      <div class="form-group">
        <label for="thrustersBoosterSelect">Thrusters Booster</label>
        <select
          id="thrustersBoosterSelect"
          class="form-control"
          v-model="params.thrustersBoosterId">
          <template v-for="option in selectOptionsThruster">
            <option :value="option.id">{{ option.name }}</option>
          </template>
        </select>
      </div>

      <!-- special materials -->
      <div
        class="form"
        v-if="params.sources.som">
        <div class="form-group">
          Special Material:
          <!-- none -->
          <div class="radio">
            <label>
              <input
                type="radio"
                name="thrustersBoosterMaterialId"
                value="none"
                v-model="params.thrustersBoosterMaterialId" />
              None
            </label>
          </div>
          <!-- horacalcum -->
          <div class="radio">
            <label>
              <input
                type="radio"
                name="thrustersBoosterMaterialId"
                value="horacalcum"
                v-model="params.thrustersBoosterMaterialId" />
              Horacalcum (+1 max speed; -1 Piloting check penalty based on max speed)
            </label>
          </div>
          <!-- inubrix -->
          <div class="radio">
            <label>
              <input
                type="radio"
                name="thrustersBoosterMaterialId"
                value="inubrix"
                v-model="params.thrustersBoosterMaterialId" />
              Inubrix (+1 to Piloting checks to avoid hazards)
            </label>
          </div>
        </div>
      </div>
      <!-- special materials -->
    </div>
    <!-- thrusters booster -->

    <div class="box__info">
      <strong>Speed (in hexes)</strong> {{ thrusters.speed + thrustersBooster.speed }};
      <strong>Piloting Modifier</strong>
      {{ getPrefixedModifier(thrusters.pilotingModifier + thrustersBooster.pilotingModifier) }}
    </div>
    <div class="box__cost">
      <svg class="icon">
        <use xlink:href="#icon-power" />
      </svg>
      {{ thrusters.pcuCost + thrustersBooster.pcuCost }}
      <svg class="icon">
        <use xlink:href="#icon-build" />
      </svg>
      {{ thrusters.bpCost + thrustersBooster.bpCost }}
    </div>
  </div>
</template>

<script>
  import ShipApp from './ShipApp.vue'
</script>
