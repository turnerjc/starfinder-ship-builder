<template>
  <!--
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |  DEFENSIVE COUNTERMEASURES
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      -->

  <div class="box">
    <header class="box__header">
      <h3 id="defensiveCountermeasures">Defensive Countermeasures</h3>
    </header>
    <div class="box__select">
      <div class="form-group">
        <label for="defensiveCountermeasuresSelect">Defensive Countermeasures</label>
        <select
          v-model="params.defensiveCountermeasuresId"
          id="defensiveCountermeasuresSelect"
          class="form-control">
          <option v-for="option in selectOptions.defensiveCountermeasures" :value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>

      <!-- special materials -->
      <div class="form" v-if="params.sourceBooksInUse.som">
        <div class="form-group">
          Special Material:
          <!-- none -->
          <div class="radio">
            <label>
              <input
                type="radio"
                name="defensiveCountermeasuresMaterialId"
                value="none"
                v-model="params.defensiveCountermeasuresMaterialId" />
              None
            </label>
          </div>
          <!-- horacalcum -->
          <div class="radio">
            <label>
              <input
                type="radio"
                name="defensiveCountermeasuresMaterialId"
                value="horacalcum"
                v-model="params.defensiveCountermeasuresMaterialId" />
              Horacalcum (decrease enemy weapon speed by 25%)
            </label>
          </div>
          <!-- siccatite -->
          <div class="radio">
            <label>
              <input
                type="radio"
                name="defensiveCountermeasuresMaterialId"
                value="siccatite"
                v-model="params.defensiveCountermeasuresMaterialId" />
              Siccatite (increase science officer Computers DC against enemy sensors)
            </label>
          </div>
        </div>
      </div>
      <!-- special materials -->
    </div>
    <div class="box__info">
      <strong>Bonus To TL</strong>
      {{ getPrefixedModifier(defensiveCountermeasures.defCMBonusToTl) }}
    </div>
    <div class="box__cost">
      <svg class="icon">
        <use xlink:href="#icon-power" />
      </svg>
      {{ defensiveCountermeasures.pcuCost }}
      <svg class="icon">
        <use xlink:href="#icon-build" />
      </svg>
      {{ defensiveCountermeasuresBpCost }}
    </div>
  </div>
</template>

<script></script>
