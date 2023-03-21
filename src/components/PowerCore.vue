<template>
  <!--
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			|	POWER CORE
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			-->

  <div class="box">
    <header class="box__header">
      <h2 id="powerCore">Step 3: Power Core</h2>
    </header>

    <div v-if="frame.size == 'Supercolossal'">
      <p class="text-warning">NOTE: Supercolossal ships can have either:</p>
      <ul>
        <li class="text-warning">
          One Supercolossal power core, and up to four Huge or Gargantuan cores, or
        </li>
        <li class="text-warning">Up to five Colossal power cores</li>
      </ul>
    </div>

    <div class="box__select">
      <div class="form-group" v-for="i in countPowerCoreHousings">
        <!-- power core -->
        <div class="form-group">
          <label :for="'powerCoreSelect_' + i">Power Core {{ i }}</label>
          <select
            :id="'powerCoreSelect_' + i"
            class="form-control"
            v-model="params.powerCoreIds[i - 1]"
            @change="maybeResetPowerCoreIds(i - 1)">
            <template v-for="option in getPowerCoreOptions(i - 1)">
              <option :value="option.id" v-html="getPowerCoreOptionName(option)"></option>
            </template>
          </select>
        </div>

        <!-- special materials -->
        <div class="form" v-if="params.sources.som">
          <div class="form-group">
            Special Material:
            <!-- none -->
            <div class="radio">
              <label>
                <input
                  type="radio"
                  :name="'selectPowerCoreSpecialMaterial' + i"
                  value="none"
                  v-model="params.powerCoreSpecialMaterials[i - 1]" />
                None
              </label>
            </div>
            <!-- abysium -->
            <div class="radio">
              <label>
                <input
                  type="radio"
                  :name="'selectPowerCoreSpecialMaterial' + i"
                  value="abysium"
                  v-model="params.powerCoreSpecialMaterials[i - 1]" />
                Abysium (+25% PCU output; radiation hazard; +2 BP)
              </label>
            </div>
            <!-- djezet -->
            <div class="radio">
              <label>
                <input
                  type="radio"
                  :name="'selectPowerCoreSpecialMaterial' + i"
                  value="djezet"
                  v-model="params.powerCoreSpecialMaterials[i - 1]" />
                Djezet (+10% PCU output to expansion bays only; +1 BP)
              </label>
            </div>
          </div>
        </div>
        <!-- special materials -->
      </div>
      <!-- v-for -->
    </div>
    <div class="box__info"><strong>PCU Budget</strong> {{ pcuBudget }}</div>
    <div class="box__cost">
      <svg class="icon">
        <use xlink:href="#icon-build" />
      </svg>
      {{ powerCoresBpCost }}
    </div>
  </div>
</template>

<script></script>
