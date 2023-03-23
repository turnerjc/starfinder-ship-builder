<script setup></script>

<template>
  <!--
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |  CONCEPT
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      -->

  <div class="box">
    <header class="box__header">
      <h2 id="concept">Step 0: Concept</h2>
    </header>
    <div class="box__select">
      <div class="form-group">
        <label for="shipName">Ship Name or Class</label>
        <input type="text" id="shipName" v-model="params.shipName" class="form-control input-lg" />
      </div>
      <div class="form-group">
        <label for="shipConcept">Concept</label>
        <textarea
          id="shipConcept"
          cols="30"
          rows="3"
          v-model="params.shipConcept"
          class="form-control"></textarea>
      </div>
      <div class="checkbox">
        <label>
          <input type="checkbox" id="isUseStrictRules" v-model="params.isUseStrictRules" />
          Use strict ship building rules from <em>Starfinder Core Rules</em>?
        </label>
      </div>
      <div class="checkbox">
        <label>
          <input
            type="checkbox"
            id="isSetDefaultCrewSkillValues"
            v-model="params.isSetDefaultCrewSkillValues" />
          Automatically update crew skill ranks when levelling up?
        </label>
      </div>
    </div>
  </div>
</template>
