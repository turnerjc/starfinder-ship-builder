<script src="./app.js"></script>
<template>
  <!--
  | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  | APP
  | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  -->
  <div id="app" class="wrapper">
    <Graphics></Graphics>

    <!--
    | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    | SIDEBAR
    | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    -->

    <div class="sidebar" id="sidebar">
      <a href="#" class="sidebar__control sidebar__close">
        <svg class="icon">
          <use xlink:href="#icon-close" />
        </svg>
      </a>
      <h3>{{ shipName }} (Tier&nbsp;{{ tier.name }})</h3>
      <Nav :params="params" :frame="frame"></Nav>
      <Summary
        :totalBpCost="totalBpCost"
        :bpBudget="tier.bpBudget"
        :totalPcuCost="totalPcuCost"
        :total="pcuBudget"></Summary>
    </div>
    <!-- sidebar -->

    <!--
    | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    | MAIN
    | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    -->

    <div class="main">
      <header class="app-header">
        <h1>Starfinder RPG Ship Builder</h1>

        <div class="app-header__logo">
          <img src="img/starfinder-logo-xs.png" width="150" height="auto" alt="Starfinder Logo" />
        </div>
      </header>

      <RecentUpdates />
      <!--
      <Patreon />
      -->
      <Sources :sourceBooks="sourceBooks" :params="params"></Sources>
      <!--
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      | INPUT
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      <Input />
      -->
      <div class="box">
        <header class="box__header">
          <h2 id="input">Input</h2>
        </header>

        <div class="box__select">
          <div class="form-group">
            <label for="sampleShipSelect">Select a sample ship</label>

            <!-- sort by -->
            <div class="form-inline" style="margin: 0.5rem 0">
              <div class="form-group">
                Sort by:
                <div class="radio">
                  <label style="display: inline-block; margin-right: 1rem">
                    <input
                      type="radio"
                      name="selectSampleShipSortOrder"
                      value="name"
                      v-model="selectSampleShipSortOrder" />
                    Name
                  </label>
                </div>
                <div class="radio">
                  <label style="display: inline-block; margin-right: 1rem">
                    <input
                      type="radio"
                      name="selectSampleShipSortOrder"
                      value="size"
                      v-model="selectSampleShipSortOrder" />
                    Size
                  </label>
                </div>
                <div class="radio">
                  <label style="display: inline-block; margin-right: 1rem">
                    <input
                      type="radio"
                      name="selectSampleShipSortOrder"
                      value="tier"
                      v-model="selectSampleShipSortOrder" />
                    Tier
                  </label>
                </div>
              </div>
            </div>

            <select class="form-control" id="sampleShipSelect" v-on:change="inputSampleShipParams">
              <option value="none">None</option>
              <option v-for="option in selectOptionsSampleShip" :value="option.id">
                {{ getSampleShipOptionName(option) }}
              </option>
            </select>
          </div>
        </div>

        <div class="box__select">
          <div class="form-group">
            <label for="">Paste in JSON from a previous design</label>
            <textarea
              class="form-control"
              v-model="json"
              v-on:change="convertJsonInput"
              id="jsonData"
              cols="30"
              rows="5"></textarea>
          </div>
          <div class="form-group">
            <p>Or start building your ship from scratch</p>
            <button class="btn btn-lg btn-primary" v-on:click="clearAll">Clear All</button>
          </div>
        </div>
      </div>
      <!--
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      | CONCEPT
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      <Concept />
      -->

      <div class="box">
        <header class="box__header">
          <h2 id="concept">Step 0: Concept</h2>
        </header>
        <div class="box__select">
          <div class="form-group">
            <label for="shipName">Ship Name or Class</label>
            <input
              type="text"
              id="shipName"
              v-model="params.shipName"
              class="form-control input-lg" />
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
      <!--
      <Tier />
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |  TIER
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      -->
      <div class="box">
        <header class="box__header">
          <h2 id="tier">Step 1: Tier</h2>
        </header>
        <div class="box__select">
          <div class="form-group">
            <label for="tierSelect">Tier</label>
            <select
              class="form-control"
              id="tierSelect"
              v-model="params.tierId"
              v-on:change="setDefaultCrewSkillValues">
              <option v-for="option in selectOptions.tier" :value="option.id">
                {{ option.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="box__info">
          <strong>Build Point Budget</strong>: {{ tier.bpBudget }}; <strong>HP Increase</strong>:
          {{ tier.hpIncrease }}
        </div>
      </div>
      <!--
      <ShipFrame />
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |  FRAME
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      -->

      <div class="box">
        <header class="box__header">
          <h2 id="frame">Step 2: Frame</h2>
        </header>
        <div class="box__select">
          <div class="form-group">
            <label for="frameSelect">Frame</label>
            <select
              name="frame"
              id="frameSelect"
              class="form-control"
              v-model="params.frameId"
              @change="updateFrame">
              <option v-for="option in selectOptions.frame" :value="option.id">
                {{ option.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="box__info">
          <strong>Size</strong> {{ frame.size }}; <strong>Maneuverability</strong>
          {{ frame.maneuverability }}; <strong>HP</strong> {{ hp }}; <strong>DT</strong>
          {{ frame.dt }}; <strong>CT</strong> {{ criticalThreshold }};
          <strong>Expansion Bays</strong> {{ frame.expansionBays }}; <strong>Minimum Crew</strong>
          {{ frame.minCrew }}; <strong>Maximum Crew</strong> {{ frame.maxCrew }}
        </div>
        <div class="box__cost">
          <svg class="icon">
            <use xlink:href="#icon-build" />
          </svg>
          {{ frame.bpCost }}
        </div>
      </div>
      <!--
      <CustomFrame />
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |  CUSTOM FRAME
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      -->

      <div class="box" v-if="this.params.frameId == 'custom'">
        <header class="box__header">
          <h2 id="frame">Custom Frame</h2>
        </header>

        <div class="box--flex box--flex--bottom">
          <!-- Base frame -->
          <div class="col-sm-1-1">
            <div class="box__select box--flex box--flex--bottom">
              <div class="col-sm-2-3">
                <div class="form-group">
                  <label for="customFrameBase">Use this frame as a base:</label>
                  <select
                    name="customFrameBase"
                    id="customFrameBase"
                    class="form-control"
                    v-model="params.customFrameBaseId">
                    <option v-for="option in selectOptionsBaseFrame" :value="option.id">
                      {{ option.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="col-sm-1-3">
                <div class="form-group">
                  <button class="btn btn-primary" @click="resetCustomFrame">
                    Apply to Custom Frame
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Name -->
          <div class="box__select col-sm-1-2 col-lg-1-2">
            <div class="form-group">
              <label for="customFrameName">Name</label>
              <input
                name="customFrameName"
                id="customFrameName"
                class="form-control"
                v-model="params.customFrame.name" />
            </div>
          </div>

          <!-- Size -->
          <div class="box__select col-sm-1-2 col-lg-1-4">
            <div class="form-group">
              <label for="customFrameSize">Size</label>
              <select
                name="customFrameSize"
                id="customFrameSize"
                class="form-control"
                v-model="params.customFrame.size">
                <option v-for="option in selectOptions.sizeCategory" :value="option.id">
                  {{ option.id }}
                </option>
              </select>
            </div>
          </div>

          <!-- Maneuverability -->
          <div class="box__select col-sm-1-2 col-lg-1-4">
            <div class="form-group">
              <label for="frameName">Maneuverability</label>
              <select
                name="customFrameManeuverability"
                id="customFrameManeuverability"
                class="form-control"
                v-model="params.customFrame.maneuverability">
                <option value="perfect">Perfect</option>
                <option value="good">Good</option>
                <option value="average">Average</option>
                <option value="poor">Poor</option>
                <option value="clumsy">Clumsy</option>
              </select>
            </div>
          </div>

          <!-- HP -->
          <div class="box__select col-sm-1-2 col-lg-1-4 col-align-bottom">
            <div class="form-group">
              <label for="customFrameHp">HP</label>
              <input
                name="customFrameHp"
                type="number"
                id="customFrameHp"
                class="form-control"
                v-model="params.customFrame.hp"
                @input="params.customFrame.ct = Math.floor(parseInt(params.customFrame.hp) / 5)" />
            </div>
          </div>

          <!-- HP Increment -->
          <div class="box__select col-sm-1-2 col-lg-1-4 col-align-bottom">
            <div class="form-group">
              <label for="customFrameHpIncrement">HP Increment</label>
              <input
                name="customFrameHpIncrement"
                type="number"
                id="customFrameHpIncrement"
                class="form-control"
                v-model="params.customFrame.hpIncrement" />
            </div>
          </div>

          <!-- Damage Threshold -->
          <div class="box__select col-sm-1-2 col-lg-1-4 col-align-bottom">
            <div class="form-group">
              <label for="customFrameDt"
                >Damage Threshold<br /><small>(&ldquo;n/a&rdquo; or number)</small></label
              >
              <input
                name="customFrameDt"
                id="customFrameDt"
                class="form-control"
                v-model="params.customFrame.dt" />
            </div>
          </div>

          <!-- Crit. Threshold -->
          <div class="box__select col-sm-1-2 col-lg-1-4 col-align-bottom">
            <div class="form-group">
              <label for="customFrameCt">Crit. Threshold</label>
              <input
                name="customFrameCt"
                type="number"
                id="customFrameCt"
                class="form-control"
                v-model="params.customFrame.ct" />
            </div>
          </div>

          <!-- Weapon Mounts -->
          <div class="box__select col-sm-1-1">
            <p>Weapon Mounts</p>

            <div class="box--flex">
              <div
                v-for="position in ['forward', 'port', 'starboard', 'aft', 'turret']"
                class="col-sm-1-3 col-lg-1-5">
                <div class="custom-weapon-mount-position">
                  <span>{{ position.toTitleCase() }}</span>
                  <button @click="addCustomFrameMount(position)" class="btn btn-primary btn-sm">
                    <svg class="icon">
                      <use xlink:href="#icon-plus" />
                    </svg>
                  </button>
                </div>

                <div
                  v-for="(mount, mountIndex) in params.customFrame.mounts[position]"
                  class="form-group form-group--custom-frame-mount">
                  <select
                    :id="'customFrame' + position + 'Mount' + mountIndex"
                    class="form-control"
                    v-model="params.customFrame.mounts[position][mountIndex]"
                    @change="setWeaponMounts(frame.mounts)">
                    <option value="light">Light</option>
                    <option
                      v-if="['heavy', 'capital'].indexOf(customFrameSize.maxMountWeight) != -1"
                      value="heavy">
                      Heavy
                    </option>
                    <option
                      v-if="position != 'turret' && customFrameSize.maxMountWeight == 'capital'"
                      value="capital">
                      Capital
                    </option>
                  </select>
                  <button
                    class="btn btn-danger btn-sm"
                    @click="removeCustomFrameMount(position, mountIndex)">
                    <svg class="icon">
                      <use xlink:href="#icon-trash" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Expansion Bays -->
          <div class="box__select col-sm-1-2 col-lg-1-4">
            <div class="form-group">
              <label for="customFrameExpansionBays">Expansion Bays</label>
              <input
                name="customFrameExpansionBays"
                type="number"
                id="customFrameExpansionBays"
                class="form-control"
                v-model="params.customFrame.expansionBays" />
            </div>
          </div>

          <!-- Min. Crew -->
          <div class="box__select col-sm-1-2 col-lg-1-4">
            <div class="form-group">
              <label for="customFrameMinCrew">Min. Crew</label>
              <input
                name="customFrameMinCrew"
                type="number"
                id="customFrameMinCrew"
                class="form-control"
                v-model="params.customFrame.minCrew" />
            </div>
          </div>

          <!-- Max. Crew -->
          <div class="box__select col-sm-1-2 col-lg-1-4">
            <div class="form-group">
              <label for="customFrameMaxCrew">Max. Crew</label>
              <input
                name="customFrameMaxCrew"
                type="number"
                id="customFrameMaxCrew"
                class="form-control"
                v-model="params.customFrame.maxCrew" />
            </div>
          </div>

          <!-- BP Cost -->
          <div class="box__select col-sm-1-2 col-lg-1-4">
            <div class="form-group">
              <label for="customFrameBpCost">BP Cost</label>
              <input
                name="customFrameBpCost"
                type="number"
                id="customFrameBpCost"
                class="form-control"
                v-model="params.customFrame.bpCost" />
            </div>
          </div>
        </div>

        <div class="box__cost">
          <svg class="icon">
            <use xlink:href="#icon-build" />
          </svg>
          {{ frame.bpCost }}
        </div>
      </div>
      <!--
      <PowerCore />
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |  POWER CORE
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
            <div class="form" v-if="params.sourceBooksInUse.som">
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
      <!--
      <Thrusters />
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |  THRUSTERS
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      -->

      <div class="box">
        <header class="box__header">
          <h2 id="thrusters">Step 4: Thrusters</h2>
        </header>
        <div class="box__select">
          <div class="form-group">
            <label for="thrustersSelect">Thrusters</label>
            <select id="thrustersSelect" class="form-control" v-model="params.thrustersId">
              <template v-for="option in selectOptionsThruster">
                <option :value="option.id">{{ option.name }}</option>
              </template>
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
                    name="thrustersMaterialId"
                    value="none"
                    v-model="params.thrustersMaterialId" />
                  None
                </label>
              </div>
              <!-- horacalcum -->
              <div class="radio">
                <label>
                  <input
                    type="radio"
                    name="thrustersMaterialId"
                    value="horacalcum"
                    v-model="params.thrustersMaterialId" />
                  Horacalcum (+1 max speed; -1 Piloting check penalty based on max speed)
                </label>
              </div>
              <!-- inubrix -->
              <div class="radio">
                <label>
                  <input
                    type="radio"
                    name="thrustersMaterialId"
                    value="inubrix"
                    v-model="params.thrustersMaterialId" />
                  Inubrix (+1 to Piloting checks to avoid hazards)
                </label>
              </div>
            </div>
          </div>
          <!-- special materials -->
        </div>

        <!-- booster thrusters-->
        <div class="box__select" v-if="params.sourceBooksInUse.som && hasBoosterThrusterHousing">
          <div class="form-group">
            <label for="thrustersBoosterSelect">Thrusters Booster</label>
            <select
              id="thrustersBoosterSelect"
              class="form-control"
              v-model="params.thrustersBoosterId">
              <template v-for="option in selectOptionsThruster">
                <option :value="option.id">{{ option.name }}</option>
              </template>
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
                    name="thrustersBoosterMaterialId"
                    value="none"
                    v-model="params.thrustersBoosterMaterialId" />
                  None
                </label>
              </div>
              <!-- horacalcum -->
              <div class="radio">
                <label>
                  <input
                    type="radio"
                    name="thrustersBoosterMaterialId"
                    value="horacalcum"
                    v-model="params.thrustersBoosterMaterialId" />
                  Horacalcum (+1 max speed; -1 Piloting check penalty based on max speed)
                </label>
              </div>
              <!-- inubrix -->
              <div class="radio">
                <label>
                  <input
                    type="radio"
                    name="thrustersBoosterMaterialId"
                    value="inubrix"
                    v-model="params.thrustersBoosterMaterialId" />
                  Inubrix (+1 to Piloting checks to avoid hazards)
                </label>
              </div>
            </div>
          </div>
          <!-- special materials -->
        </div>
        <!-- thrusters booster -->

        <div class="box__info">
          <strong>Speed (in hexes)</strong> {{ thrusters.speed + thrustersBooster.speed }};
          <strong>Piloting Modifier</strong>
          {{ getPrefixedModifier(thrusters.pilotingModifier + thrustersBooster.pilotingModifier) }}
        </div>
        <div class="box__cost">
          <svg class="icon">
            <use xlink:href="#icon-power" />
          </svg>
          {{ thrusters.pcuCost + thrustersBooster.pcuCost }}
          <svg class="icon">
            <use xlink:href="#icon-build" />
          </svg>
          {{ thrusters.bpCost + thrustersBooster.bpCost }}
        </div>
      </div>

      <h2 id="otherSystems">Step 5: Other Systems</h2>

      <!--
      <Armor />
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |  ARMOR
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
          <div class="form" v-if="params.sourceBooksInUse.som">
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
                  Noqual (bonus to magic officer&apos;s Mysticism DC and to AC and TL against
                  mystical weapons)
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
      <!--
      <AblativeArmor />
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |  ABLATIVE ARMOR
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      -->
      <div class="box" v-if="params.sourceBooksInUse.som == true">
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
              <option v-for="option in selectOptionsAblativeArmor" :value="option.id">
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

          <p v-if="ablativeArmorByPositionTotal != ablativeArmor.tempHp" class="text-danger">
            Make sure your ablative armor adds up to {{ ablativeArmor.tempHp }}.
          </p>

          <p v-if="!isAblativeArmorBalanced" class="text-warning">
            NOTE: The ship has a -1 penalty to Piloting because temporary HP from ablative armor is
            not balanced.
          </p>

          <p v-if="ablativeArmor.tempHp > hp" class="text-warning">
            NOTE: The ship has a -1 penalty to Piloting because temporary HP exceeds the ship&apos;s
            HP.
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
      <!--
      <FortifiedHull />
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |  FORTIFIED HULL
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      -->

      <div class="box" v-if="params.sourceBooksInUse.som == true">
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
      <!--
      <ReinforcedBulkhead />
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |  REINFORCED BULKHEAD
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      -->

      <div class="box" v-if="params.sourceBooksInUse.som == true">
        <header class="box__header">
          <h3 id="reinforced-bulkhead">Reinforced Bulkhead</h3>
        </header>
        <div class="box__select">
          <div class="form-group">
            <label for="reinforcedBulkheadSelect">Reinforced Bulkhead</label>
            <select
              id="reinforcedBulkheadSelect"
              class="form-control"
              v-model="params.reinforcedBulkheadId">
              <option v-for="option in selectOptions.reinforcedBulkhead" :value="option.id">
                {{ option.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="box__info">
          <strong>Fortification</strong> {{ reinforcedBulkhead.fortification }}
        </div>
        <div class="box__cost">
          <svg class="icon">
            <use xlink:href="#icon-build" />
          </svg>
          {{ reinforcedBulkhead.bpCost }}
        </div>
      </div>
      <!--
      <Computer />
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |  COMPUTER
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
      <!--
      <CrewQuarters />
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |  CREW QUARTERS
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      -->

      <div class="box">
        <header class="box__header">
          <h3 id="crewQuarters">Crew Quarters</h3>
        </header>
        <div class="box__select">
          <div class="form-group">
            <label for="crewQuartersSelect">Crew Quarters</label>
            <select id="crewQuartersSelect" class="form-control" v-model="params.crewQuartersId">
              <option v-for="option in selectOptionsCrewQuarters" :value="option.id">
                {{ option.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="box__cost">
          <svg class="icon">
            <use xlink:href="#icon-build" />
          </svg>
          {{ crewQuarters.bpCost }}
        </div>
      </div>
      <!--
      <Defenses />
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
      <!--
      <DriftEngines />
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |  DRIFT ENGINE
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      -->

      <div class="box">
        <header class="box__header">
          <h3 id="driftEngine">Drift Engine</h3>
        </header>
        <div class="box__select">
          <div class="form-group">
            <label for="driftEngineSelect">Drift Engine</label>
            <select id="driftEngineSelect" class="form-control" v-model="params.driftEngineId">
              <option v-for="option in selectOptionsDriftEngine" :value="option.id">
                {{ option.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="box__info" v-if="driftEngine.notes !== undefined">
          <em>Note: </em>{{ driftEngine.notes }}
        </div>
        <div class="box__info"><strong>Engine Rating</strong> {{ driftEngine.engineRating }}</div>
        <div class="box__cost">
          <svg class="icon">
            <use xlink:href="#icon-build" />
          </svg>
          {{ driftEngineBpCost }}
        </div>
      </div>
      <!--
      <ExpansionBays />
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |  EXPANSION BAYS
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      -->

      <div class="box" v-if="frame.expansionBays !== 0">
        <header class="box__header">
          <h3 id="expansionBays">Expansion Bays</h3>
        </header>
        <p v-if="frame.expansionBayInfo" class="text-warning">
          NOTE: {{ frame.expansionBayInfo }}.
        </p>
        <p v-if="sizeCategory.id == 'Supercolossal'" class="text-warning">
          NOTE: As a Supercolossal ship, this vessel has {{ Math.floor(frame.bpCost / 10) }} cargo
          bays in addition to those below.
        </p>
        <p
          v-if="
            params.sourceBooksInUse.som &&
            sizeCategory.multiplier >= 4 &&
            (params.hasColonyShipFramework || params.hasSpaceStationFramework)
          "
          class="text-warning">
          NOTE: On a colony ship or space station, two thirds of expansion bays must be for civilian
          use (cargo holds, escape pods, guest quarters, life boats, recreation suites, or others
          determined by the GM).
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
                  <option v-for="option in selectOptions.expansionBay" :value="option.id">
                    {{
                      option.name + (option.numBays != 1 ? ' (' + option.numBays + ' Slots)' : '')
                    }}
                  </option>
                </select>
              </div>

              <p
                v-if="frame.size == 'Supercolossal' && expansionBay.id == 'hangar-bay'"
                class="text-warning">
                NOTE: Expanding an existing hangar bay to accommodate eight more Medium ships
                increases the hangar bay’s cost by only 1 BP. Use Custom Components to expand your
                hangar bay.
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

        <p v-if="ctExternalExpansionBays > frame.expansionBays" class="text-danger">
          You cannot have more external expansion bays than expansion bay slots on the frame.
        </p>

        <p v-if="hasHealingPod" class="text-warning">
          NOTE: Healing pods can only be installed on biomechanical ships.
        </p>

        <div class="box__under-box align-right">
          <button @click="params.expansionBayIds.push('none')" class="btn btn-primary">
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
      <!--
      <Security />
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |  SECURITY
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
      <!--
      <Sensors />
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |  SENSORS
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      -->

      <div class="box">
        <header class="box__header">
          <h3 id="sensors">Sensors</h3>
        </header>
        <div class="box__select">
          <div class="form-group">
            <label for="sensorsSelect">Sensors</label>
            <select v-model="params.sensorsId" id="sensorsSelect" class="form-control">
              <option v-for="option in selectOptions.sensors" :value="option.id">
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
                    name="sensorsMaterialId"
                    value="none"
                    v-model="params.sensorsMaterialId" />
                  None
                </label>
              </div>
              <!-- adamantine-alloy -->
              <div class="radio">
                <label>
                  <input
                    type="radio"
                    name="sensorsMaterialId"
                    value="djezet"
                    v-model="params.sensorsMaterialId" />
                  Djezet (increase sensor range)
                </label>
              </div>
              <!-- noqual -->
              <div class="radio">
                <label>
                  <input
                    type="radio"
                    name="sensorsMaterialId"
                    value="noqual"
                    v-model="params.sensorsMaterialId" />
                  Noqual (chance to cause enemy glitch on scan crew action)
                </label>
              </div>
            </div>
          </div>
          <!-- special materials -->
        </div>
        <div class="box__info">
          <strong>Range</strong> {{ sensors.range }}; <strong>Modifier</strong>
          {{ getPrefixedModifier(sensors.modifier) }}
        </div>
        <div class="box__cost">
          <svg class="icon">
            <use xlink:href="#icon-build" />
          </svg>
          {{ sensorsBpCost }}
        </div>
      </div>
      <!--
      <Shields />
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |  SHIELDS
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      -->

      <div class="box">
        <header class="box__header">
          <h3 id="shields">Shields</h3>
        </header>

        <!-- select shield type -->
        <div class="form" v-if="params.sourceBooksInUse.som">
          Shield Type:
          <div class="radio">
            <label>
              <input type="radio" name="shieldType" value="shields" v-model="params.shieldType" />
              Shields (Core Rulebook)
            </label>
          </div>
          <div class="radio">
            <label>
              <input
                type="radio"
                name="shieldType"
                value="deflector-shield"
                v-model="params.shieldType" />
              Deflector Shields (Starship Operations Manual)
            </label>
          </div>
        </div>

        <!-- Core Rulebook Shields -->
        <div v-if="!params.sourceBooksInUse.som || params.shieldType == 'shields'">
          <div class="box__select">
            <div class="form-group">
              <label for="shieldsSelect">Shields</label>
              <select
                v-model="params.shieldsId"
                id="shieldsSelect"
                class="form-control"
                @change="setDefaultPositionDependentValues('shields', 'totalSp')">
                <option v-for="option in selectOptions.shields" :value="option.id">
                  {{ option.name }}
                </option>
              </select>
            </div>

            <h4>Shields by position:</h4>
            <div class="box--flex">
              <div class="form-group col-sm-1-2 col-lg-1-4">
                <label for="">Forward</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="params.shieldsByPosition.forward" />
              </div>
              <div class="form-group col-sm-1-2 col-lg-1-4">
                <label for="">Port</label>
                <input type="number" class="form-control" v-model="params.shieldsByPosition.port" />
              </div>
              <div class="form-group col-sm-1-2 col-lg-1-4">
                <label for="">Starboard</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="params.shieldsByPosition.starboard" />
              </div>
              <div class="form-group col-sm-1-2 col-lg-1-4">
                <label for="">Aft</label>
                <input type="number" class="form-control" v-model="params.shieldsByPosition.aft" />
              </div>
            </div>

            <p v-if="shieldsByPositionTotal != shields.totalSp" class="text-warning">
              Make sure your shields add up to {{ shields.totalSp }}!
            </p>
          </div>
          <div class="box__info">
            <strong>Total SP</strong> {{ shields.totalSp }}; <strong>Regen.</strong>
            {{ shields.regen }}
          </div>
          <div class="box__cost">
            <svg class="icon">
              <use xlink:href="#icon-power" />
            </svg>
            {{ shields.pcuCost }}
            <svg class="icon">
              <use xlink:href="#icon-build" />
            </svg>
            {{ shields.bpCost }}
          </div>
        </div>

        <!-- SOM Deflector Shields -->
        <div v-else>
          <div class="box__select">
            <div class="form-group">
              <label for="shieldsSelect">Deflector Shields</label>
              <select
                v-model="params.deflectorShieldId"
                id="deflectorShieldSelect"
                class="form-control">
                <option v-for="option in selectOptions.deflectorShield" :value="option.id">
                  {{ option.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="box__info">
            <strong>Defense Value</strong> {{ deflectorShield.defenseValue }}/&ndash;;
            <strong>Bonus to AC</strong> +{{ deflectorShield.bonusToAc }};
            <strong>Bonus to TL</strong> +{{ deflectorShield.bonusToTl }}
          </div>
          <div class="box__cost">
            <svg class="icon">
              <use xlink:href="#icon-power" />
            </svg>
            {{ deflectorShield.pcuCost }}
            <svg class="icon">
              <use xlink:href="#icon-build" />
            </svg>
            {{ deflectorShield.bpCost }}
          </div>
        </div>
      </div>
      <!--
      <WeaponMounts />
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |  WEAPON MOUNTS
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      -->

      <h3 id="weapons">Weapons</h3>

      <p v-if="frame.weaponInfo">FOR INFORMATION: {{ frame.weaponInfo }}.</p>

      <template v-for="(weaponList, position) in weaponMounts">
        <header class="box__header">
          <h4 id="weapons_test">
            {{ position.toTitleCase() + (position == 'turret' ? '' : ' Arc') }}
          </h4>
        </header>

        <template v-for="(weaponMount, i) in weaponList">
          <div class="box">
            <!-- Header, upgrade, downgrade, delete buttons -->
            <div class="box__header--btns">
              <h4>Weapon Mount {{ i + 1 }} ({{ weaponMount.weight }})</h4>
              <div>
                <button
                  class="btn btn-primary btn-sm"
                  :disabled="!weaponMount.canBeUpgraded"
                  @click="upgradeWeaponMount(position, i)">
                  <svg class="icon">
                    <use xlink:href="#icon-up" />
                  </svg>
                </button>
                <button
                  class="btn btn-primary btn-sm"
                  :disabled="!weaponMount.canBeDowngraded"
                  @click="downgradeWeaponMount(position, i)">
                  <svg class="icon">
                    <use xlink:href="#icon-down" />
                  </svg>
                </button>
                <button
                  class="btn btn-danger btn-sm"
                  :disabled="weaponMount.isFromTemplate"
                  @click="destroyWeaponMount(position, i)">
                  <svg class="icon">
                    <use xlink:href="#icon-trash" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Weapon select -->
            <div class="box__select">
              <div class="form-group">
                <label :for="'shipWeaponSelect_' + i">Weapon </label>
                <select
                  v-model="params.weaponMounts[position][i].weaponId"
                  :id="'shipWeaponSelect_' + i"
                  class="form-control"
                  @change="setWeaponLinking(position, i)">
                  <option value="none">None</option>
                  <optgroup v-for="weaponType in data.shipWeaponType.data" :label="weaponType">
                    <template v-for="option in selectOptionsShipWeapon(weaponType, weaponMount)">
                      <option :value="option.id">
                        {{ option.name }} ({{ option.damage }},
                        {{ getWeaponRangeNumerical(option) }}, PCU {{ option.pcuCost }}, BP
                        {{ option.bpCost }})
                      </option>
                    </template>
                  </optgroup>
                </select>
              </div>
              <!-- .form-group -->
            </div>
            <!-- .box__select -->

            <!-- Weapon info -->
            <div class="box__info">
              <strong>Range</strong> {{ weaponMount.weapon.range }}; <strong>Speed</strong>
              {{ weaponMount.weapon.speed }}; <strong>Damage</strong>
              {{ weaponMount.weapon.damage }};
              <strong>Special Properties</strong>
              {{
                getNamesFromIds(
                  'weaponSpecialProperty',
                  weaponMount.weapon.specialProperties,
                  'n/a'
                )
              }}
            </div>

            <!-- Special Materials -->
            <div class="form" v-if="params.sourceBooksInUse.som">
              <div class="form-group">
                Special Material:
                <!-- none -->
                <div class="radio">
                  <label>
                    <input
                      type="radio"
                      :name="'wpn-mount-special-material-' + position + '-' + i"
                      value="none"
                      v-model="params.weaponMounts[position][i].specialMaterial" />
                    None
                  </label>
                </div>
                <!-- abysium -->
                <div class="radio">
                  <label>
                    <input
                      type="radio"
                      :name="'wpn-mount-special-material-' + position + '-' + i"
                      value="abysium"
                      v-model="params.weaponMounts[position][i].specialMaterial" />
                    Abysium
                  </label>
                </div>
                <!-- adamantine alloy -->
                <div class="radio">
                  <label>
                    <input
                      type="radio"
                      :name="'wpn-mount-special-material-' + position + '-' + i"
                      value="adamantine-alloy"
                      v-model="params.weaponMounts[position][i].specialMaterial" />
                    Adamantine Alloy
                  </label>
                </div>
                <!-- inubrix -->
                <div class="radio">
                  <label>
                    <input
                      type="radio"
                      :name="'wpn-mount-special-material-' + position + '-' + i"
                      value="inubrix"
                      v-model="params.weaponMounts[position][i].specialMaterial" />
                    Inubrix
                  </label>
                </div>
              </div>
            </div>

            <!-- Is Linked -->
            <div class="box__select">
              <div class="checkbox">
                <label
                  :for="'isLinked_' + position + '_' + i"
                  v-if="params.weaponMounts[position][i].canBeLinked">
                  <input
                    type="checkbox"
                    v-model="params.weaponMounts[position][i].isLinked"
                    :id="'isLinked_' + position + '_' + i"
                    @change="setWeaponLinking(position)" />
                  Linked?
                </label>
              </div>
            </div>

            <!-- has orbital weapon discount (for colony ships and space stations)  -->
            <div
              class="box__select"
              v-if="
                params.sourceBooksInUse.som &&
                sizeCategory.multiplier >= 4 &&
                (params.hasColonyShipFramework || params.hasSpaceStationFramework) &&
                isOrbitalWeapon(weaponMount.weapon)
              ">
              <div class="checkbox">
                <label :for="'hasOrbitalDiscount_' + position + '_' + i">
                  <input
                    type="checkbox"
                    v-model="params.weaponMounts[position][i].hasOrbitalDiscount"
                    :disabled="
                      !params.weaponMounts[position][i].hasOrbitalDiscount &&
                      isOrbitalWeaponDiscountUsed
                    "
                    :id="'hasOrbitalDiscount_' + position + '_' + i" />
                  Has orbital weapon discount for colony ship or space station?
                </label>
              </div>
            </div>

            <!-- Weapon cost -->
            <div class="box__cost">
              <svg class="icon">
                <use xlink:href="#icon-power" />
              </svg>
              {{ weaponMount.weapon.pcuCost }}
              <svg class="icon">
                <use xlink:href="#icon-build" />
              </svg>
              {{
                weaponMount.bpCost +
                weaponMount.materialCost +
                weaponMount.mountBpCost +
                weaponMount.linkCost
              }}
              <span
                v-if="
                  weaponMount.materialCost > 0 ||
                  weaponMount.linkCost > 0 ||
                  weaponMount.mountBpCost > 0
                ">
                (weapon {{ weaponMount.bpCost }}
                <span v-if="weaponMount.materialCost > 0">
                  + material {{ weaponMount.materialCost }}
                </span>
                <span v-if="weaponMount.mountBpCost > 0">
                  + mount {{ weaponMount.mountBpCost }}
                </span>
                <span v-if="weaponMount.linkCost > 0"> + link {{ weaponMount.linkCost }} </span>)
              </span>
            </div>
          </div>
          <!-- .box -->
        </template>

        <div class="box__under-box align-right">
          <button
            @click="createWeaponMount(position)"
            :disabled="!canWeaponMountBeCreated(position)"
            class="btn btn-primary">
            Create New {{ position.toTitleCase() }} Mount
          </button>
        </div>
      </template>

      <div class="box">
        <header class="box__header">
          <h3 id="weapons">Weapons Summary</h3>
        </header>
        <div class="box__cost">
          <svg class="icon">
            <use xlink:href="#icon-power" />
          </svg>
          {{ weaponsTotalCosts.weaponsPcu }}
          <svg class="icon">
            <use xlink:href="#icon-build" />
          </svg>
          {{
            weaponsTotalCosts.weaponsBp +
            weaponsTotalCosts.weaponMaterialsBp +
            weaponsTotalCosts.weaponMountsBp +
            weaponsTotalCosts.weaponLinksBp
          }}
          (weapons {{ weaponsTotalCosts.weaponsBp }} + materials
          {{ weaponsTotalCosts.weaponMaterialsBp }} + mounts
          {{ weaponsTotalCosts.weaponMountsBp }} + links {{ weaponsTotalCosts.weaponLinksBp }})
        </div>
      </div>
      <!--
      <OtherSystems />
      <CustomComponents />
      <Crew />
      <Output />
      <JSON />
      <Footer />
      -->
    </div>
    <!-- main -->
  </div>
  <!-- #app wrapper -->
</template>
