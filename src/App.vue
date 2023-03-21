<script src="./app.js"></script>
<template>
  <!--
	| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	|	APP
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
        :isBpCostOverBudget="isBpCostOverBudget"
        :totalBpCost="totalBpCost"
        :tier="tier"
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
      <Sources />
      <Input />
      <Concept />
      <Tier />
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
