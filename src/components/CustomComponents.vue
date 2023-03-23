<script setup></script>

<template>
  <!--
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |  CUSTOM COMPONENTS
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      -->

  <div class="box">
    <header class="box__header">
      <h2 id="custom-components">Step 5a: Custom Components</h2>
    </header>

    <template v-for="(customComponent, index) in params.customComponents">
      <!-- delete button -->
      <div class="box__header--btns">
        <h4>{{ customComponent.name ? customComponent.name : 'New Custom Component' }}</h4>
        <div>
          <button class="btn btn-danger btn-sm" @click="removeCustomComponent(index)">
            <svg class="icon"><use xlink:href="#icon-trash" /></svg>
          </button>
        </div>
      </div>

      <!-- component name -->
      <div class="form-group">
        <label :for="'customComponentName' + index">Component Name</label>
        <input
          type="text"
          :id="'customComponentName' + index"
          v-model="customComponent.name"
          class="form-control" />
      </div>

      <!-- notes -->
      <div class="form-group">
        <label for="'customComponentNotes' + index">Notes</label>
        <textarea
          id="'customComponentNotes' + index"
          cols="30"
          rows="2"
          v-model="customComponent.notes"
          class="form-control"></textarea>
      </div>

      <!-- is essential -->
      <div class="checkbox">
        <label>
          <input
            type="checkbox"
            :id="'isEssential' + index"
            v-model="customComponent.isEssential" />
          Is this an essential system?
        </label>
      </div>

      <div class="box--flex">
        <!-- PCU -->
        <div class="form-group col-sm-1-1 col-lg-1-2">
          <label for="'customComponentPcuCost' + index">PCU Cost</label>
          <input
            type="number"
            :id="'customComponentPcuCost' + index"
            class="form-control"
            v-model="customComponent.pcuCost" />
        </div>

        <!-- BP -->
        <div class="form-group col-sm-1-1 col-lg-1-2">
          <label for="'customComponentBpCost' + index">BP Cost</label>
          <input
            type="number"
            :id="'customComponentBpCost' + index"
            class="form-control"
            v-model="customComponent.bpCost" />
        </div>
      </div>
    </template>

    <!-- Totals -->

    <div class="box__cost">
      <svg class="icon"><use xlink:href="#icon-power" /></svg>
      {{
        parseInt(customComponentPcuTotal.essential) + parseInt(customComponentPcuTotal.nonEssential)
      }}
      <svg class="icon"><use xlink:href="#icon-build" /></svg>
      {{ parseInt(customComponentBpTotal) }}
    </div>
  </div>

  <div class="box__under-box align-right">
    <button @click="createCustomComponent()" class="btn btn-primary">
      Create New Custom Component
    </button>
  </div>
</template>
