<template>
  <!--
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			|	SHIELDS
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			-->

  <div class="box">
    <header class="box__header">
      <h3 id="shields">Shields</h3>
    </header>

    <!-- select shield type -->
    <div
      class="form"
      v-if="params.sources.som">
      Shield Type:
      <div class="radio">
        <label>
          <input
            type="radio"
            name="shieldType"
            value="shields"
            v-model="params.shieldType" />
          Shields (Core Rulebook)
        </label>
      </div>
      <div class="radio">
        <label>
          <input
            type="radio"
            name="shieldType"
            value="deflector-shield"
            v-model="params.shieldType" />
          Deflector Shields (Starship Operations Manual)
        </label>
      </div>
    </div>

    <!-- Core Rulebook Shields -->
    <div v-if="!params.sources.som || params.shieldType == 'shields'">
      <div class="box__select">
        <div class="form-group">
          <label for="shieldsSelect">Shields</label>
          <select
            v-model="params.shieldsId"
            id="shieldsSelect"
            class="form-control"
            @change="setDefaultPositionDependentValues('shields', 'totalSp')">
            <option
              v-for="option in selectOptions.shields"
              :value="option.id">
              {{ option.name }}
            </option>
          </select>
        </div>

        <h4>Shields by position:</h4>
        <div class="box--flex">
          <div class="form-group col-sm-1-2 col-lg-1-4">
            <label for="">Forward</label>
            <input
              type="number"
              class="form-control"
              v-model="params.shieldsByPosition.forward" />
          </div>
          <div class="form-group col-sm-1-2 col-lg-1-4">
            <label for="">Port</label>
            <input
              type="number"
              class="form-control"
              v-model="params.shieldsByPosition.port" />
          </div>
          <div class="form-group col-sm-1-2 col-lg-1-4">
            <label for="">Starboard</label>
            <input
              type="number"
              class="form-control"
              v-model="params.shieldsByPosition.starboard" />
          </div>
          <div class="form-group col-sm-1-2 col-lg-1-4">
            <label for="">Aft</label>
            <input
              type="number"
              class="form-control"
              v-model="params.shieldsByPosition.aft" />
          </div>
        </div>

        <p
          v-if="shieldsByPositionTotal != shields.totalSp"
          class="text-warning">
          Make sure your shields add up to {{ shields.totalSp }}!
        </p>
      </div>
      <div class="box__info">
        <strong>Total SP</strong> {{ shields.totalSp }}; <strong>Regen.</strong> {{ shields.regen }}
      </div>
      <div class="box__cost">
        <svg class="icon">
          <use xlink:href="#icon-power" />
        </svg>
        {{ shields.pcuCost }}
        <svg class="icon">
          <use xlink:href="#icon-build" />
        </svg>
        {{ shields.bpCost }}
      </div>
    </div>

    <!-- SOM Deflector Shields -->
    <div v-else>
      <div class="box__select">
        <div class="form-group">
          <label for="shieldsSelect">Deflector Shields</label>
          <select
            v-model="params.deflectorShieldId"
            id="deflectorShieldSelect"
            class="form-control">
            <option
              v-for="option in selectOptions.deflectorShield"
              :value="option.id">
              {{ option.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="box__info">
        <strong>Defense Value</strong> {{ deflectorShield.defenseValue }}/&ndash;;
        <strong>Bonus to AC</strong> +{{ deflectorShield.bonusToAc }};
        <strong>Bonus to TL</strong> +{{ deflectorShield.bonusToTl }}
      </div>
      <div class="box__cost">
        <svg class="icon">
          <use xlink:href="#icon-power" />
        </svg>
        {{ deflectorShield.pcuCost }}
        <svg class="icon">
          <use xlink:href="#icon-build" />
        </svg>
        {{ deflectorShield.bpCost }}
      </div>
    </div>
  </div>
</template>

<script>
  import Ship from './Ship.vue'
</script>
