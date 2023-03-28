<template>
  <!--
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |  FORTIFIED HULL
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      -->

  <div class="box" v-if="params.sourcesInUse.som == true">
    <header class="box__header">
      <h3 id="fortified-hull">Fortified Hull</h3>
    </header>
    <div class="box__select">
      <div class="form-group">
        <label for="fortifiedHullSelect">Fortified Hull</label>
        <select v-model="params.fortifiedHullId" id="fortifiedHullSelect" class="form-control">
          <option v-for="option in selectOptions.fortifiedHull" :value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="box__info"><strong>Bonus To CT</strong> {{ fortifiedHull.bonusToCt }}</div>
    <div class="box__cost">
      <svg class="icon">
        <use xlink:href="#icon-build" />
      </svg>
      {{ fortifiedHull.bpCost }}
    </div>
  </div>
</template>

<script></script>
