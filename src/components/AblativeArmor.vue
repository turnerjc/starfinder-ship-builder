<template>
  <!--
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			|	ABLATIVE ARMOR
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			-->

  <div
    class="box"
    v-if="params.sources.som == true">
    <header class="box__header">
      <h3 id="ablativeArmor">Ablative Armor</h3>
    </header>
    <div class="box__select">
      <div class="form-group">
        <label for="ablativeArmorSelect">Ablative Armor</label>
        <select
          id="ablativeArmorSelect"
          class="form-control"
          @change="setDefaultPositionDependentValues('ablativeArmor', 'tempHp')"
          v-model="params.ablativeArmorId">
          <option
            v-for="option in selectOptionsAblativeArmor"
            :value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>

      <h4>Temporary HP by position:</h4>
      <div class="box--flex">
        <div class="form-group col-sm-1-2 col-lg-1-4">
          <label for="">Forward</label>
          <input
            type="number"
            class="form-control"
            v-model="params.ablativeArmorByPosition.forward" />
        </div>
        <div class="form-group col-sm-1-2 col-lg-1-4">
          <label for="">Port</label>
          <input
            type="number"
            class="form-control"
            v-model="params.ablativeArmorByPosition.port" />
        </div>
        <div class="form-group col-sm-1-2 col-lg-1-4">
          <label for="">Starboard</label>
          <input
            type="number"
            class="form-control"
            v-model="params.ablativeArmorByPosition.starboard" />
        </div>
        <div class="form-group col-sm-1-2 col-lg-1-4">
          <label for="">Aft</label>
          <input
            type="number"
            class="form-control"
            v-model="params.ablativeArmorByPosition.aft" />
        </div>
      </div>

      <p
        v-if="ablativeArmorByPositionTotal != ablativeArmor.tempHp"
        class="text-danger">
        Make sure your ablative armor adds up to {{ ablativeArmor.tempHp }}.
      </p>

      <p
        v-if="!isAblativeArmorBalanced"
        class="text-warning">
        NOTE: The ship has a -1 penalty to Piloting because temporary HP from ablative armor is not
        balanced.
      </p>

      <p
        v-if="ablativeArmor.tempHp > hp"
        class="text-warning">
        NOTE: The ship has a -1 penalty to Piloting because temporary HP exceeds the ship&apos;s HP.
      </p>
    </div>

    <div class="box__info">
      <strong>Temporary HP</strong> {{ ablativeArmor.tempHp }}; <strong>TL Modifier</strong>
      {{ ablativeArmor.tlMod }}; <strong>Turn Distance</strong> {{ ablativeArmor.turnMod }}
    </div>

    <div class="box__cost">
      <svg class="icon">
        <use xlink:href="#icon-build" />
      </svg>
      {{ ablativeArmor.bpCost }}
    </div>
  </div>
</template>

<script>
  import ShipApp from './ShipApp.vue'
</script>
