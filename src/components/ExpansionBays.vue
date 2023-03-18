<template>
  <!--
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			|	EXPANSION BAYS
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			-->

  <div
    class="box"
    v-if="frame.expansionBays !== 0">
    <header class="box__header">
      <h3 id="expansionBays">Expansion Bays</h3>
    </header>
    <p
      v-if="frame.expansionBayInfo"
      class="text-warning">
      NOTE: {{ frame.expansionBayInfo }}.
    </p>
    <p
      v-if="sizeCategory.id == 'Supercolossal'"
      class="text-warning">
      NOTE: As a Supercolossal ship, this vessel has {{ Math.floor(frame.bpCost / 10) }} cargo bays
      in addition to those below.
    </p>
    <p
      v-if="
        params.sources.som &&
        sizeCategory.multiplier >= 4 &&
        (params.hasColonyShipFramework || params.hasSpaceStationFramework)
      "
      class="text-warning">
      NOTE: On a colony ship or space station, two thirds of expansion bays must be for civilian use
      (cargo holds, escape pods, guest quarters, life boats, recreation suites, or others determined
      by the GM).
    </p>
    <div class="cost__item">
      <span class="cost__name">Slots used</span>
      <span class="cost__values">
        <span
          class="cost__current"
          v-bind:class="{ 'cost__current--danger': isExpansionBaysCountOverBudget }"
          >{{ expansionBaysCountUsed }}</span
        >
        /
        <span class="cost__budget">{{ ctExpansionBaySlots }}</span>
      </span>
    </div>
    <ul class="box__select">
      <template v-for="(expansionBay, i) in expansionBays">
        <li>
          <div class="box__header--btns">
            <h4>
              <label :for="'expansionBaySelect' + i">Expansion Bay {{ i + 1 }}</label>
            </h4>
            <div>
              <!-- duplicate -->
              <button
                class="btn btn-primary btn-sm"
                :disabled="
                  params.isUseStrictRules &&
                  frame.expansionBays != 'Unlimited' &&
                  expansionBaysCountUsed >= ctExpansionBaySlots
                "
                @click="params.expansionBayIds.splice(i + 1, 0, params.expansionBayIds[i])">
                <svg class="icon">
                  <use xlink:href="#icon-duplicate" />
                </svg>
              </button>

              <!-- delete -->
              <button
                class="btn btn-danger btn-sm"
                @click="params.expansionBayIds.splice(i, 1)">
                <svg class="icon">
                  <use xlink:href="#icon-trash" />
                </svg>
              </button>
            </div>
          </div>

          <!-- select -->
          <div class="form-group">
            <select
              v-model="params.expansionBayIds[i]"
              :id="'expansionBaySelect' + i"
              class="form-control">
              <option
                v-for="option in selectOptions.expansionBay"
                :value="option.id">
                {{ option.name + (option.numBays != 1 ? ' (' + option.numBays + ' Slots)' : '') }}
              </option>
            </select>
          </div>

          <p
            v-if="frame.size == 'Supercolossal' && expansionBay.id == 'hangar-bay'"
            class="text-warning">
            NOTE: Expanding an existing hangar bay to accommodate eight more Medium ships increases
            the hangar bay’s cost by only 1 BP. Use Custom Components to expand your hangar bay.
          </p>

          <div class="box__cost--list">
            <svg class="icon">
              <use xlink:href="#icon-power" />
            </svg>
            {{ getExpansionBayPcuCost(expansionBay) }}
            <svg class="icon">
              <use xlink:href="#icon-build" />
            </svg>
            {{ getExpansionBayBpCost(expansionBay) }}
          </div>
        </li>
      </template>
    </ul>

    <p
      v-if="ctExternalExpansionBays > frame.expansionBays"
      class="text-danger">
      You cannot have more external expansion bays than expansion bay slots on the frame.
    </p>

    <p
      v-if="hasHealingPod"
      class="text-warning">
      NOTE: Healing pods can only be installed on biomechanical ships.
    </p>

    <div class="box__under-box align-right">
      <button
        @click="params.expansionBayIds.push('none')"
        class="btn btn-primary">
        Create New Expansion Bay
      </button>
    </div>

    <div class="box__cost">
      <svg class="icon">
        <use xlink:href="#icon-power" />
      </svg>
      {{ expansionBaysTotalPcuCost }}
      <svg class="icon">
        <use xlink:href="#icon-build" />
      </svg>
      {{ expansionBaysTotalBpCost }}
    </div>
  </div>
</template>

<script>
  import ShipApp from './ShipApp.vue'
</script>
