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
                  <label>
                    <input
                      type="radio"
                      name="selectSampleShipSortOrder"
                      value="name"
                      v-model="selectSampleShipSortOrder" />
                    Name
                  </label>
                </div>
                <div class="radio">
                  <label>
                    <input
                      type="radio"
                      name="selectSampleShipSortOrder"
                      value="size"
                      v-model="selectSampleShipSortOrder" />
                    Size
                  </label>
                </div>
                <div class="radio">
                  <label>
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
              <option v-for="option in selectOptions.sampleShip" :value="option.id">
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
      -->

      <h2 id="otherSystems">Step 5: Other Systems</h2>

      <!--
      <AblativeArmor />
      <Armor />
      <Computer />
      <CrewQuarters />
      <Defenses />
      <DriftEngines />
      <ExpansionBays />
      <FortifiedHull />
      <ReinforcedBulkhead />
      <Security />
      <Sensors />
      <Shields />
      <WeaponMounts />
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
