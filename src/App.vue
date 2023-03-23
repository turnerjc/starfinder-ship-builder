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
      <CustomFrame />
      <PowerCore />
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
