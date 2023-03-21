<template>
  <!--
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			|	SECURITY
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			-->

  <div class="box">
    <header class="box__header">
      <h3 id="security">Security</h3>
    </header>

    <!-- Anti-Hacking Systems -->
    <div class="box__list-item">
      <div class="box__select">
        <div class="form-group">
          <label for="antiHackingSystemsSelect">Anti-Hacking Systems</label>
          <select
            v-model="params.antiHackingSystemsId"
            id="antiHackingSystemsSelect"
            class="form-control">
            <template v-for="option in selectOptions.antiHackingSystems">
              <option :value="option.id">{{ option.name }}</option>
            </template>
          </select>
        </div>
      </div>
      <div class="box__cost--list">
        <svg class="icon">
          <use xlink:href="#icon-build" />
        </svg>
        {{ antiHackingSystems.bpCost }}
      </div>
    </div>

    <!-- Anti-Personnel Weapon -->
    <div class="box__list-item" v-if="!params.isUseStrictRules || sizeCategory.multiplier <= 3">
      <div class="box__select">
        <div class="form-group">
          <label for="antiPersonnelWeaponSelect">Anti-Personnel Weapon</label>
          <select
            v-model="params.antiPersonnelWeaponId"
            id="antiPersonnelWeaponSelect"
            class="form-control">
            <template v-for="option in selectOptionsPersonalWeapon">
              <option :value="option.id">{{ option.name }} ({{ option.damage }})</option>
            </template>
          </select>
        </div>
      </div>
      <div class="box__cost--list">
        <svg class="icon">
          <use xlink:href="#icon-build" />
        </svg>
        {{ antiPersonnelWeaponBpCost }}
      </div>
    </div>

    <!-- Biometric Locks -->
    <div class="box__list-item">
      <div class="box__select">
        <div class="checkbox">
          <label for="hasBiometricLocks">
            <input type="checkbox" v-model="params.hasBiometricLocks" id="hasBiometricLocks" />
            Biometric Locks
          </label>
        </div>
      </div>
      <div class="box__cost--list">
        <svg class="icon">
          <use xlink:href="#icon-build" />
        </svg>
        {{ biometricLocksBpCost }}
      </div>
    </div>

    <!-- Computer Countermeasures -->
    <div class="box__list-item">
      <p>Computer Countermeasures</p>

      <div class="box__select">
        <!-- true/false countermeasures -->
        <div class="box__select box__select--computerCountermeasures">
          <div class="checkbox" v-for="option in selectOptionsComputerCountermeasures">
            <label :for="'computerCountermeasures_' + option.id">
              <input
                type="checkbox"
                v-model="params.computerCountermeasures[option.id]"
                :id="'computerCountermeasures_' + option.id" />
              {{ option.name }}
            </label>
          </div>
        </div>

        <!-- shock grid -->
        <div class="form-group">
          <label for="shockGridSelect">Shock Grid</label>
          <select
            v-model="params.computerCountermeasures.shockGridId"
            id="shockGridSelect"
            class="form-control">
            <option v-for="option in selectOptions.shockGrid" :value="option.id">
              {{
                option.id == 'none'
                  ? 'None'
                  : option.name + ' (DC ' + option.dc + ', ' + option.damage + ')'
              }}
            </option>
          </select>
        </div>
      </div>

      <div class="box__cost--list">
        <svg class="icon">
          <use xlink:href="#icon-build" />
        </svg>
        {{ computerCountermeasuresBpCost }}
      </div>
    </div>

    <!-- Self-Destruct System -->
    <div class="box__list-item">
      <div class="box__select">
        <div class="checkbox">
          <label for="hasSelfDestructSystem">
            <input
              type="checkbox"
              v-model="params.hasSelfDestructSystem"
              id="hasSelfDestructSystem" />
            Self-Destruct System
          </label>
        </div>
      </div>
      <div class="box__cost--list">
        <svg class="icon">
          <use xlink:href="#icon-build" />
        </svg>
        {{ selfDestructSystemBpCost }}
      </div>
    </div>

    <!-- Emergency Accelerator -->
    <div class="box__list-item">
      <div class="box__select">
        <div class="checkbox">
          <label for="hasEmergencyAccelerator">
            <input
              type="checkbox"
              v-model="params.hasEmergencyAccelerator"
              id="hasEmergencyAccelerator" />
            Emergency Accelerator
          </label>
        </div>
      </div>
      <div class="box__cost--list">
        <svg class="icon">
          <use xlink:href="#icon-power" />
        </svg>
        {{ params.hasEmergencyAccelerator ? 5 : 0 }}
        <svg class="icon">
          <use xlink:href="#icon-build" />
        </svg>
        {{ params.hasEmergencyAccelerator ? 4 * sizeCategory.multiplier : 0 }}
      </div>
    </div>

    <!-- Holographic Mantle -->
    <div class="box__list-item">
      <div class="box__select">
        <div class="checkbox">
          <label for="hasHolographicMantle">
            <input
              type="checkbox"
              v-model="params.hasHolographicMantle"
              id="hasHolographicMantle" />
            Holographic Mantle
          </label>
        </div>
      </div>
      <div class="box__cost--list">
        <svg class="icon">
          <use xlink:href="#icon-power" />
        </svg>
        {{ params.hasHolographicMantle ? 10 : 0 }}
        <svg class="icon">
          <use xlink:href="#icon-build" />
        </svg>
        {{ params.hasHolographicMantle ? 12 : 0 }}
      </div>
    </div>

    <!-- Reconfiguration System -->
    <div class="box__list-item">
      <div class="box__select">
        <div class="checkbox">
          <label for="hasReconfigurationSystem">
            <input
              type="checkbox"
              v-model="params.hasReconfigurationSystem"
              id="hasReconfigurationSystem" />
            Reconfiguration System
          </label>
        </div>
      </div>
      <div class="box__cost--list">
        <svg class="icon">
          <use xlink:href="#icon-power" />
        </svg>
        {{ params.hasReconfigurationSystem ? 50 : 0 }}
        <svg class="icon">
          <use xlink:href="#icon-build" />
        </svg>
        {{ params.hasReconfigurationSystem ? 30 : 0 }}
      </div>
    </div>

    <!-- Total -->
    <div class="box__cost">
      <svg class="icon">
        <use xlink:href="#icon-power" />
      </svg>
      {{ securityTotalPcuCost }}
      <svg class="icon">
        <use xlink:href="#icon-build" />
      </svg>
      {{ securityTotalBpCost }}
    </div>
  </div>
  <!-- box -->
</template>

<script></script>
