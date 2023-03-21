<script setup></script>

<template>
  <!--
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			|	ARMOR
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			-->

  <div class="box">
    <header class="box__header">
      <h3 id="armor">Armor</h3>
    </header>
    <div class="box__select">
      <div class="form-group">
        <label for="armorSelect">Armor</label>
        <select id="armorSelect" class="form-control" v-model="params.armorId">
          <option v-for="option in selectOptions.armor" :value="option.id">
            {{ option.name }}
          </option>
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
                name="armorMaterialId"
                value="none"
                v-model="params.armorMaterialId" />
              None
            </label>
          </div>
          <!-- adamantine-alloy -->
          <div class="radio">
            <label>
              <input
                type="radio"
                name="armorMaterialId"
                value="adamantine-alloy"
                v-model="params.armorMaterialId" />
              Adamantine Alloy (bonus to DT)
            </label>
          </div>
          <!-- noqual -->
          <div class="radio">
            <label>
              <input
                type="radio"
                name="armorMaterialId"
                value="noqual"
                v-model="params.armorMaterialId" />
              Noqual (bonus to magic officer&apos;s Mysticism DC and to AC and TL against mystical
              weapons)
            </label>
          </div>
          <!-- siccatite -->
          <div class="radio">
            <label>
              <input
                type="radio"
                name="armorMaterialId"
                value="siccatite"
                v-model="params.armorMaterialId" />
              Siccatite (resist friction from atmosphere)
            </label>
          </div>
        </div>
      </div>
      <!-- special materials -->
    </div>

    <div class="box__info">
      <strong>Bonus to AC</strong> {{ getPrefixedModifier(armor.bonusToAc) }};
      <strong>Special</strong> {{ armorSpecial }}
    </div>
    <div class="box__cost">
      <svg class="icon">
        <use xlink:href="#icon-build" />
      </svg>
      {{ armorBpCost }}
    </div>
  </div>
</template>
