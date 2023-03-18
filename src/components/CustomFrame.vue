<template>
  <!--
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			|	CUSTOM FRAME
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			-->

  <div
    class="box"
    v-if="this.params.frameId == 'custom'">
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
                <option
                  v-for="option in selectOptionsBaseFrame"
                  :value="option.id">
                  {{ option.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="col-sm-1-3">
            <div class="form-group">
              <button
                class="btn btn-primary"
                @click="resetCustomFrame">
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
            <option
              v-for="option in selectOptions.sizeCategory"
              :value="option.id">
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
              <button
                @click="addCustomFrameMount(position)"
                class="btn btn-primary btn-sm">
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
</template>

<script>
  import ShipApp from './ShipApp.vue'
</script>
