<template>
  <!--
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			|	OUTPUT
			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			-->

  <div class="box">
    <header class="box__header">
      <h2 id="output">Output</h2>
    </header>
    <div class="box__info box__info--output">
      <div id="outputText">
        <h3>{{ shipName }} (Tier {{ tier.name }})</h3>
        <p>{{ frame.size }} {{ frameName }}</p>
        <p>
          <strong>Speed</strong> {{ thrusters.speed + thrustersBooster.speed
          }}<span v-if="params.sources.som && params.thrustersMaterialId != 'none'">
            ({{ params.thrustersMaterialId }} thrusters)</span
          >; <strong>Maneuverability</strong> {{ frame.maneuverability }} (turn {{ turn }})<span
            v-if="driftEngine.engineRating == 'Special' || driftEngine.engineRating > 0"
            >; <strong>Drift</strong> {{ driftEngine.engineRating }}</span
          >
        </p>
        <p><strong>AC</strong> {{ armorClass }}; <strong>TL</strong> {{ targetLock }}</p>
        <p>
          <strong>HP</strong> {{ hp }}; <strong>DT</strong> {{ damageThreshold }};
          <strong>CT</strong> {{ criticalThreshold }}
        </p>
        <p v-if="ablativeArmor.id != 'none'">
          <strong>Ablative Armor</strong> {{ ablativeArmor.name }} (forward
          {{ params.ablativeArmorByPosition.forward }}, port
          {{ params.ablativeArmorByPosition.port }}, starboard
          {{ params.ablativeArmorByPosition.starboard }}, aft
          {{ params.ablativeArmorByPosition.aft }})
        </p>
        <!-- shields -->
        <p v-if="params.shieldType == 'shields'">
          <strong>Shields</strong> {{ shields.name }} (forward
          {{ params.shieldsByPosition.forward }}, port {{ params.shieldsByPosition.port }},
          starboard {{ params.shieldsByPosition.starboard }}, aft
          {{ params.shieldsByPosition.aft }})
        </p>
        <!-- deflector shields -->
        <p v-else>
          <strong>Deflector Shield</strong> {{ deflectorShield.name }}; <strong>DV</strong>
          {{ deflectorShield.defenseValue }}/&ndash;
        </p>
        <!-- reinforced bulkheads -->
        <p v-if="params.sources.som && params.reinforcedBulkheadId != 'none'">
          <strong>Reinforced Bulkheads</strong> {{ reinforcedBulkhead.name }};
          <strong>Fortification</strong> {{ reinforcedBulkhead.fortification }}
        </p>
        <!-- weapons -->
        <p v-for="(weaponDescription, position) in weaponDescriptions">
          <strong>Attack ({{ position.toTitleCase() }})</strong>
          {{ weaponDescription }}
        </p>
        <p>
          <strong>Power Core(s)</strong> {{ powerCoreDescription }}; <strong>Drift Engine</strong>
          {{ driftEngine.name }}; <strong>Systems</strong> <span v-html="systemsDescription"></span
          ><span v-if="hasSecurity">; <strong>Security</strong> {{ securityDescription }}</span
          ><span v-if="expansionBaysDescription != 'None'"
            >; <strong>Expansion Bays</strong> {{ expansionBaysDescription }}</span
          ><span v-if="params.fortifiedHullId != 'none'"
            >; <strong>Fortified Hull</strong> {{ fortifiedHull.name }}</span
          >
        </p>
        <p>
          <strong>Modifiers</strong> {{ modifiersDescription
          }}<span v-if="params.hasCrew">; <strong>Complement</strong> {{ complement }}</span>
        </p>
        <p v-if="params.customComponents.length > 0">
          <strong>Custom Components</strong> {{ customComponentsDescription }}
        </p>
        <p>
          <strong>Build Points</strong> cost {{ totalBpCost }}, max {{ tier.bpBudget }}
          <strong>Power Core Units</strong> non-essential
          {{ totalPcuCost.essential + totalPcuCost.nonEssential }}, essential
          {{ totalPcuCost.essential }}, max {{ pcuBudget }}
        </p>

        <div v-if="params.hasCrew">
          <h3>Crew</h3>
          <p
            v-for="(roleObj, roleId) in params.crewSkills"
            v-if="roleObj.hasRole || (roleId == 'vi' && params.viId != 'none')">
            <strong>{{ roleDescription[roleId] }}</strong> {{ crewDescriptions[roleId] }}
          </p>
          <p v-if="params.viId != 'none'"><strong>VI</strong> {{ viCrewDescription }}</p>
        </div>

        <h3>Concept</h3>
        <p v-html="params.shipConcept"></p>
      </div>
      <!-- #outputText -->
    </div>
  </div>
</template>

<script>
  import ShipApp from './ShipApp.vue'
</script>
