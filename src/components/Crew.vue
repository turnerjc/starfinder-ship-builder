<script setup></script>

<template>
  <!--
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      |  CREW
      | - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      -->

  <div class="box">
    <header class="box__header">
      <h2 id="crew">Step 6: Crew</h2>
    </header>
    <div class="checkbox">
      <label>
        <input type="checkbox" id="hasCrew" v-model="params.hasCrew" />
        Include crew stats?
      </label>
    </div>
    <div class="box__select" v-if="params.hasCrew">
      <div class="cost__item">
        <span class="cost__name">Complement</span>
        <span class="cost__values">
          <span
            class="cost__current"
            v-bind:class="{ 'cost__current--danger': !isComplementValid }"
            >{{ complement }}</span
          >
          <span class="cost__budget"
            >({{ this.frame.minCrew }}&ndash;{{ this.frame.maxCrew }})</span
          >
        </span>
      </div>
    </div>
  </div>

  <template v-for="role in selectOptionsCrewRole">
    <div class="box crew" v-if="params.hasCrew">
      <h3 class="crew__header">{{ role.name }}</h3>

      <div class="checkbox">
        <label>
          <input type="checkbox" v-model="params.crewSkills[role.id].hasRole" />
          {{ role.hasRoleQuestion }}
        </label>
      </div>

      <div v-if="params.crewSkills[role.id].hasRole" class="crew__role">
        <!-- Officers -->
        <div class="crew__officers" v-if="params.crewSkills[role.id].countOfficers !== undefined">
          <div class="box--flex">
            <!-- number of officers -->
            <div
              class="crew__officers__count form-group col-sm-1-2"
              v-if="typeof params.crewSkills[role.id].countOfficers !== 'undefined'">
              <label :for="role.id + '_countOfficers'">Number of officers</label>
              <input
                type="number"
                :id="role.id + '_countOfficers'"
                v-model="params.crewSkills[role.id].countOfficers"
                class="form-control" />
            </div>

            <!-- officer team size -->
            <div
              class="crew__officers__team-size form-group col-sm-1-2"
              v-if="typeof params.crewSkills[role.id].countOfficerCrew !== 'undefined'">
              <label :for="role.id + '_countOfficerCrew'">Size of crew in each team</label>
              <input
                type="number"
                :id="role.id + '_countOfficerCrew'"
                v-model="params.crewSkills[role.id].countOfficerCrew"
                class="form-control" />
            </div>
          </div>
        </div>
        <!-- .crew__officers -->

        <!-- Skill -->
        <div v-for="skillId in role.skills" class="crew__skill">
          <!-- Skill name -->
          <h4 class="crew__skill__label">{{ getItemById('skill', skillId).name }}</h4>

          <!-- TODO: default skill buttons -->

          <div class="box--flex">
            <!-- Skill ranks -->
            <div
              class="crew__skill__ranks form-group col-sm-1-2"
              v-if="getItemById('skill', skillId).hasRanks">
              <label for="role.id + '_' + skillId + '_ranks'">Ranks</label>
              <input
                type="number"
                class="form-control"
                :id="role.id + '_' + skillId + '_ranks'"
                v-model="params.crewSkills[role.id].skills[skillId].ranks" />
            </div>

            <!-- Skill mod -->
            <div class="crew__skill__mod form-group col-sm-1-2">
              <label for="role.id + '_' + skillId + '_mod'">Mod</label>
              <input
                type="number"
                class="form-control"
                :id="role.id + '_' + skillId + '_mod'"
                v-model="params.crewSkills[role.id].skills[skillId].modifier" />
            </div>
          </div>

          <!-- Skill ship mod -->
          <div class="crew__skill__ship">
            <strong>Ship mod</strong>
            <span v-if="skillId == 'computers'">{{
              getPrefixedModifier(skillModifierComputers)
            }}</span>
            <span v-else-if="skillId == 'piloting'">{{
              getPrefixedModifier(skillModifierPiloting)
            }}</span>
            <span v-else>&ndash;</span>
          </div>

          <!-- Skill total mod -->
          <div class="crew__skill__total">
            <strong>Total</strong>
            {{ getPrefixedModifier(skillTotals[role.id][skillId]) }}
          </div>
        </div>
        <!-- .crew__role__skills -->
      </div>
      <!-- .crew__role -->
    </div>
    <!-- .box -->
  </template>
</template>
