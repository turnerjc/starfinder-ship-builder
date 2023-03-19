<template>
  <!--
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			|	OTHER SYSTEMS
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			-->

  <div
    id="other"
    class="box"
    v-if="params.sources.pw || params.sources.som">
    <header class="box__header">
      <h3 id="other">Other Systems</h3>
    </header>

    <!-- algal shielding -->
    <div v-if="params.sources.som">
      <div class="box__select">
        <div class="checkbox">
          <label for="hasAlgalShielding">
            <input
              type="checkbox"
              v-model="params.hasAlgalShielding"
              id="hasAlgalShielding" />
            Algal Shielding (see <i>Starship Operations Manual</i>, p 27)
          </label>
        </div>
      </div>
      <div class="box__cost--list">
        <svg class="icon"><use xlink:href="#icon-build" /></svg>
        {{ params.hasAlgalShielding ? 5 + 2 * sizeCategory.multiplier : 0 }}
      </div>
    </div>

    <!-- algal shielding -->
    <div v-if="params.sources.som">
      <div class="box__select">
        <div class="checkbox">
          <label for="hasAutoDestruct">
            <input
              type="checkbox"
              v-model="params.hasAutoDestruct"
              id="hasAutoDestruct" />
            Autodestruct System (see <i>Starship Operations Manual</i>, p 27)
          </label>
        </div>
      </div>
      <div class="box__cost--list">
        <svg class="icon"><use xlink:href="#icon-build" /></svg>
        {{ params.hasAutoDestruct ? sizeCategory.multiplier : 0 }}
      </div>
    </div>

    <!-- colony ship framework -->
    <div v-if="params.sources.som && this.sizeCategory.multiplier >= 4">
      <!-- Large or higher -->
      <div class="box__select">
        <div class="checkbox">
          <label for="hasColonyShipFramework">
            <input
              type="checkbox"
              v-model="params.hasColonyShipFramework"
              id="hasColonyShipFramework" />
            Colony Ship Framework (see <i>Starship Operations Manual</i>, p 27)
          </label>
        </div>
      </div>
      <div class="box__cost--list">
        <svg class="icon"><use xlink:href="#icon-build" /></svg>
        {{ params.hasColonyShipFramework ? Math.floor(frame.bpCost * 0.25) : 0 }}
      </div>
    </div>

    <!-- consciousness uplink drive -->
    <div v-if="params.sources.som">
      <div class="box__select">
        <div class="checkbox">
          <label for="hasConsciousnessUplink">
            <input
              type="checkbox"
              v-model="params.hasConsciousnessUplink"
              id="hasConsciousnessUplink" />
            Consciousness Uplink Drive (see <i>Starship Operations Manual</i>, p 28)
          </label>
        </div>
      </div>
      <div class="box__cost--list">
        <svg class="icon"><use xlink:href="#icon-build" /></svg>
        {{ params.hasConsciousnessUplink ? 4 : 0 }}
      </div>
    </div>

    <!-- data net -->
    <div v-if="params.sources.pw">
      <div class="box__select">
        <div class="checkbox">
          <label for="hasDataNet">
            <input
              type="checkbox"
              v-model="params.hasDataNet"
              id="hasDataNet" />
            Data Net (see <i>Pact Worlds</i>, p152)
          </label>
        </div>
      </div>
      <div class="box__cost--list">
        <svg class="icon"><use xlink:href="#icon-build" /></svg> {{ dataNetBpCost }}
        <svg class="icon"><use xlink:href="#icon-build" /></svg> {{ dataNetPcuCost }}
      </div>
    </div>

    <!-- hive joining -->
    <div v-if="params.sources.pw">
      <div class="box__select">
        <div class="checkbox">
          <label for="hasHiveJoining">
            <input
              type="checkbox"
              v-model="params.hasHiveJoining"
              id="hasHiveJoining" />
            Hive Joining (see <em>Pact Worlds</em>, p152)
          </label>
        </div>
      </div>
      <div class="box__cost--list">
        <svg class="icon"><use xlink:href="#icon-build" /></svg> {{ hiveJoiningBpCost }}
      </div>
    </div>

    <!-- powersap -->
    <div v-if="params.sources.som">
      <div class="box__select">
        <div class="checkbox">
          <label for="hasPowersap">
            <input
              type="checkbox"
              v-model="params.hasPowersap"
              id="hasPowersap" />
            Powersap (see <i>Starship Operations Manual</i>, p 29)
          </label>
        </div>
      </div>
      <div class="box__cost--list">
        <svg class="icon"><use xlink:href="#icon-build" /></svg>
        {{ params.hasPowersap ? sizeCategory.multiplier * 3 : 0 }}
      </div>
    </div>

    <!-- robotic appendage -->
    <div v-if="params.sources.som">
      <div class="box__select">
        <div class="form-group">
          <label for="roboticAppendageSelect">Robotic Appendage</label>
          <select
            name="roboticAppendage"
            id="roboticAppendageSelect"
            class="form-control"
            v-model="params.roboticAppendageId">
            <option
              v-for="option in selectOptions.roboticAppendage"
              :value="option.id">
              {{ option.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="box__cost--list">
        <svg class="icon"><use xlink:href="#icon-build" /></svg> {{ roboticAppendage.bpCost }}
      </div>
    </div>

    <!-- root system -->
    <div v-if="params.sources.som">
      <div class="box__select">
        <div class="checkbox">
          <label for="hasRootSystem">
            <input
              type="checkbox"
              v-model="params.hasRootSystem"
              id="hasRootSystem" />
            Root System (see <i>Starship Operations Manual</i>, p 29)
          </label>
        </div>
      </div>
      <div class="box__cost--list">
        <svg class="icon"><use xlink:href="#icon-power" /></svg> {{ params.hasRootSystem ? 5 : 0 }}
        <svg class="icon"><use xlink:href="#icon-build" /></svg>
        {{ params.hasRootSystem ? sizeCategory.multiplier * 2 : 0 }}
      </div>
    </div>

    <!-- space station framework -->
    <div v-if="params.sources.som && sizeCategory.multiplier >= 4">
      <div class="box__select">
        <div class="checkbox">
          <label for="hasSpaceStationFramework">
            <input
              type="checkbox"
              v-model="params.hasSpaceStationFramework"
              id="hasSpaceStationFramework" />
            Space Station Framework (see <i>Starship Operations Manual</i>, p 29)
          </label>
        </div>
      </div>
      <div class="box__cost--list">
        <svg class="icon"><use xlink:href="#icon-build" /></svg>
        {{ params.hasSpaceStationFramework ? Math.floor(frame.bpCost * 0.2) : 0 }}
      </div>
    </div>

    <!-- training interface modules -->
    <div v-if="params.sources.som">
      <p>Training Interface Modules</p>
      <div class="box--flex">
        <!-- tim -->
        <div class="form-group col-lg-1-2">
          <label for="ctTim">Number of TIMs</label>
          <input
            name="ctTim"
            id="ctTim"
            class="form-control"
            type="number"
            min="0"
            v-model="params.ctTim"
            @change="maybeAdjustCtTim('ctTim')" />
        </div>
        <!-- tim__all -->
        <div class="form-group col-lg-1-2">
          <label for="ctTimAll">of which have Associated Crew Member &ldquo;All&rdquo;</label>
          <input
            name="ctTimAll"
            id="ctTimAll"
            class="form-control"
            type="number"
            min="0"
            v-model="params.ctTimAll"
            @change="maybeAdjustCtTim('ctTimAll')" />
        </div>
      </div>
      <div class="box__cost--list">
        <svg class="icon"><use xlink:href="#icon-build" /></svg> {{ timBpCost }}
      </div>
    </div>

    <!-- virtual intelligence -->
    <div v-if="params.sources.som">
      <div class="box__select">
        <div class="form-group">
          <label for="viSelect">Virtual Intelligence</label>
          <select
            name="vi"
            id="viSelect"
            class="form-control"
            v-model="params.viId">
            <option
              v-for="option in selectOptions.vi"
              :value="option.id">
              {{ option.id == 'none' ? 'None' : 'Tier ' + option.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="box__cost--list">
        <svg class="icon"><use xlink:href="#icon-build" /></svg> {{ vi.bpCost }}
      </div>
    </div>

    <!-- VI upgrade: holographic projector -->
    <div v-if="params.sources.som && params.viId != 'none'">
      <div class="box__select">
        <div class="form-group">
          <label for="viHoloProjectorSelect">VI Upgrade: Holographic Projector</label>
          <select
            name="viHoloProjector"
            id="viHoloProjectorSelect"
            class="form-control"
            v-model="params.viHoloProjectorId">
            <option
              v-for="option in selectOptions.viHoloProjector"
              :value="option.id">
              {{ option.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="box__info"><strong>Maximum Size</strong> {{ viHoloProjectorSize }}</div>
      <div class="box__cost--list">
        <svg class="icon"><use xlink:href="#icon-build" /></svg> {{ viHoloProjector.bpCost }}
      </div>
    </div>

    <!-- VI upgrade: skill expander -->
    <div v-if="params.sources.som && params.viId != 'none'">
      <div class="box__select">
        <div class="form-group">
          <label for="viSkillExpanderSelect">VI Upgrade: Skill Expander</label>
          <select
            name="viSkillExpander"
            id="viSkillExpanderSelect"
            class="form-control"
            v-model="params.viSkillExpanderId">
            <option
              v-for="option in selectOptions.viSkillExpander"
              :value="option.id">
              {{ option.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="box__cost--list">
        <svg class="icon"><use xlink:href="#icon-build" /></svg> {{ viSkillExpander.bpCost }}
      </div>
    </div>
  </div>
</template>

<script>
  import Ship from './Ship.vue'
</script>
