<script setup></script>

<template>
  <!--
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			|	COMPUTER
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			-->

  <div class="box">
    <header class="box__header">
      <h3 id="computer">Computer</h3>
    </header>
    <div class="box__select">
      <div class="form-group">
        <label for="computerSelect">Computer</label>
        <select
          name="computer"
          id="computerSelect"
          class="form-control"
          v-model="params.computerId">
          <option v-for="option in selectOptionsComputer" :value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>

      <!-- secondary computer (Supercolossal ships only) -->
      <div class="form-group" v-if="isSupercolossal">
        <label for="secondaryComputerSelect">Secondary Computer</label>
        <select
          name="secondaryComputer"
          id="secondaryComputerSelect"
          class="form-control"
          v-model="params.secondaryComputerId">
          <option v-for="option in selectOptionsSecondaryComputer" :value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>

      <!-- network node (Supercolossal ships only) -->
      <div class="form-group" v-if="isSupercolossal">
        <label for="ctNetworkNodes">Network Nodes</label>
        <input
          type="number"
          id="ctNetworkNodes"
          v-model="params.ctNetworkNodes"
          class="form-control" />
      </div>

      <!-- dedicated computer -->
      <div class="form-group" v-if="params.sourceBooksInUse.som && hasDedicatedComputerHousing">
        <label for="dedicatedComputerSelect">Dedicated Computer</label>
        <select
          name="dedicatedComputer"
          id="dedicatedComputerSelect"
          class="form-control"
          v-model="params.dedicatedComputerId">
          <option v-for="option in selectOptionsDedicatedComputer" :value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="box__info">
      <strong>Skill Bonus</strong> {{ computerSkillBonusDesc }};
      <span v-if="params.sourceBooksInUse.som && hasDedicatedComputerHousing">
        <strong>Dedicated Computer Skill Bonus</strong>
        {{ getPrefixedModifier(dedicatedComputer.bonus) }};
      </span>
      <strong>Nodes</strong> {{ ctComputerNodes }}; <strong>Tier</strong> {{ computerTier }}
    </div>

    <div class="box__cost">
      <svg class="icon">
        <use xlink:href="#icon-power" />
      </svg>
      {{
        computer.pcuCost +
        dedicatedComputer.pcuCost +
        (isSupercolossal ? secondaryComputer.pcuCost : 0) +
        networkNodes.pcuCost
      }}
      <svg class="icon">
        <use xlink:href="#icon-build" />
      </svg>
      {{
        computer.bpCost +
        dedicatedComputer.bpCost +
        (isSupercolossal ? secondaryComputer.bpCost : 0) +
        networkNodes.bpCost
      }}
    </div>
  </div>
</template>
