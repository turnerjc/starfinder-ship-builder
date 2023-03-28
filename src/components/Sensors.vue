<template>
  <!--
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |  SENSORS
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      -->

  <div class="box">
    <header class="box__header">
      <h3 id="sensors">Sensors</h3>
    </header>
    <div class="box__select">
      <div class="form-group">
        <label for="sensorsSelect">Sensors</label>
        <select v-model="params.sensorsId" id="sensorsSelect" class="form-control">
          <option v-for="option in selectOptions.sensors" :value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>

      <!-- special materials -->
      <div class="form" v-if="params.sourcesInUse.som">
        <div class="form-group">
          Special Material:
          <!-- none -->
          <div class="radio">
            <label>
              <input
                type="radio"
                name="sensorsMaterialId"
                value="none"
                v-model="params.sensorsMaterialId" />
              None
            </label>
          </div>
          <!-- adamantine-alloy -->
          <div class="radio">
            <label>
              <input
                type="radio"
                name="sensorsMaterialId"
                value="djezet"
                v-model="params.sensorsMaterialId" />
              Djezet (increase sensor range)
            </label>
          </div>
          <!-- noqual -->
          <div class="radio">
            <label>
              <input
                type="radio"
                name="sensorsMaterialId"
                value="noqual"
                v-model="params.sensorsMaterialId" />
              Noqual (chance to cause enemy glitch on scan crew action)
            </label>
          </div>
        </div>
      </div>
      <!-- special materials -->
    </div>
    <div class="box__info">
      <strong>Range</strong> {{ sensors.range }}; <strong>Modifier</strong>
      {{ getPrefixedModifier(sensors.modifier) }}
    </div>
    <div class="box__cost">
      <svg class="icon">
        <use xlink:href="#icon-build" />
      </svg>
      {{ sensorsBpCost }}
    </div>
  </div>
</template>

<script></script>
