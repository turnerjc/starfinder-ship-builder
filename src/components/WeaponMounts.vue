<template>
  <!--
      			| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      			|	WEAPON MOUNTS
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
              <optgroup v-for="wpnType in data.shipWeaponType.data" :label="wpnType">
                <template v-for="option in selectOptionsShipWeapon">
                  <option :value="option.id">
                    {{ option.name }} ({{ option.damage }}, {{ getWeaponRangeNumerical(option) }},
                    PCU {{ option.pcuCost }}, BP {{ option.bpCost }})
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
          {{ weaponMount.weapon.speed }}; <strong>Damage</strong> {{ weaponMount.weapon.damage }};
          <strong>Special Properties</strong>
          {{
            getNamesFromIds('weaponSpecialProperty', weaponMount.weapon.specialProperties, 'n/a')
          }}
        </div>

        <!-- Special Materials -->
        <div class="form" v-if="params.sources.som">
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

        <!-- Upgrades -->
        <!-- <div class="box__select">
      							<div><strong>Upgrades Available</strong></div>
      							<div class="checkbox" v-for="(upgrade, j) in getAvailableWeaponUpgrades(weaponMount.weapon)">
      								<label :for="'upgrade_' + position + '_' + j">
      									<input type="checkbox"
      										:id="'upgrade_' + position + '_' + j">
      									{{ upgrade.name }}
      								</label>
      							</div>
      						</div> -->

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
            params.sources.som &&
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
            <span v-if="weaponMount.mountBpCost > 0"> + mount {{ weaponMount.mountBpCost }} </span>
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
      {{ weaponsTotalCosts.weaponMaterialsBp }} + mounts {{ weaponsTotalCosts.weaponMountsBp }} +
      links {{ weaponsTotalCosts.weaponLinksBp }})
    </div>
  </div>
</template>

<script></script>
