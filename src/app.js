// Components
import Graphics from './components/Graphics.vue';
import Nav from './components/Nav.vue';
import Summary from './components/Summary.vue';
import Intro from './components/Intro.vue';
import Patreon from './components/Patreon.vue';
import Sources from './components/Sources.vue';

// Helper functions
import {
  maybeCreateProperty,
  isset,
  cloneObject,
  integerToWord,
  stringToFloat,
  stringToDice,
  randomStat,
  statMod,
} from './modules/helpers.js';

// Weapon Mount
import { WeaponMount } from './modules/weaponMount.js';

// Ship Data
import shipData from './modules/shipData.js';

/*
|------------------------------------------------------------------------------------------
| SHIP
|------------------------------------------------------------------------------------------
*/
export default {
  components: {
    Graphics,
    Nav,
    Summary,
    Intro,
    Patreon,
    Sources,
  },
  data() {
    return {
      data: shipData,
      json: '',
      params: {},
      paramsReset: {
        ablativeArmorId: 'none',
        ablativeArmorByPosition: {
          forward: 0,
          aft: 0,
          port: 0,
          starboard: 0,
        },
        antiHackingSystemsId: 'none',
        antiPersonnelWeaponId: 'none',
        armorId: 'none',
        armorMaterialId: 'none',
        computerCountermeasures: {
          alarm: false,
          fakeShell: false,
          feedback: false,
          firewall: false,
          lockout: false,
          shockGridId: 'none',
          wipe: false,
        },
        computerId: 'basic-computer',
        crewQuartersId: 'common',
        crewSkills: {
          captain: {
            countOfficers: 0,
            hasRole: true,
            skills: {
              diplomacy: {
                modifier: 1,
                ranks: 0,
                hasProficiency: true,
                hasExpertise: false,
              },
              intimidate: {
                modifier: 1,
                ranks: 0,
                hasProficiency: true,
                hasExpertise: false,
              },
              bluff: {
                modifier: 1,
                ranks: 0,
                hasProficiency: true,
                hasExpertise: false,
              },
              computers: {
                modifier: 1,
                ranks: 0,
                hasProficiency: false,
                hasExpertise: false,
              },
              engineering: {
                modifier: 1,
                ranks: 0,
                hasProficiency: false,
                hasExpertise: false,
              },
              gunnery: {
                modifier: 1,
                hasProficiency: false,
                hasExpertise: false,
              },
              medicine: {
                modifier: 1,
                ranks: 0,
                hasProficiency: false,
                hasExpertise: false,
              },
              perception: {
                modifier: 1,
                ranks: 0,
                hasProficiency: false,
                hasExpertise: false,
              },
              'physical-science': {
                modifier: 1,
                ranks: 0,
                hasProficiency: false,
                hasExpertise: false,
              },
              piloting: {
                modifier: 1,
                ranks: 0,
                hasProficiency: false,
                hasExpertise: false,
              },
            },
          }, // captain
          engineer: {
            countOfficers: 1,
            countOfficerCrew: 0,
            hasRole: true,
            skills: {
              engineering: {
                modifier: 1,
                ranks: 0,
                hasProficiency: true,
                hasExpertise: false,
              },
              computers: {
                modifier: 1,
                ranks: 0,
                hasProficiency: false,
                hasExpertise: false,
              },
            },
          }, // engineer
          gunner: {
            countOfficers: 1,
            countOfficerCrew: 0,
            hasRole: true,
            skills: {
              gunnery: {
                modifier: 1,
                hasProficiency: true,
                hasExpertise: false,
              },
              computers: {
                modifier: 1,
                ranks: 0,
                hasProficiency: false,
                hasExpertise: false,
              },
              engineering: {
                modifier: 1,
                ranks: 0,
                hasProficiency: false,
                hasExpertise: false,
              },
            },
          }, // gunner
          pilot: {
            countOfficers: 1,
            countOfficerCrew: 0,
            hasRole: true,
            skills: {
              piloting: {
                modifier: 1,
                ranks: 0,
                hasProficiency: true,
                hasExpertise: false,
              },
              gunnery: {
                modifier: 1,
                hasProficiency: true,
                hasExpertise: false,
              },
              computers: {
                modifier: 1,
                ranks: 0,
                hasProficiency: false,
                hasExpertise: false,
              },
              diplomacy: {
                modifier: 1,
                ranks: 0,
                hasProficiency: false,
                hasExpertise: false,
              },
              engineering: {
                modifier: 1,
                ranks: 0,
                hasProficiency: false,
                hasExpertise: false,
              },
              intimidate: {
                modifier: 1,
                ranks: 0,
                hasProficiency: false,
                hasExpertise: false,
              },
            },
          }, // pilot
          scienceOfficer: {
            countOfficers: 1,
            countOfficerCrew: 0,
            hasRole: true,
            skills: {
              computers: {
                modifier: 1,
                ranks: 0,
                hasProficiency: true,
                hasExpertise: false,
              },
              'physical-science': {
                modifier: 1,
                ranks: 0,
                hasProficiency: true,
                hasExpertise: false,
              },
              'life-science': {
                modifier: 1,
                ranks: 0,
                hasProficiency: false,
                hasExpertise: false,
              },
            },
          }, // scienceOfficer
          chiefMate: {
            countOfficers: 1,
            countOfficerCrew: 0,
            hasRole: false,
            skills: {
              acrobatics: {
                modifier: 1,
                ranks: 0,
                hasProficiency: true,
                hasExpertise: false,
              },
              athletics: {
                modifier: 1,
                ranks: 0,
                hasProficiency: true,
                hasExpertise: false,
              },
            },
          }, // chiefMate
          magicOfficer: {
            countOfficers: 1,
            countOfficerCrew: 0,
            hasRole: false,
            skills: {
              mysticism: {
                modifier: 1,
                ranks: 0,
                hasProficiency: true,
                hasExpertise: false,
              },
            },
          }, // magicOfficer
          medicalOfficer: {
            countOfficers: 1,
            countOfficerCrew: 0,
            hasRole: false,
            skills: {
              medicine: {
                modifier: 1,
                ranks: 0,
                hasProficiency: true,
                hasExpertise: false,
              },
            },
          }, // medicalOfficer
          'co-pilot': {
            countOfficers: 1,
            countOfficerCrew: 0,
            hasRole: false,
            skills: {
              piloting: {
                modifier: 1,
                ranks: 0,
                hasProficiency: true,
                hasExpertise: false,
              },
            },
          }, // co-pilot
          astrogator: {
            countOfficers: 1,
            countOfficerCrew: 0,
            hasRole: false,
            skills: {
              computers: {
                modifier: 1,
                ranks: 0,
                hasProficiency: true,
                hasExpertise: false,
              },
              'physical-science': {
                modifier: 1,
                ranks: 0,
                hasProficiency: true,
                hasExpertise: false,
              },
            },
          }, // astrogator
          astropath: {
            countOfficers: 1,
            countOfficerCrew: 0,
            hasRole: false,
            skills: {
              'physical-science': {
                modifier: 1,
                ranks: 0,
                hasProficiency: true,
                hasExpertise: false,
              },
              'life-science': {
                modifier: 1,
                ranks: 0,
                hasProficiency: true,
                hasExpertise: false,
              },
            },
          }, // astropath
        }, // crewSkills
        ctTim: 0,
        ctTimAll: 0,
        customFrameBaseId: 'light-freighter',
        customComponents: [],
        dedicatedComputerId: 'basic-computer',
        defensiveCountermeasuresId: 'none',
        defensiveCountermeasuresMaterialId: 'none',
        deflectorShieldId: 'none',
        driftEngineId: 'none',
        expansionBayIds: ['none', 'none', 'none'],
        fortifiedHullId: 'none',
        frameId: 'light-freighter',
        hasAlgalShielding: 0, // other systems (som)
        hasAutoDestruct: 0,
        hasBiometricLocks: 0,
        hasColonyShipFramework: 0, // other systems (som)
        hasConsciousnessUplink: 0, // other systems (som)
        hasCrew: 1,
        hasDataNet: 0,
        hasEmergencyAccelerator: 0,
        hasHiveJoining: 0, // other systems (pw)
        hasHolographicMantle: 0,
        hasPowersap: 0, // other systems (som)
        hasReconfigurationSystem: 0,
        hasRootSystem: 0, // other systems (som)
        hasSelfDestructSystem: 0,
        hasSpaceStationFramework: 0, // other systems (som)
        hasAfterburners: 0, // upgrades (dnd)
        hasCaptainsChair: 0, // upgrades (dnd)
        hasDeadReckoner: 0, // upgrades (dnd)
        hasRadioArray: 0, // upgrades (dnd)
        hasRepairDrones: 0, // upgrades (dnd)
        hasTargetingOptics: 0, // upgrades (dnd)
        isSetDefaultCrewSkillValues: 1,
        isUseStrictRules: 1,
        networkNode: {},
        powerCoreIds: ['none'],
        powerCoreSpecialMaterials: ['none'],
        ctNetworkNodes: 0,
        reinforcedBulkheadId: 'none',
        roboticAppendageId: 'none',
        secondaryComputerId: 'basic-computer',
        sensorsId: 'none',
        sensorsMaterialId: 'none',
        shieldType: 'shields',
        shieldsByPosition: {
          forward: 0,
          aft: 0,
          port: 0,
          starboard: 0,
        },
        shieldsId: 'none',
        shipConcept: '',
        shipName: '',
        sourcesInUse: {
          pw: true,
          som: true,
          dnd: true,
        },
        thrustersId: 'none',
        thrustersMaterialId: 'none',
        thrustersBoosterId: 'none',
        thrustersBoosterMaterialId: 'none',
        tierId: '1',
        version: '1.0.1',
        viId: 'none',
        viHoloProjectorId: 'none',
        viSkillExpanderId: 'none',
        weaponMounts: {
          forward: [
            {
              weaponId: 'none',
              weight: 'light',
              templateWeight: 'light',
              isFromTemplate: true,
              canBeLinked: false,
              isLinked: false,
              canHaveOrbitalDiscount: false,
              hasOrbitalDiscount: false,
              specialMaterial: 'none',
            },
            {
              weaponId: 'none',
              weight: 'light',
              templateWeight: 'light',
              isFromTemplate: true,
              canBeLinked: false,
              isLinked: false,
              canHaveOrbitalDiscount: false,
              hasOrbitalDiscount: false,
              specialMaterial: 'none',
            },
          ],
          aft: [],
          port: [
            {
              weaponId: 'none',
              weight: 'light',
              templateWeight: 'light',
              isFromTemplate: true,
              canBeLinked: false,
              isLinked: false,
              canHaveOrbitalDiscount: false,
              hasOrbitalDiscount: false,
              specialMaterial: 'none',
            },
          ],
          starboard: [
            {
              weaponId: 'none',
              weight: 'light',
              templateWeight: 'light',
              isFromTemplate: true,
              canBeLinked: false,
              isLinked: false,
              canHaveOrbitalDiscount: false,
              hasOrbitalDiscount: false,
              specialMaterial: 'none',
            },
          ],
          turret: [],
        },
      }, // paramsReset
      selectSampleShipSortOrder: 'name',
      sources: [
        {
          id: 'pw',
          name: 'Pact Worlds',
        },
        {
          id: 'som',
          name: 'Starship Operations Manual',
        },
        {
          id: 'dnd',
          name: '5e Compatible (Starforger/Dark Matter)',
        },
      ],
    };
  },
  /*
  |----------------------------------------------------------------------------------
  |  COMPUTED VALUES
  |----------------------------------------------------------------------------------
  */
  computed: {
    ablativeArmor() {
      return this.getItemById('ablativeArmor', this.params.ablativeArmorId);
    },

    // computed continued...
    ablativeArmorByPositionTotal() {
      var total = 0;
      for (var position in this.params.ablativeArmorByPosition) {
        total += parseInt(this.params.ablativeArmorByPosition[position]);
      }
      return total;
    },

    // computed continued...
    antiHackingSystems() {
      var antiHackingSystems = this.getItemById(
        'antiHackingSystems',
        this.params.antiHackingSystemsId
      );
      antiHackingSystems.getOutputName = function () {
        var outputName = this.name.toLowerCase();
        if (this.id !== 'none') {
          outputName += ' (DC +' + this.dcMod + ')';
        }
        return outputName;
      };
      return antiHackingSystems;
    },

    // computed continued...
    antiPersonnelWeapon() {
      return this.getItemById('personalWeapon', this.params.antiPersonnelWeaponId);
    },

    // computed continued...
    antiPersonnelWeaponBpCost() {
      return (
        (this.antiPersonnelWeapon.weaponType == 'heavy' ? 5 : 0) + this.antiPersonnelWeapon.level
      );
    },

    // computed continued...
    armor() {
      return this.getItemById('armor', this.params.armorId);
    },

    // computed continued...
    armorBonus() {
      return this.params.sourcesInUse.dnd ? this.armor.dnd.bonusToAc : this.armor.bonusToAc;
    },

    // computed continued...
    armorBpCost() {
      var armorBpCost = this.armor.bpCostMultiplier * this.sizeCategory.multiplier;
      if (this.params.sourcesInUse.som) {
        var materialBpCost = 0;
        switch (this.params.armorMaterialId) {
          case 'adamantine-alloy':
            materialBpCost = this.armor.bpCostMultiplier; // (effectively, +1 to size cat multiplier)
            break;
          case 'noqual':
            materialBpCost = 4;
            break;
          case 'siccatite':
            materialBpCost = 2;
            break;
          default:
            break;
        }
        armorBpCost += materialBpCost;
      }

      return armorBpCost;
    },

    // computed continued...
    armorClass() {
      return (
        10 +
        this.armorBonus +
        this.sizeCategory.acAndTlModifier +
        this.pilotingRanks +
        this.deflectorShield.bonusToAc
      );
    },

    // computed continued...
    armorSpecial() {
      var output = [];
      var outputStr = 'n/a';
      // targetLockModifier
      if (isset(this.armorTLMod) && this.armorTLMod < 0) {
        output.push(this.armorTLMod + ' TL');
      }
      // turnDistanceModifier
      if (isset(this.armorTurnDistanceMod) && this.armorTurnDistanceMod > 0) {
        output.push('+' + this.armorTurnDistanceMod + ' turn distance');
      }
      // output
      if (output.length > 0) {
        outputStr = output.join('; ');
      }
      return outputStr;
    },

    // computed continued...
    armorTLMod() {
      return this.params.sourcesInUse.dnd
        ? this.armor.dnd.targetLockModifier
        : this.armor.targetLockModifier;
    },

    // computed continued...
    armorTurnDistanceMod() {
      return this.params.sourcesInUse.dnd
        ? this.armor.dnd.turnDistanceModifier
        : this.armor.turnDistanceModifier;
    },

    // computed continued...
    biometricLocksBpCost() {
      return 5 * this.params.hasBiometricLocks;
    },

    // computed continued...
    complement() {
      var complement = 0;

      for (var roleIndex in this.params.crewSkills) {
        var role = this.params.crewSkills[roleIndex];

        if (!role.hasRole) continue;

        if (roleIndex == 'captain') {
          complement++;
        }

        var countOfficers = role.countOfficers ? parseInt(role.countOfficers) : 0;
        var countOfficerCrew = role.countOfficerCrew ? parseInt(role.countOfficerCrew) : 0;

        complement += countOfficers;
        complement += countOfficers * countOfficerCrew;
      }

      return complement;
    },

    // computed continued...
    computer() {
      return this.getItemById('computer', this.params.computerId);
    },

    // computed continued...
    computerName() {
      var name = this.params.sourcesInUse.dnd ? this.computer.dnd.name : this.computer.name;
      // console.log(name);
      return name;
    },

    // computed continued...
    computerBonus() {
      var bonus = this.params.sourcesInUse.dnd ? this.computer.dnd.bonus : this.computer.bonus;
      // console.log(bonus);
      return bonus;
    },

    // computed continued...
    computerNodes() {
      var nodes = this.params.sourcesInUse.dnd ? this.computer.dnd.nodes : this.computer.nodes;
      // console.log(nodes);
      return nodes;
    },

    // computed continued...
    computerDescription() {
      var desc = '';
      if (this.computer.id !== 'basic-computer') {
        var nodes = this.computerNodes;
        if (this.params.sourcesInUse.som && this.isSupercolossal && this.networkNodes.ct > 0) {
          nodes += this.networkNodes.ct;
        }
        var bonus = '+' + this.computerBonus;
        var nodesWord = integerToWord(nodes);
        desc = bonus + ' to any ' + nodesWord + ' check' + (nodes > 1 ? 's' : '') + ' per round';
        if (
          this.params.sourcesInUse.som &&
          this.isSupercolossal &&
          this.secondaryComputerNodes > 0
        ) {
          nodes = this.secondaryComputerNodes;
          bonus = '+' + this.secondaryComputerBonus;
          nodesWord = integerToWord(nodes);
          desc +=
            ', ' +
            bonus +
            ' to any ' +
            nodesWord +
            ' check' +
            (nodes > 1 ? 's' : '') +
            ' per round';
        }
      }
      return desc;
    },

    // computed continued...
    computerCountermeasuresBpCost() {
      var total = 0;
      for (var measure in this.params.computerCountermeasures) {
        if (measure == 'shockGridId') {
          total += this.shockGridBpCost;
        } else {
          if (this.params.computerCountermeasures[measure] == true) {
            total += this.computerTier;
          }
        }
      }
      return total;
    },

    // computed continued...
    computerCountermeasuresDescription() {
      var desc = [];
      for (var measure in this.params.computerCountermeasures) {
        if (measure == 'shockGridId') {
          if (this.params.computerCountermeasures[measure] !== 'none') {
            var shockGridDesc =
              'shock grid ' +
              this.shockGrid.rank +
              ' [DC ' +
              this.shockGrid.dc +
              ', ' +
              this.shockGrid.damage +
              ']';
            desc.push(shockGridDesc);
          }
        } else {
          if (this.params.computerCountermeasures[measure] == true) {
            var cmName = this.getItemById('computerCountermeasures', measure).name.toLowerCase();
            desc.push(cmName);
          }
        }
      }
      return desc.join(', ');
    },

    // computed continued...
    computerSkillBonusDesc() {
      if (this.computerNodes === undefined || this.computerNodes == 0) return '+0';

      var that = this;
      var bonuses = [];

      // main computer
      for (var index = 0; index < this.computerNodes; index++) {
        bonuses.push(that.getPrefixedModifier(that.computerBonus));
      }

      // network nodes (supercolossal ships)
      if (this.params.sourcesInUse.som && this.frame.size == 'Supercolossal') {
        for (var index = 0; index < this.networkNodes.ct; index++) {
          bonuses.push(that.getPrefixedModifier(that.computerBonus));
        }
      }

      // secondary computer (supercolossal ships)
      if (this.params.sourcesInUse.som && this.frame.size == 'Supercolossal') {
        for (var index = 0; index < this.secondaryComputerNodes; index++) {
          bonuses.push(that.getPrefixedModifier(that.secondaryComputerBonus));
        }
      }

      return bonuses.join('/');
    },

    // computed continued...
    computerTier() {
      var shipTier = this.tier.value;
      return shipTier < 2 ? 1 : Math.floor(shipTier * 0.5);
    },

    // computed continued...
    countPowerCoreHousings() {
      var countHousings = this.sizeCategory.countPowerCoreHousings;
      if (
        (this.sizeCategory.id == 'Medium' || this.sizeCategory.id == 'Large') &&
        this.hasPowerCoreHousingExpansionBay
      ) {
        countHousings++;
      }
      this.adjustPowerCores(countHousings);
      return countHousings;
    },

    // computed continued...
    crewQuarters() {
      return this.getItemById('crewQuarters', this.params.crewQuartersId);
    },

    // computed continued...
    crewDescriptions() {
      var that = this;

      var descs = {};

      // crew
      Object.keys(this.params.crewSkills).forEach(function (roleId) {
        var crewSkill = that.params.crewSkills[roleId];
        if (crewSkill.hasRole == false) return;

        var roleDesc = [];

        Object.keys(crewSkill.skills).forEach(function (skillId) {
          if (that.params.sourcesInUse.dnd) {
            var skill = that.params.crewSkills[roleId].skills[skillId];
            if (!skill.hasProficiency) return;
            roleDesc.push(that.getSkillDesc(skillId, skill));
          } else {
            var skill = that.params.crewSkills[roleId].skills[skillId];
            if (skillId == 'gunnery' && skill.modifier == 0) return;
            if (skillId != 'gunnery' && (skill.ranks === undefined || skill.ranks == 0)) return;

            roleDesc.push(that.getSkillDesc(skillId, skill));
          }
        });

        if (roleDesc.length > 0) descs[roleId] = roleDesc.join(', ');
      });

      return descs;
    },

    // computed continued...
    criticalThreshold() {
      return Math.round(this.hp / 5) + this.fortifiedHull.bonusToCt;
    },

    // computed continued...
    ctComputerNodes() {
      var ct = this.computerNodes.toString();
      if (this.params.sourcesInUse.som && this.frame.size == 'Supercolossal') {
        ct += '/';
        ct += this.networkNodes.ct.toString();
        ct += '/';
        ct += this.secondaryComputerNodes.toString();
      }
      return ct;
    },

    // computed continued...
    ctExpansionBaySlots() {
      var ctExpansionBaySlots = this.frame.expansionBays;
      if (
        this.params.sourcesInUse.som &&
        this.sizeCategory.multiplier >= 4 &&
        (this.params.hasColonyShipFramework || this.params.hasSpaceStationFramework)
      ) {
        ctExpansionBaySlots *= 3;
      }
      return ctExpansionBaySlots;
    },

    // computed continued...
    ctExternalExpansionBays() {
      if (!this.params.sourcesInUse.som) return 0;

      var ctBays = this.expansionBays.filter(function (bay) {
        return bay.id == 'external-expansion-bay';
      });

      return ctBays.length;
    },

    // computed continued...
    customComponentBpTotal() {
      if (!isset(this.params.customComponents)) return 0;

      var total = 0;
      this.params.customComponents.forEach(function (customComponent) {
        total += parseInt(customComponent.bpCost);
      });

      return total;
    },

    // computed continued...
    customComponentPcuTotal() {
      if (!isset(this.params.customComponents)) return 0;

      var total = { essential: 0, nonEssential: 0 };
      this.params.customComponents.forEach(function (customComponent) {
        if (customComponent.isEssential) {
          total.essential += parseInt(customComponent.pcuCost);
        } else {
          total.nonEssential += parseInt(customComponent.pcuCost);
        }
      });

      return total;
    },

    // computed continued...
    customComponentsDescription() {
      if (this.params.customComponents.length == 0) return 'None';

      var components = [];

      this.params.customComponents.forEach(function (component) {
        components.push(component.name + (component.notes ? ' (' + component.notes + ')' : ''));
      });

      return components.join('; ');
    },

    // computed continued...
    customFrameSize() {
      if (!isset(this.params.customFrame)) return {};

      return this.getItemById('sizeCategory', this.params.customFrame.size);
    },

    // computed continued...
    damageThreshold() {
      var dt = this.frame.dt;
      if (this.params.sourcesInUse.som && this.params.armorMaterialId == 'adamantine-alloy') {
        if (dt == 'n/a') dt = 0;
        dt += this.armorBonus;
      }
      return dt;
    },

    // computed continued...
    dataNetBpCost() {
      return this.params.hasDataNet ? 3 : 0;
    },

    // computed continued...
    dataNetPcuCost() {
      return this.params.hasDataNet ? 5 : 0;
    },

    // computed continued...
    dedicatedComputer() {
      return this.getItemById('computer', this.params.dedicatedComputerId);
    },

    // computed continued...
    dedicatedComputerBonus() {
      var bonus = this.params.sourcesInUse.dnd
        ? this.dedicatedComputer.dnd.bonus
        : this.dedicatedComputer.bonus;
      // console.log(bonus);
      return bonus;
    },

    // computed continued...
    dedicatedComputerNodes() {
      var nodes = this.params.sourcesInUse.dnd
        ? this.dedicatedComputer.dnd.nodes
        : this.dedicatedComputer.nodes;
      console.log(nodes);
      return nodes;
    },

    // computed continued...
    defensiveCountermeasures() {
      return this.getItemById('defensiveCountermeasures', this.params.defensiveCountermeasuresId);
    },

    // computed continued...
    defensiveCountermeasuresBonus() {
      var bonus = this.params.sourcesInUse.dnd
        ? this.defensiveCountermeasures.dnd.bonusToTL
        : this.defensiveCountermeasures.bonusToTL;
      // console.log(bonus);
      return bonus;
    },

    // computed continued...
    defensiveCountermeasuresBpCost() {
      var dcBpCost = this.defensiveCountermeasures.bpCost;

      if (this.params.sourcesInUse.som) {
        switch (this.params.defensiveCountermeasuresMaterialId) {
          case 'horacalcum':
            dcBpCost += 4;
            break;
          case 'siccatite':
            dcBpCost += 3;
            break;
          default:
            break;
        }
      }
      return dcBpCost;
    },

    // computed continued...
    defensiveCountermeasuresPcuCost() {
      return this.params.sourcesInUse.dnd
        ? this.defensiveCountermeasures.dnd.pcuCost
        : this.defensiveCountermeasures.pcuCost;
    },

    // computed continued...
    deflectorShield() {
      return this.getItemById('deflectorShield', this.params.deflectorShieldId);
    },

    // computed continued...
    driftEngine() {
      return this.getItemById('driftEngine', this.params.driftEngineId);
    },

    // computed continued...
    driftEngineBpCost() {
      return this.driftEngine.bpCostMultiplier * this.sizeCategory.multiplier;
    },

    // computed continued...
    expansionBays() {
      var that = this;
      var expansionBays = [];
      this.params.expansionBayIds.forEach(function (id) {
        expansionBays.push(that.getItemById('expansionBay', id));
      });
      return expansionBays;
    },

    // computed continued...
    expansionBaysCountUsed() {
      var countUsed = 0;
      for (var i in this.expansionBays) {
        if (this.expansionBays[i].id !== 'none') {
          countUsed += this.expansionBays[i].numBays;
        }
      }
      return countUsed;
    },

    // computed continued...
    expansionBaysDescription() {
      // test if no expansion bays
      if (this.sizeCategory.id != 'Supercolossal' && this.expansionBays.length == 0) return 'None';
      if (
        this.sizeCategory.id != 'Supercolossal' &&
        this.expansionBays.filter(function (bay) {
          return bay.id != 'none';
        }).length == 0
      )
        return 'None';

      // collect expansion bays by type
      var expansionBaysByType = {};
      for (var index in this.expansionBays) {
        var expansionBayId = this.expansionBays[index].id;
        maybeCreateProperty(expansionBaysByType, expansionBayId, 'Integer');
        expansionBaysByType[expansionBayId]++;
      }

      // handle cargo bays on Supercolossal ships
      if (this.sizeCategory.id == 'Supercolossal') {
        var additionalCargoHolds = Math.floor(this.frame.bpCost / 10);
        if (expansionBaysByType['cargo-hold'] === undefined) {
          maybeCreateProperty(expansionBaysByType, 'cargo-hold', 'Integer');
        }
        expansionBaysByType['cargo-hold'] += additionalCargoHolds;
      }

      // get description
      var expansionBaysDescription = [];
      var sep = ', ';
      for (var id in expansionBaysByType) {
        if (id == 'none') continue;

        // name
        var expansionBayName = this.getItemById('expansionBay', id).name.toLowerCase();

        // qty
        var expansionBayQty = expansionBaysByType[id];
        // var expansionBayQuantity = expansionBaysByType[id] == 1 ? "" : " (" + expansionBaysByType[id] + ")";

        // final desc
        var expansionBayDesc =
          expansionBayName + (expansionBayQty > 1 ? ' (' + expansionBayQty + ')' : '');

        expansionBaysDescription.push(expansionBayDesc);
      }

      return expansionBaysDescription.join(sep);
    },

    // computed continued...
    expansionBaysTotalBpCost() {
      return this.getSumOfPropertyValuesInCollection(this.expansionBays, 'bpCost');
    },

    // computed continued...
    expansionBaysTotalPcuCost() {
      return this.getSumOfPropertyValuesInCollection(this.expansionBays, 'pcuCost');
    },

    // computed continued...
    fortifiedHull() {
      var fortifiedHull = {};

      var data = this.getItemById('fortifiedHull', this.params.fortifiedHullId);

      Object.keys(data).forEach(function (key) {
        fortifiedHull[key] = data[key];
      });

      fortifiedHull.bonusToCt = fortifiedHull.bonusToCtMultiplier * this.sizeCategory.multiplier;
      fortifiedHull.bpCost = fortifiedHull.bpCostMultiplier * this.sizeCategory.multiplier;

      return fortifiedHull;
    },

    // computed continued...
    frame() {
      if (this.params.frameId == 'custom') {
        // custom frame
        if (!this.params.customFrame) this.setCustomFrame();
        return this.params.customFrame;
      } else {
        // standard frame
        // if(this.params.customFrame) this.$delete(this.params, 'customFrame');
        var frame = this.getItemById('frame', this.params.frameId);
        return frame;
      }
    },

    // computed continued...
    frameName() {
      return (
        this.frame.name.toLowerCase() +
        (this.params.hasColonyShipFramework ? '(colony ship)' : '') +
        (this.params.hasSpaceStationFramework ? ' (space station)' : '')
      );
    },

    // computed continued...
    hasBoosterThrusterHousing() {
      if (!this.params.sourcesInUse.som) return false;

      var hasHousing =
        this.expansionBays.find(function (bay) {
          return bay.id == 'booster-thruster-housing';
        }) !== undefined;

      return hasHousing;
    },

    // computed continued...
    hasComputerCountermeasures() {
      for (var measure in this.params.computerCountermeasures) {
        if (measure == 'shockGridId') {
          if (this.params.computerCountermeasures[measure] !== 'none') {
            return true;
          }
        } else {
          if (this.params.computerCountermeasures[measure] == true) {
            return true;
          }
        }
      }
      return false;
    },

    // computed continued...
    hasDedicatedComputerHousing() {
      if (!this.params.sourcesInUse.som) return false;

      var hasHousing =
        this.expansionBays.find(function (bay) {
          return bay.id == 'dedicated-computer-housing';
        }) !== undefined;

      return hasHousing;
    },

    // computed continued...
    hasHealingPod() {
      if (!this.params.sourcesInUse.som) return false;

      var hasPod =
        this.expansionBays.find(function (bay) {
          return bay.id == 'healing-pods';
        }) !== undefined;

      return hasPod;
    },

    // computed continued...
    hasPowerCoreHousingExpansionBay() {
      var result = false;
      for (var i in this.params.expansionBayIds) {
        if (this.params.expansionBayIds[i] == 'power-core-housing') {
          result = true;
        }
      }
      return result;
    },

    // computed continued...
    hasSupercolossalPowerCore() {
      if (this.frame.size != 'Supercolossal') return false;

      var hasSupercolossalPowerCore = false;

      this.powerCores.forEach(function (powerCore) {
        if (hasSupercolossalPowerCore) return;
        if (powerCore.id == 'none') return;

        if (powerCore.sizes.indexOf('Supercolossal') > -1) {
          hasSupercolossalPowerCore = true;
        }
      });

      return hasSupercolossalPowerCore;
    },

    // computed continued...
    hasSecurity() {
      return (
        this.params.antiHackingSystemsId !== 'none' ||
        this.params.antiPersonnelWeaponId !== 'none' ||
        this.params.hasBiometricLocks ||
        this.hasComputerCountermeasures ||
        this.params.hasSelfDestructSystem ||
        this.params.hasEmergencyAccelerator ||
        this.params.hasHolographicMantle ||
        this.params.hasReconfigurationSystem
      );
    },

    // computed continued...
    hiveJoiningBpCost() {
      return this.params.hasHiveJoining ? 1 : 0;
    },

    // computed continued...
    hp() {
      return parseInt(this.frame.hp) + parseInt(this.tier.hpIncrease) * this.frame.hpIncrement;
    },

    // computed continued...
    isAblativeArmorBalanced() {
      var positions = this.params.ablativeArmorByPosition;
      var isBalanced = true;

      if (
        positions.forward != positions.aft ||
        positions.forward != positions.port ||
        positions.forward != positions.starboard
      ) {
        isBalanced = false;
      }

      return isBalanced;
    },

    // computed continued...
    isComplementValid() {
      var isComplementValid = true;
      if (this.complement < this.frame.minCrew || this.complement > this.frame.maxCrew) {
        isComplementValid = false;
      }
      return isComplementValid;
    },

    // computed continued...
    isExpansionBaysCountOverBudget() {
      return this.expansionBaysCountUsed > this.ctExpansionBaySlots;
    },

    // computed continued...
    isOrbitalWeaponDiscountUsed() {
      if (!this.params.sourcesInUse.som) return false;
      if (this.sizeCategory.multiplier < 4) return false;
      if (!(this.params.hasColonyShipFramework || this.params.hasSpaceStationFramework))
        return false;

      var that = this;

      var isUsed = false;
      for (var position in this.weaponMounts) {
        this.weaponMounts[position].forEach(function (mount, i) {
          if (isUsed) return;

          var isOrbital = that.isOrbitalWeapon(mount.weapon);
          if (!isOrbital) return;

          if (that.params.weaponMounts[position][i].hasOrbitalDiscount) isUsed = true;
          return;
        });
      }
      return isUsed;
    },

    // computed continued...
    isSupercolossal() {
      return this.params.sourcesInUse.som && this.frame.size == 'Supercolossal';
    },

    // computed continued...
    jsonParams() {
      // TODO: need to modify JSON output to include sampleShip header, ex.
      //   "id": "3-kingdoms-star-castle",
      //   "source": "dnd",
      //   "name": "3 Kingdoms Star Castle",
      //   "size": 8,
      //   "tier": "19",
      var jsonParams = cloneObject(this.params);
      jsonParams['isSetDefaultCrewSkillValues'] = 0; // Because otherwise crew skills get overwritten!
      return JSON.stringify(jsonParams);
    },

    // computed continued...
    maneuverabilityRating() {
      if (this.params.hasSpaceStationFramework) {
        return this.getItemById('maneuverabilityRating', 'poor');
      }

      return this.getItemById('maneuverabilityRating', this.frame.maneuverability);
    },

    // computed continued...
    modifiersDescription() {
      var desc = [];
      // computer nodes
      if (this.computer.id !== 'basic-computer') {
        desc.push(this.computerDescription);
      }
      // Computers skill
      if (this.skillModifierComputers !== 0) {
        desc.push(this.getPrefixedModifier(this.skillModifierComputers) + ' Computers');
      }
      // Piloting skill
      if (this.skillModifierPiloting !== 0) {
        desc.push(this.getPrefixedModifier(this.skillModifierPiloting) + ' Piloting');
      }
      return desc.join(', ');
    },

    // computed continued...
    networkNodes() {
      var ctNodes = 0;

      if (this.params.sourcesInUse.som && this.isSupercolossal) {
        ctNodes = parseInt(this.params.ctNetworkNodes);
      }

      // TODO: Change this to use networkNode.json here
      var dndBonuses = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2];
      var dndNames = [0, 0, 0, 0, 4110, 5110, 6110, 7110, 8210, 9210, 10210];
      var maxNodes = [0, 0, 0, 0, 2, 2, 3, 3, 4, 4, 5];
      var pcuCosts = [0, 0, 0, 0, 8, 10, 11, 13, 15, 17, 19];

      return {
        bonus: this.params.sourcesInUse.dnd ? dndBonuses[this.computer.bonus] : this.computer.bonus,
        bpCost: ctNodes * this.computer.bonus,
        ct: ctNodes,
        name: this.params.sourcesInUse.dnd ? dndNames[this.computer.bonus] : this.computer.bonus,
        max: maxNodes[this.computer.bonus],
        pcuCost: ctNodes * pcuCosts[this.computer.bonus == 0 ? 0 : this.computer.bonus - 1],
      };
    },

    networkNodesMax() {
      return networkNode.max;
    },

    // computed continued...
    pilotingRanks() {
      var pilotingRanks = 0;
      var crewSkills = this.params.crewSkills;
      if (crewSkills.pilot.hasRole) {
        pilotingRanks = parseInt(crewSkills.pilot.skills.piloting.ranks);
      } else if (crewSkills.captain.hasRole) {
        pilotingRanks = parseInt(crewSkills.captain.skills.piloting.ranks);
      } else if (this.viId != 'none') {
        pilotingRanks = this.vi.value;
      }
      return pilotingRanks;
    },

    // computed continued...
    pcuBudget() {
      var pcuBudget = 0;
      for (var i in this.powerCores) {
        var powerCoreBudget = this.powerCores[i].pcuBudget;
        if (this.params.powerCoreSpecialMaterials[i] == 'abysium') powerCoreBudget *= 1.25;
        pcuBudget += Math.floor(powerCoreBudget);
      }
      return pcuBudget;
    },

    // computed continued...
    powerCoreDescription() {
      var desc = [];
      for (var i in this.powerCores) {
        var powerCore = this.powerCores[i];
        if (powerCore.id !== 'none') {
          desc.push(powerCore.name + ' (' + powerCore.pcuBudget + ' PCU)');
        }
      }
      return desc.join(', ');
    },

    // computed continued...
    powerCores() {
      var powerCoreList = [];
      for (var i in this.params.powerCoreIds) {
        var powerCore = cloneObject(this.getItemById('powerCore', this.params.powerCoreIds[i]));
        powerCore.sizeList = powerCore.sizes.join(', ');

        // special materials
        if (this.params.sourcesInUse.som) {
          var specialMat = this.params.powerCoreSpecialMaterials[i];

          var name = '';

          // material
          if (specialMat != 'none') {
            name += specialMat.toTitleCase() + ' ';
          }

          // description
          name += powerCore.name;

          powerCore.name = name;

          // bp cost
          if (specialMat == 'abysium') {
            powerCore.bpCost += 2;
          } else if (specialMat == 'djezet') {
            powerCore.bpCost += 1;
          }
        }

        powerCoreList.push(powerCore);
      }
      return powerCoreList;
    },

    // computed continued...
    powerCoresBpCost() {
      var bpCost = 0;
      for (var i in this.powerCores) {
        bpCost += this.powerCores[i].bpCost;
      }
      return bpCost;
    },

    // computed continued...
    reinforcedBulkhead() {
      var reinforcedBulkhead = {};

      var data = this.getItemById('reinforcedBulkhead', this.params.reinforcedBulkheadId);

      Object.keys(data).forEach(function (key) {
        reinforcedBulkhead[key] = data[key];
      });

      reinforcedBulkhead.bpCost =
        reinforcedBulkhead.bpCostMultiplier * this.sizeCategory.multiplier;

      return reinforcedBulkhead;
    },

    // computed continued...
    roboticAppendage() {
      var roboticAppendage = this.getItemById('roboticAppendage', this.params.roboticAppendageId);
      return roboticAppendage;
    },

    // computed continued...
    roleDescription() {
      var roleDesc = {};
      for (var role in this.params.crewSkills) {
        roleDesc[role] = this.getItemById('role', role).name;
        var roleObj = this.params.crewSkills[role];
        if (isset(roleObj.countOfficers) && roleObj.countOfficers > 0) {
          if (isset(roleObj.countOfficerCrew) && roleObj.countOfficerCrew > 0) {
            // at least one officer with large team
            var officers = [];
            officers.push(roleObj.countOfficers + ' ' + 'officer'.pluralise(roleObj.countOfficers));
            officers.push(
              roleObj.countOfficerCrew + ' crew' + (roleObj.countOfficers > 1 ? ' each' : '')
            );
            roleDesc[role] += ' (' + officers.join(', ') + ')';
          } else if (roleObj.countOfficers > 1) {
            // more than one officer
            if (role == 'captain') {
              roleDesc[role] +=
                ' (plus ' +
                roleObj.countOfficers +
                ' ' +
                'officer'.pluralise(roleObj.countOfficers) +
                ')';
            } else {
              roleDesc[role] += ' (' + roleObj.countOfficers + ')';
            }
          }
        }
      }
      return roleDesc;
    },

    // computed continued...
    secondaryComputer() {
      return this.getItemById('computer', this.params.secondaryComputerId);
    },

    // computed continued...
    secondaryComputerBonus() {
      var bonus = this.params.sourcesInUse.dnd
        ? this.secondaryComputer.dnd.bonus
        : this.secondaryComputer.bonus;
      // console.log(bonus);
      return bonus;
    },

    // computed continued...
    secondaryComputerNodes() {
      var nodes = this.params.sourcesInUse.dnd
        ? this.secondaryComputer.dnd.nodes
        : this.secondaryComputer.nodes;
      // console.log(nodes);
      return nodes;
    },

    // computed continued...
    securityDescription() {
      var desc = [];
      if (this.params.antiHackingSystemsId !== 'none') {
        desc.push(this.antiHackingSystems.getOutputName());
      }
      if (this.params.antiPersonnelWeaponId !== 'none') {
        desc.push('anti-personnel weapon (' + this.antiPersonnelWeapon.name.toLowerCase() + ')');
      }
      if (this.params.hasBiometricLocks) {
        desc.push('biometric locks');
      }
      if (this.hasComputerCountermeasures) {
        desc.push('computer countermeasures (' + this.computerCountermeasuresDescription + ')');
      }
      if (this.params.hasSelfDestructSystem) {
        desc.push('self-destruct system');
      }
      if (this.params.hasEmergencyAccelerator) {
        desc.push('emergency accelerator');
      }
      if (this.params.hasHolographicMantle) {
        desc.push('holographic mantle');
      }
      if (this.params.hasReconfigurationSystem) {
        desc.push('reconfiguration system');
      }
      return desc.join(', ');
    },

    // computed continued...
    securityTotalBpCost() {
      return (
        this.antiHackingSystems.bpCost +
        this.antiPersonnelWeaponBpCost +
        this.biometricLocksBpCost +
        this.computerCountermeasuresBpCost +
        this.selfDestructSystemBpCost +
        (this.params.hasEmergencyAccelerator ? 4 * this.sizeCategory.multiplier : 0) +
        (this.params.hasHolographicMantle ? 12 : 0) +
        (this.params.hasReconfigurationSystem ? 30 : 0)
      );
    },

    // computed continued...
    securityTotalPcuCost() {
      return (
        (this.params.hasEmergencyAccelerator ? 5 : 0) +
        (this.params.hasHolographicMantle ? 10 : 0) +
        (this.params.hasReconfigurationSystem ? 50 : 0)
      );
    },

    // computed continued...
    selectOptions() {
      var that = this;
      var options = {};
      var fields = [
        'ablativeArmor',
        'antiHackingSystems',
        'armor',
        'computer',
        'computerCountermeasures',
        'crewQuarters',
        'defensiveCountermeasures',
        'deflectorShield',
        'driftEngine',
        'expansionBay',
        'fortifiedHull',
        'frame',
        'personalWeapon',
        'powerCore',
        'reinforcedBulkhead',
        'roboticAppendage',
        'role',
        'sampleShip',
        'shockGrid',
        'sensors',
        'shields',
        'shipWeapon',
        'sizeCategory',
        'skill',
        'thrusters',
        'tier',
        'vi',
        'viHoloProjector',
        'viSkillExpander',
      ];

      // sourcebook selected
      for (var i in fields) {
        var field = fields[i];
        options[field] = this.getSelectOptionsFor(field).filter(
          (option) =>
            option.source === undefined ||
            option.source === 'scr' ||
            this.params.sourcesInUse[option.source]
        );
      }

      // expansionBay
      var expansionBayNone = options.expansionBay.shift();
      options.expansionBay.sort(function (a, b) {
        return a.name > b.name;
      });
      options.expansionBay.unshift(expansionBayNone);

      // ship weapon
      options.shipWeapon.sort(function (a, b) {
        return a.name > b.name;
      });

      return options;
    },

    selectOptionsSampleShip() {
      // sampleShip
      var sortKey = this.selectSampleShipSortOrder;
      var shipList = [];
      if (sortKey == 'tier') {
        shipList = this.selectOptions.sampleShip.sort(function (a, b) {
          return stringToFloat(a.tier) - stringToFloat(b.tier);
        });
      } else {
        shipList = this.selectOptions.sampleShip.sort(function (a, b) {
          return +(a[sortKey] > b[sortKey]) || -(a[sortKey] < b[sortKey]);
        });
      }
      // console.log('shipList', shipList);
      return shipList;
    },

    // computed continued...
    selectOptionsBaseFrame() {
      return this.selectOptions.frame.filter((option) => option.id != custom);
    },

    // computed continued...
    selectOptionsThruster() {
      return this.selectOptions.thrusters.filter(
        (option) => !this.params.isUseStrictRules || option.size.indexOf(this.frame.size) > -1
      );
    },

    // computed continued...
    selectOptionsAblativeArmor() {
      return this.selectOptions.ablativeArmor.filter((option) => option.tempHp <= this.hp * 2);
    },

    // computed continued...
    selectOptionsComputer() {
      return this.selectOptions.computer.filter((option) => {
        if (this.frame.size != 'Supercolossal' || option.bonus >= 4) {
          if (this.params.sourcesInUse.dnd) {
            return option.dnd.name != 'n/a';
          } else {
            return true;
          }
        }
      });
    },

    // computed continued...
    selectOptionsComputerCountermeasures() {
      return this.selectOptions.computerCountermeasures.filter(
        (option) => option.id != 'shock-grid'
      );
    },

    // computed continued...
    selectOptionsCrew() {
      var crew = Object.keys(this.params.crewSkills).filter(
        (roleId) => this.params.crewSkills[roleId].hasRole
      );
      // console.log('crew', crew);
      return crew;
    },

    // computed continued...
    selectOptionsCrewQuarters() {
      return this.selectOptions.crewQuarters.filter(
        (option) =>
          !this.params.isUseStrictRules ||
          (this.sizeCategory.multiplier == 1 && option.isTinyOnly) ||
          (this.sizeCategory.multiplier > 1 && !option.isTinyOnly)
      );
    },

    // computed continued...
    selectOptionsDedicatedComputer() {
      return this.selectOptions.computer.filter((option) => {
        if (option.id == 'basic-computer') return true;
        if (this.params.sourcesInUse.dnd) {
          return option.dnd.name.indexOf('mononode') !== -1;
        } else {
          return option.id.indexOf('mononode') !== -1;
        }
      });
    },

    // computed continued...
    selectOptionsDriftEngine() {
      var driftEngines = this.selectOptions.driftEngine.filter(
        (option) =>
          !this.params.isUseStrictRules ||
          (this.pcuBudget >= option.minPcu && this.sizeCategory.multiplier <= option.maxSize)
      );
      // console.log('driftEngines', driftEngines);
      return driftEngines;
    },

    // computed continued...
    selectOptionsPersonalWeapon() {
      // TODO: Remove weapon level for D&D 5e or add levels to the personal weapons
      return this.selectOptions.personalWeapon.filter((option) => option.level <= this.tier.id);
    },

    // computed continued...
    selectOptionsSecondaryComputer() {
      return this.selectOptions.computer.filter((option) => {
        if (option.bonus < this.computer.bonus) {
          if (this.params.sourcesInUse.dnd) {
            return option.dnd.name != 'n/a';
          } else {
            return true;
          }
        }
        return false;
      });
    },

    // computed continued...
    selfDestructSystemBpCost() {
      return this.params.hasSelfDestructSystem * 5 * this.sizeCategory.multiplier;
    },

    // computed continued...
    sensors() {
      return this.getItemById('sensors', this.params.sensorsId);
    },

    // computed continued...
    sensorsBpCost() {
      var sensorsBpCost = this.sensors.bpCost;
      if (this.params.sourcesInUse.som) {
        switch (this.params.sensorsMaterialId) {
          case 'djezet':
            sensorsBpCost += 3;
            break;
          case 'noqual':
            sensorsBpCost += 2;
            break;
          default:
            break;
        }
      }
      return sensorsBpCost;
    },

    // computed continued...
    shields() {
      return this.getItemById('shields', this.params.shieldsId);
    },

    // computed continued...
    shieldsByPositionTotal() {
      var total = 0;
      for (var position in this.params.shieldsByPosition) {
        total += parseInt(this.params.shieldsByPosition[position]);
      }
      return total;
    },

    // computed continued...
    shipName() {
      return this.params.shipName == '' ? 'New Ship' : this.params.shipName;
    },

    // computed continued...
    shockGrid() {
      return this.getItemById('shockGrid', this.params.computerCountermeasures.shockGridId);
    },

    // computed continued...
    shockGridBpCost() {
      return this.shockGrid.bpCostMultiplier * this.computerTier;
    },

    // computed continued...
    sizeCategory() {
      return this.getItemById('sizeCategory', this.frame.size);
    },

    // computed continued...
    skillModifierComputers() {
      return this.sensors.modifier;
    },

    // computed continued...
    skillModifierPiloting() {
      var modifier = 0;

      modifier += this.maneuverabilityRating.pilotingModifier;
      modifier += this.thrusters.pilotingModifier;

      if (modifier > -2 && !this.isAblativeArmorBalanced) {
        modifier -= 1;
      }

      if (this.ablativeArmor.tempHp > this.hp) {
        modifier -= 1;
      }

      return modifier;
    },

    // computed continued...
    skillMod() {
      if (this.params.sourcesInUse.dnd) {
        return Math.floor((this.tier.value - 1) / 8) + 1;
      } else {
        return Math.floor((this.tier.value - 1) / 5) + 1;
      }
    },

    // computed continued...
    skillProficiency() {
      return Math.floor((this.tier.value - 1) / 4) + 2;
    },

    // computed continued...
    skillRanks() {
      return this.tier.value;
    },

    // computed continued...
    skillTotals() {
      var skillTotals = {};
      for (var role in this.params.crewSkills) {
        skillTotals[role] = {};
        for (var skill in this.params.crewSkills[role].skills) {
          var skillObj = this.params.crewSkills[role].skills[skill];
          skillTotals[role][skill] = parseInt(skillObj.modifier);
          if (this.params.sourcesInUse.dnd) {
            if (skillObj.hasProficiency) {
              skillTotals[role][skill] += this.skillProficiency;
            }
            if (skillObj.hasExpertise) {
              skillTotals[role][skill] += this.skillProficiency;
            }
          } else {
            if (isset(skillObj.ranks)) {
              skillTotals[role][skill] += parseInt(skillObj.ranks);
            }
          }
          if (skill == 'computers') {
            skillTotals[role][skill] += this.skillModifierComputers;
          }
          if (skill == 'piloting') {
            skillTotals[role][skill] += this.skillModifierPiloting;
          }
        }
      }
      return skillTotals;
    },

    // computed continued...
    systemsDescription() {
      var desc = [];
      // sensors
      desc.push(
        this.sensors.id == 'none' ? 'no sensors' : this.sensors.name.toLowerCase() + ' sensors'
      );
      // crew quarters
      if (this.params.crewQuartersId !== 'none') {
        desc.push('crew quarters (' + this.crewQuarters.name.toLowerCase() + ')');
      }
      // armor
      if (this.params.armorId !== 'none') {
        var armorDesc = this.armor.name;
        if (this.params.armorMaterialId != 'none') {
          armorDesc +=
            ' (' + this.getItemById('specialMaterial', this.params.armorMaterialId).name + ')';
        }
        desc.push(armorDesc.toLowerCase());
      }
      // defences
      if (this.params.defensiveCountermeasuresId !== 'none') {
        var dcDesc = this.defensiveCountermeasures.name.toLowerCase();
        if (
          this.params.sourcesInUse.som &&
          this.params.defensiveCountermeasuresMaterialId != 'none'
        ) {
          dcDesc +=
            ' (' +
            this.getItemById(
              'specialMaterial',
              this.params.defensiveCountermeasuresMaterialId
            ).name.toLowerCase() +
            ')';
        }
        desc.push(dcDesc);
      }

      // computer
      var computerDesc =
        this.computerName.toLowerCase() + (this.computer.id == 'basic-computer' ? '' : ' computer');
      if (!this.params.sourcesInUse.dnd) {
        computerDesc += ' (tier ' + this.computerTier + ')';
      }

      desc.push(computerDesc);

      // network nodes
      // TODO: Change this to use networkNode.json
      if (this.params.sourcesInUse.som && this.isSupercolossal && this.networkNodes.ct > 0) {
        var networkNodeDesc = ('mk ' + this.networkNodes.name + ' network node').pluralise(
          this.networkNodes.ct
        );
        desc.push(networkNodeDesc + ' (' + this.networkNodes.ct + ')');
      }

      // algal shielding
      if (this.params.hasAlgalShielding) {
        desc.push('algal shielding');
      }
      // autodestruct
      if (this.params.hasAutoDestruct) {
        desc.push('autodestruct');
      }
      // colony ship framework
      if (this.params.hasColonyShipFramework) {
        desc.push('colony ship framework');
      }
      // consciousness uplink
      if (this.params.hasConsciousnessUplink) {
        desc.push('consciousness uplink drive');
      }
      // data net
      if (this.params.hasDataNet) {
        desc.push('data net');
      }
      // hive joining
      if (this.params.hasHiveJoining) {
        desc.push('hive joining');
      }
      // powersap
      if (this.params.hasPowersap) {
        desc.push('powersap');
      }
      // robotic appendage
      if (this.params.roboticAppendageId != 'none') {
        desc.push((this.roboticAppendage.name + ' robotic appendage').toLowerCase());
      }
      // root system
      if (this.params.hasRootSystem) {
        desc.push('root system');
      }
      // space station framework
      if (this.params.hasSpaceStationFramework) {
        desc.push('space station framework');
      }
      // training interface modules
      var ctTim = parseInt(this.params.ctTim);
      if (ctTim > 0) {
        desc.push((ctTim + ' &times; training interface module').pluralise(ctTim));
      }
      // virtual intelligence
      if (this.params.viId != 'none') {
        desc.push('virtual intelligence (tier ' + this.vi.name + ')');
      }
      // vi skill expander
      if (this.params.viSkillExpanderId != 'none') {
        desc.push(this.viSkillExpander.name.toLowerCase() + ' skill expander');
      }
      // vi holo projector
      if (this.params.viHoloProjectorId != 'none') {
        var viHoloDesc =
          this.viHoloProjector.name.toLowerCase() +
          ' holographic projector' +
          ' [' +
          this.viHoloProjectorSize.toLowerCase() +
          ']';
        desc.push(viHoloDesc);
      }
      // afterburners
      if (this.params.hasAfterburners) {
        desc.push('afterburners');
      }
      // captain's chair
      if (this.params.hasCaptainsChair) {
        desc.push("captain's chair");
      }
      // dead reckoner
      if (this.params.hasDeadReckoner) {
        desc.push('dead reckoner');
      }
      // radio array
      if (this.params.hasRadioArray) {
        desc.push('radio array');
      }
      // repair drones
      if (this.params.hasRepairDrones) {
        desc.push('repair drones');
      }
      // targeting optics
      if (this.params.hasTargetingOptics) {
        desc.push('targeting optics');
      }

      return desc.join(', ');
    },

    // computed continued...
    targetLock() {
      return (
        10 +
        this.defensiveCountermeasuresBonus +
        this.sizeCategory.acAndTlModifier +
        this.armorTLMod +
        this.pilotingRanks +
        this.ablativeArmor.tlMod +
        this.deflectorShield.bonusToTl
      );
    },

    // computed continued...
    tempHp() {
      return this.ablativeArmor.tempHp;
    },

    // computed continued...
    thrusters() {
      var thrusters = cloneObject(this.getItemById('thrusters', this.params.thrustersId));

      // space station framework
      if (this.params.hasSpaceStationFramework) {
        var speed = Math.floor(thrusters.speed * 0.25);
        thrusters.speed = speed < 1 ? 1 : speed;
      }

      // materials
      if (this.params.sourcesInUse.som) {
        switch (this.params.thrustersMaterialId) {
          case 'horacalcum':
            thrusters.speed++;
            if (thrusters.pilotingModifier < 0) {
              thrusters.pilotingModifier++;
            }
            thrusters.bpCost += 2;
            break;
          case 'inubrix':
            thrusters.bpCost += 1;
            break;
          default:
            break;
        }
      }

      return thrusters;
    },

    // computed continued...
    thrustersBooster() {
      var thrustersBooster = cloneObject(
        this.getItemById('thrusters', this.params.thrustersBoosterId)
      );

      if (this.params.sourcesInUse.som) {
        switch (this.params.thrustersBoosterMaterialId) {
          case 'horacalcum':
            thrustersBooster.speed++;
            if (thrustersBooster.pilotingModifier < 0) {
              thrustersBooster.pilotingModifier++;
            }
            thrustersBooster.bpCost += 2;
            break;
          case 'inubrix':
            thrustersBooster.bpCost += 1;
            break;
          default:
            break;
        }
      }

      thrustersBooster.speed = Math.floor(thrustersBooster.speed * 0.25);

      return thrustersBooster;
    },

    // computed continued...
    tier() {
      var tier = this.getItemById('tier', this.params.tierId);
      return tier;
    },

    // computed continued...
    timBpCost() {
      var ctTim = parseInt(this.params.ctTim);
      var ctTimAll = parseInt(this.params.ctTimAll);

      var cost = 2 * ctTim + 0.5 * (ctTim * ctTim + ctTim) + 3 * ctTimAll;

      return cost;
    },

    // computed continued...
    totalBpCost() {
      return (
        parseInt(this.ablativeArmor.bpCost) +
        (this.params.hasAlgalShielding ? 5 + 2 * this.sizeCategory.multiplier : 0) +
        parseInt(this.antiHackingSystems.bpCost) +
        parseInt(this.antiPersonnelWeaponBpCost) +
        parseInt(this.armorBpCost) +
        (this.params.hasAutoDestruct ? this.sizeCategory.multiplier : 0) +
        parseInt(this.biometricLocksBpCost) +
        (this.params.hasColonyShipFramework ? Math.floor(this.frame.bpCost * 0.25) : 0) +
        parseInt(this.computer.bpCost) +
        parseInt(this.computerCountermeasuresBpCost) +
        (this.params.hasConsciousnessUplink ? 4 : 0) +
        parseInt(this.customComponentBpTotal) +
        parseInt(this.crewQuarters.bpCost) +
        parseInt(this.dataNetBpCost) +
        parseInt(this.defensiveCountermeasuresBpCost) +
        (this.params.shieldType == 'deflector-shield' ? parseInt(this.deflectorShield.bpCost) : 0) +
        parseInt(this.driftEngineBpCost) +
        (this.params.hasEmergencyAccelerator ? 4 * this.sizeCategory.multiplier : 0) +
        parseInt(this.expansionBaysTotalBpCost) +
        parseInt(this.fortifiedHull.bpCost) +
        parseInt(this.frame.bpCost) +
        parseInt(this.hiveJoiningBpCost) +
        (this.params.hasHolographicMantle ? 12 : 0) +
        (this.isSupercolossal ? this.networkNodes.bpCost : 0) +
        parseInt(this.powerCoresBpCost) +
        (this.params.hasPowersap ? 3 * this.sizeCategory.multiplier : 0) +
        (this.params.hasReconfigurationSystem ? 30 : 0) +
        parseInt(this.reinforcedBulkhead.bpCost) +
        parseInt(this.roboticAppendage.bpCost) +
        (this.params.hasRootSystem ? 2 * this.sizeCategory.multiplier : 0) +
        (this.isSupercolossal ? this.secondaryComputer.bpCost : 0) +
        parseInt(this.selfDestructSystemBpCost) +
        parseInt(this.sensorsBpCost) +
        (this.params.shieldType == 'shields' ? parseInt(this.shields.bpCost) : 0) +
        (this.params.hasSpaceStationFramework ? Math.floor(this.frame.bpCost * 0.2) : 0) +
        parseInt(this.thrusters.bpCost) +
        (this.hasBoosterThrusterHousing ? parseInt(this.thrustersBooster.bpCost) : 0) +
        this.timBpCost +
        this.vi.bpCost +
        (this.params.viId != 'none' ? this.viHoloProjector.bpCost : 0) +
        (this.params.viId != 'none' ? this.viSkillExpander.bpCost : 0) +
        parseInt(this.weaponsTotalCosts.weaponsBp) +
        parseInt(this.weaponsTotalCosts.weaponMountsBp) +
        parseInt(this.weaponsTotalCosts.weaponMaterialsBp) +
        parseInt(this.weaponsTotalCosts.weaponLinksBp) +
        (this.params.hasAfterburners ? 2 : 0) +
        (this.params.hasCaptainsChair ? 2 : 0) +
        (this.params.hasDeadReckoner ? 2 : 0) +
        (this.params.hasRadioArray ? 1 : 0) +
        (this.params.hasRepairDrones ? 10 : 0) +
        (this.params.hasTargetingOptics ? 2 : 0)
      );
    },

    // computed continued...
    totalPcuCost() {
      return {
        essential:
          this.thrusters.pcuCost +
          (this.hasBoosterThrusterHousing ? this.thrustersBooster.pcuCost : 0) +
          this.defensiveCountermeasuresPcuCost +
          (this.params.shieldType == 'shields' ? this.shields.pcuCost : 0) +
          (this.params.shieldType == 'deflector-shield' ? this.deflectorShield.pcuCost : 0) +
          this.weaponsTotalCosts.weaponsPcu +
          parseInt(this.customComponentPcuTotal.essential) +
          (this.params.hasEmergencyAccelerator ? 5 : 0),
        nonEssential:
          this.computer.pcuCost +
          (this.isSupercolossal ? this.secondaryComputer.pcuCost : 0) +
          this.expansionBaysTotalPcuCost +
          this.dataNetPcuCost +
          parseInt(this.customComponentPcuTotal.nonEssential) +
          (this.params.hasHolographicMantle ? 10 : 0) +
          (this.params.hasReconfigurationSystem ? 50 : 0) +
          (this.params.hasRootSystem ? 5 : 0) +
          (this.isSupercolossal ? this.networkNodes.bpCost : 0) +
          (this.params.hasAfterburners ? 2 : 0) +
          (this.params.hasDeadReckoner ? 2 : 0) +
          (this.params.hasRadioArray ? 1 : 0) +
          (this.params.hasRepairDrones ? 5 : 0) +
          (this.params.hasTargetingOptics ? 2 : 0),
      };
    },

    // computed continued...
    turn() {
      return (
        this.maneuverabilityRating.turn +
        this.armorTurnDistanceMod +
        this.ablativeArmor.turnMod +
        Math.ceil(this.ctExternalExpansionBays / 3)
      );
    },

    // computed continued...
    vi() {
      var vi = this.getItemById('vi', this.params.viId);
      // console.log('vi', vi);
      return vi;
    },

    // computed continued...
    viCrewDescription() {
      if (this.params.viId == 'none') return '';

      var vi = this.getItemById('vi', this.params.viId);
      if (!vi) return '';

      var that = this;
      var desc = [];

      var viSkillIds = ['bluff', 'computers', 'engineering', 'gunnery', 'piloting', 'sense-motive'];

      viSkillIds.forEach(function (skillId) {
        var ranks = skillId == 'gunnery' ? 0 : vi.value;
        var modifier = skillId == 'gunnery' ? vi.gunneryMod : vi.skillMod - vi.value;
        desc.push(that.getSkillDesc(skillId, { ranks: ranks, modifier: modifier }));
      });

      return desc.join(', ');
    },

    // computed continued...
    viHoloProjector() {
      var viHoloProjector = this.getItemById('viHoloProjector', this.params.viHoloProjectorId);
      return viHoloProjector;
    },

    // computed continued...
    viHoloProjectorSize() {
      if (this.params.viHoloProjectorId == 'none') return 'n/a';

      var size = this.viHoloProjector.sizeMultiplier;
      if (this.sizeCategory.multiplier < this.viHoloProjector.sizeMultiplier) {
        size = this.sizeCategory.multiplier;
      }

      var viHoloProjSizeCategory = this.getItemByKey('sizeCategory', 'multiplier', size);

      if (viHoloProjSizeCategory === undefined) return 'n/a';
      if (viHoloProjSizeCategory.name === undefined) return 'n/a';

      return viHoloProjSizeCategory.name;
    },

    // computed continued...
    viSkillExpander() {
      var viSkillExpander = this.getItemById('viSkillExpander', this.params.viSkillExpanderId);
      return viSkillExpander;
    },

    // computed continued...
    weaponDescriptions() {
      var desc = {};

      for (var position in this.weaponMounts) {
        var positionDesc = [];
        for (var i in this.weaponMounts[position]) {
          var mount = this.weaponMounts[position][i];
          var prevI = parseInt(i) - 1;
          var mountDesc = '';

          // if this is the second of a linked set, skip this mount
          if (
            isset(this.weaponMounts[position][prevI]) &&
            this.weaponMounts[position][prevI].isLinked
          ) {
            continue;
          }

          // get description
          if (mount.weapon.id == 'none') continue;

          var specialMaterial = this.getItemById('specialMaterial', mount.specialMaterial);
          var weaponName = (
            (specialMaterial.id == 'none' ? '' : specialMaterial.name + ' ') + mount.weapon.name
          ).toLowerCase();

          // weapon name
          if (mount.isLinked) {
            mountDesc = 'linked ' + weaponName.pluralise(2);
          } else {
            mountDesc = weaponName;
          }

          // properties (damage, range, special properties, special properties)
          var properties = [];
          properties.push(this.getWeaponDamage(mount));
          properties.push(this.getWeaponRangeNumerical(mount.weapon));
          if (mount.weapon.specialProperties.length > 0)
            properties = properties.concat(
              this.getNamesFromIds(
                'weaponSpecialProperty',
                mount.weapon.specialProperties,
                ''
              ).toLowerCase()
            );
          if (mount.materialDesc) properties.push(mount.materialDesc.toLowerCase());
          mountDesc += ' (' + properties.join(', ') + ')';

          positionDesc.push(mountDesc);
        }
        if (positionDesc.length > 0) {
          desc[position] = positionDesc.join(', ');
        }
      }
      return desc;
    },

    // computed continued...
    weaponMounts() {
      var weaponMounts = {};
      for (var position in this.params.weaponMounts) {
        weaponMounts[position] = [];
        for (var i in this.params.weaponMounts[position]) {
          var params = cloneObject(this.params.weaponMounts[position][i]);
          params.weapon = this.getItemById('shipWeapon', params.weaponId);
          params.position = position;
          params.sizeCategoryId = this.sizeCategory.id;
          var mountObj = new WeaponMount(params);
          var weaponObj = this.getItemById('shipWeapon', mountObj.weaponId);
          weaponMounts[position][i] = {
            weight: params.weight,
            mountBpCost: mountObj.getCost(),
            weapon: this.getItemById('shipWeapon', params.weaponId),
            canBeUpgraded: this.canWeaponMountBeUpgraded(position, params.weight),
            canBeDowngraded: this.canWeaponMountBeDowngraded(
              params.weight,
              params.isFromTemplate,
              params.templateWeight
            ),
            isFromTemplate: params.isFromTemplate,
            isLinked: params.isLinked,
            specialMaterial: params.specialMaterial,
            linkCost: params.isLinked ? Math.floor(weaponObj.bpCost * 0.5) : 0,
            materialCost: mountObj.getMaterialCost(),
            materialDesc: mountObj.getMaterialDesc(),
            bpCost: params.hasOrbitalDiscount
              ? Math.floor(params.weapon.bpCost / 3)
              : params.weapon.bpCost,
          };
        }
      }
      return weaponMounts;
    },

    weaponsTotalCosts() {
      var totals = {
        weaponLinksBp: 0,
        weaponMountsBp: 0,
        weaponsBp: 0,
        weaponsPcu: 0,
        weaponMaterialsBp: 0,
      };
      for (var position in this.weaponMounts) {
        for (var i in this.weaponMounts[position]) {
          var mount = this.weaponMounts[position][i];
          totals.weaponMountsBp += mount.mountBpCost;
          totals.weaponsBp += mount.bpCost;
          totals.weaponsPcu += mount.weapon.pcuCost;
          totals.weaponLinksBp += mount.linkCost;
          totals.weaponMaterialsBp += mount.materialCost;
        }
      }
      return totals;
    },
  },
  /*
  |----------------------------------------------------------------------------------
  |  METHODS
  |----------------------------------------------------------------------------------
  */
  methods: {
    addCustomFrameMount(position) {
      if (!isset(this.params.customFrame.mounts[position]))
        this.params.customFrame.mounts[position] = [];
      this.params.customFrame.mounts[position].push('light');
      this.setWeaponMounts(this.frame.mounts);
    },

    // methods continued...
    adjustPowerCores(countHousings) {
      var that = this;

      var params = ['powerCoreIds', 'powerCoreSpecialMaterials'];

      params.forEach(function (param) {
        if (that.params[param].length < countHousings) {
          for (var i = that.params[param].length; i < countHousings; i++) {
            that.params[param][i] = 'none';
          }
        } else if (that.params[param].length > countHousings) {
          var splicePos = countHousings;
          var spliceLen = that.params[param].length - countHousings;
          that.params[param].splice(splicePos, spliceLen);
        }
      });
    },

    // methods continued...
    canWeaponMountBeCreated(position) {
      var result = true;
      var countMountsInPosition = this.params.weaponMounts[position].length;
      if (countMountsInPosition >= this.sizeCategory.maxMounts) {
        result = false;
      }
      return result;
    },

    // methods continued...
    canWeaponMountBeDowngraded(weight, isFromTemplate, templateWeight) {
      var result = true;
      if (weight == 'light') {
        result = false;
      } else {
        var weights = {
          heavy: 1,
          capital: 2,
        };
        if (isFromTemplate) {
          if (weight == templateWeight) {
            result = false;
          }
        }
      }
      return result;
    },

    // methods continued...
    canWeaponMountBeUpgraded(position, weight) {
      var result = true;
      var weights = { light: 0, heavy: 1, capital: 2 };
      // check weight
      // Heavy weapon mounts can only appear on a Medium or larger ship,
      // capital weapon mounts can only appear on a Huge or larger ship.
      if (weights[weight] >= weights[this.sizeCategory.maxMountWeight]) {
        result = false;
      } else {
        if (position == 'turret') {
          if (weight !== 'light') {
            result = false;
          }
        } else {
          if (weight == 'capital') {
            result = false;
          }
        }
      }
      return result;
    },

    // methods continued...
    clearAll() {
      this.params = cloneObject(this.paramsReset);
      this.json = '';
      document.getElementById('sampleShipSelect').value = 'none';
    },

    // methods continued...
    clearWeaponMounts() {
      for (var position in this.params.weaponMounts) {
        // var mountList = this.params.weaponMounts[position];
        this.params.weaponMounts[position].splice(0, this.params.weaponMounts[position].length); // start, deleteCount
      }
      // console.log(this.params.weaponMounts);
    },

    // methods continued...
    convertJsonInput() {
      // Retain D&D if currently checked
      var fixDnd = this.params.sourcesInUse?.dnd;

      // read JSON
      this.params = JSON.parse(this.json);

      // or set D&D if the incoming params have D&D set
      fixDnd |= this.params.sourcesInUse?.dnd;

      // do any fix up for D&D
      if (fixDnd) {
        this.fixDndParams();
      }

      this.fixMissingParamsValues();
    },

    // methods continued...
    createCustomComponent() {
      // initialise on older builds
      if (!isset(this.params.customComponents)) {
        this.params['customComponents'] = [];
      }

      this.params.customComponents.push({
        name: '',
        notes: '',
        isEssential: false,
        pcuCost: 0,
        bpCost: 0,
      });

      return;
    },

    // methods continued...
    createWeaponMount(position) {
      var newMount = {
        weaponId: 'none',
        weight: 'light',
        isFromTemplate: false,
        canBeLinked: false,
        isLinked: false,
        canHaveOrbitalDiscount: false,
        hasOrbitalDiscount: false,
        specialMaterial: 'none',
      };
      this.params.weaponMounts[position].push(newMount);
    },

    // methods continued...
    destroyWeaponMount(position, i) {
      this.params.weaponMounts[position].splice(i, 1); // start, deleteCount
      this.setWeaponLinking(position);
    },

    // methods continued...
    doesNextMountHaveSameWeaponId(position, i) {
      var result = false;
      var nextI = parseInt(i) + 1;
      var mounts = this.params.weaponMounts[position];
      if (
        isset(this.params.weaponMounts[position][nextI]) &&
        mounts[i].weaponId == mounts[nextI].weaponId
      ) {
        result = true;
      }
      return result;
    },

    // methods continued...
    downgradeWeaponMount(position, i) {
      var weaponMount = this.params.weaponMounts[position][i];
      if (weaponMount.weight == 'capital') {
        weaponMount.weight = 'heavy';
      } else {
        weaponMount.weight = 'light';
      }
      weaponMount.weaponId = 'none';
      this.setWeaponLinking(position);
    },

    // methods continued...
    fixDndComputers(computer) {
      // the mononode for each Mk is overridden with name, bonus, and nodes for 5e.
      var id = this.params[computer];

      // console.log(`original ${computer}: ${id}`);
      id = id.replace(/duo|tri|tetra/, 'mono');

      // the 5e mononodes are 1, 5, and 8, so drop down to the one with a matching bonus
      if (computer == 'dedicatedComputerId') {
        id = id.replace(/2|3|4/, '1'); // +1
        id = id.replace(/6|7/, '5'); // +2
        id = id.replace(/9|10/, '8'); // +3
      }

      // console.log(`new ${computer}: ${id}`);
      this.params[computer] = id;
    },

    // methods continued...
    fixDndParams() {
      // make sure the dnd keys are present
      var keys = [
        'sourcesInUse',
        'computerId',
        'secondaryComputerId',
        'dedicatedComputerId',
        'hasAfterburners',
        'hasCaptainsChair',
        'hasDeadReckoner',
        'hasRadioArray',
        'hasRepairDrones',
        'hasTargetingOptics',
      ];
      for (var i in keys) {
        console.log(keys[i]);
        if (!isset(this.params[keys[i]])) {
          this.params[keys[i]] = cloneObject(this.paramsReset[keys[i]]);
        }
      }

      // make sure the dnd box is checked
      this.params.sourcesInUse.dnd = true;

      // fix computers for dnd
      var computers = ['computerId', 'secondaryComputerId', 'dedicatedComputerId'];
      for (var i in computers) {
        this.fixDndComputers(computers[i]);
      }
    },

    // methods continued...
    fixMissingCrewSkills() {
      for (var roleId in this.paramsReset.crewSkills) {
        // if role is missing, add it
        if (!isset(this.params.crewSkills[roleId])) {
          // console.log('Missing crew role, ' + roleId + ', added to ship');
          this.params.crewSkills[roleId] = cloneObject(this.paramsReset.crewSkills[roleId]);
          // continue;
        }

        for (var skillId in this.paramsReset.crewSkills[roleId].skills) {
          // if skill is missing, add it
          if (!isset(this.params.crewSkills[roleId].skills[skillId])) {
            // console.log(
            //   'Missing skill, ' + skillId + ', in crew role, ' + roleId + ', added to ship'
            // );
            this.params.crewSkills[roleId].skills[skillId] = cloneObject(
              this.paramsReset.crewSkills[roleId].skills[skillId]
            );
          }
          if (this.params.sourcesInUse.dnd) {
            // make sure D&D proficiency and expertise are set
            if (!isset(this.params.crewSkills[roleId].skills[skillId].hasProficiency)) {
              this.params.crewSkills[roleId].skills[skillId].hasProficiency =
                this.paramsReset.crewSkills[roleId].skills[skillId].hasProficiency;
            }
            if (!isset(this.params.crewSkills[roleId].skills[skillId].hasExpertise)) {
              this.params.crewSkills[roleId].skills[skillId].hasExpertise =
                this.paramsReset.crewSkills[roleId].skills[skillId].hasExpertise;
            }
          } else {
            this.params.crewSkills[roleId].skills[skillId].ranks = this.skillRanks;
          }
          this.params.crewSkills[roleId].skills[skillId].modifier = this.skillMod;
        }
        // console.log(this.params.crewSkills[roleId].skills[skillId]);
      }
      return;
    },

    // methods continued...
    fixMissingParamsValues() {
      var that = this;

      for (var key in this.paramsReset) {
        // crew positions
        if (key == 'crewSkills') this.fixMissingCrewSkills();

        // weapons (special material)
        var missingWeaponMountParams = [
          { id: 'specialMaterial', default: 'none' },
          { id: 'hasOrbitalDiscount', default: false },
        ];
        if (key == 'weaponMounts' && isset(this.params.weaponMounts)) {
          for (var position in this.params.weaponMounts) {
            for (var i in this.params.weaponMounts[position]) {
              missingWeaponMountParams.forEach(function (param) {
                if (isset(that.params.weaponMounts[position][i][param.id])) return;
                that.params.weaponMounts[position][i][param.id] = param.default;
                // console.log(
                //   'Missing property, ' +
                //     param.id +
                //     ', added to ' +
                //     position +
                //     ' weapon mount ' +
                //     (parseInt(i) + 1)
                // );
              });
            }
          }
        }

        if (isset(this.params[key])) continue;

        // console.log('Missing property, ' + key + ', added to ship');
        this.params[key] = cloneObject(this.paramsReset[key]);

        // power core special materials
        if (key == 'powerCoreSpecialMaterials') {
          this.params.powerCoreSpecialMaterials = [];
          for (var i in this.params.powerCoreIds) {
            this.params.powerCoreSpecialMaterials.push('none');
          }
        }

        // shields by position
        if (key == 'shieldsByPosition') {
          // this.setDefaultShieldsByPosition();
          this.setDefaultPositionDependentValues('shields', 'totalSp');
        }

        // convert legacy armour to armor
        if (key == 'armorId' && isset(this.params.armourId)) {
          this.params.armorId = this.params.armourId;
          delete this.params.armourId;
        }
      }
    },

    // methods continued...
    getExpansionBayBpCost(bay) {
      // Quantum defender
      if (bay.id == 'quantum-defender') {
        var bpCost = 4 * this.sizeCategory.multiplier;
        return bpCost < 10 ? 10 : bpCost;
      }

      // everything else
      return bay.bpCost;
    },

    // methods continued...
    getExpansionBayPcuCost(bay) {
      // Quantum defender
      if (bay.id == 'quantum-defender') {
        var pcuCost = 5 * this.sizeCategory.multiplier;
        return pcuCost < 20 ? 20 : pcuCost;
      }

      // everything else
      return bay.pcuCost;
    },

    // methods continued...
    getFrameMountWeaponWeight(position, index) {
      return this.frame.mounts[position][index];
    },

    // methods continued...
    getItemById(prop, id) {
      // console.log(prop, id);
      this.testThatPropExists(prop);
      // find item
      var item = this.data[prop].data.find(function (item) {
        return item.id === id;
      });
      // test that item exists
      if (typeof item === 'undefined') {
        console.log('There is no item ' + prop + ' that matches id ' + id);
        item = this.data[prop].data.find(function (item) {
          return item.id === 'none';
        });
      }
      return item;
    },

    // methods continued...
    getItemByKey(prop, key, val) {
      this.testThatPropExists(prop);

      // find item
      var item = this.data[prop].data.find(function (item) {
        return item[key] === val;
      });

      // test that item exists
      if (typeof item === 'undefined') {
        console.log('There is no item ' + prop + ' that matches ' + key + ': ' + val);
        item = this.data[prop].data.find(function (item) {
          return item.id === 'none';
        });
      }
      return item;
    },

    // methods continued...
    getNamesFromIds(prop, ids, emptyString) {
      if (!ids || ids.length == 0) return emptyString ? emptyString : '';

      var that = this;

      var names = [];
      ids.forEach(function (id) {
        var obj = that.getItemById(prop, id);
        names.push(obj.name);
      });

      return names.join(', ');
    },

    /*
    |------------------------------------------------------------------------------
    | getPowerCoreOptionName
    |------------------------------------------------------------------------------
    | e.g. None, Titan Light (PCU 700, Supercolossal), Nova Light (PCU 400, Large - Colossal)
    |------------------------------------------------------------------------------
    */
    // methods continued...
    getPowerCoreOptionName(option) {
      if (option.id == 'none') return 'None';

      var name = option.name + ' (PCU ' + option.pcuBudget + ', ';

      if (option.sizes.length > 1) {
        name += option.sizes[0] + ' &ndash; ' + option.sizes[option.sizes.length - 1];
      } else {
        name += option.sizes[0];
      }

      name += ')';

      return name;
    },
    /*
    |------------------------------------------------------------------------------
    | getPowerCoreOptions
    |------------------------------------------------------------------------------
    */
    // methods continued...
    getPowerCoreOptions(index) {
      if (this.params.powerCoreIds[index] === undefined) {
        return [this.getItemById('powerCore', 'none')];
      }

      var options = [];

      // Don't worry about rules
      if (!this.params.isUseStrictRules) return this.selectOptions.powerCore;

      // Supercolossal frame
      if (this.frame.size == 'Supercolossal') {
        return this.getPowerCoreOptionsForSupercolossal(index);

        // non-Supercolossal frame
      } else {
        var that = this;
        this.selectOptions.powerCore.forEach(function (option) {
          if (option.sizes.indexOf(that.frame.size) > -1) options.push(option);
        });

        return options;
      }

      return;
    },

    // methods continued...
    getPowerCoreOptionsForSupercolossal(index) {
      var options = [];

      // If ship doesn't have a supercolossal power core
      if (!this.hasSupercolossalPowerCore) {
        // add only colossal and supercolossal options
        this.selectOptions.powerCore.forEach(function (option) {
          if (option.sizes.includes('Colossal') || option.sizes.includes('Supercolossal'))
            options.push(option);
        });

        return options;
      }

      // We know ship has a supercolossal power core

      // check if this index is the SC power core
      if (this.powerCores[index].sizes[0] == 'Supercolossal') {
        // add only colossal and supercolossal options
        this.selectOptions.powerCore.forEach(function (option) {
          if (option.sizes.includes('Colossal') || option.sizes.includes('Supercolossal'))
            options.push(option);
        });

        return options;
      }

      // We know this is not the SC power core

      // add only huge or gargantuan
      this.selectOptions.powerCore.forEach(function (option) {
        if (option.sizes.includes('Huge') || option.sizes.includes('Gargantuan'))
          options.push(option);
      });

      return options;
    },
    /*
    |------------------------------------------------------------------------------
    | getPowerCoreSizeMultipliers
    |------------------------------------------------------------------------------
    | Turns a power core's list of size names ["Tiny", "Small", "Medium", ...]
    | into a list of numbers [0, 1, 2, ...]
    |------------------------------------------------------------------------------
    // methods continued...
    getPowerCoreSizeMultipliers(powerCore) {
      if (powerCore.sizes === undefined) return [];

      var multipliers = [];

      var that = this;

      powerCore.sizes.forEach(function(size) {
        var sizeCategory = that.getItemById("sizeCategory", size);
        if (sizeCategory.multiplier === undefined) return;
        multipliers[] = sizeCategory.multiplier;
      });

      return multipliers;
    },
    */

    // methods continued...
    getPrefixedModifier(val) {
      var prefix = val >= 0 ? '+' : '';
      return prefix + val;
    },

    // methods continued...
    getSampleShipOptionName(option) {
      var frame = {};
      if (option.params.frameId == 'custom') {
        frame = option.params.customFrame;
      } else {
        frame = this.getItemById('frame', option.params.frameId);
      }
      var size = this.getItemById('sizeCategory', frame.size);

      var listItem;
      if (this.selectSampleShipSortOrder == 'name') {
        listItem = `${option.name} - Tier ${option.tier} - ${size.name} ${frame.name}`;
      } else if (this.selectSampleShipSortOrder == 'size') {
        listItem = `${size.name} ${frame.name} - Tier ${option.tier} - ${option.name}`;
      } else {
        listItem = `Tier ${option.tier} - ${size.name} ${frame.name} - ${option.name}`;
      }
      // console.log(listItem);
      return listItem;
    },

    // methods continued...
    getSelectOptionsFor(prop) {
      this.testThatPropExists(prop);
      this.testThatPropIsArray(prop);
      for (var item in this.data[prop].data) {
        this.testThatItemHasId(prop, item);
        this.testThatItemHasName(prop, item);
      }
      return this.data[prop].data;
    },

    /*
    |------------------------------------------------------------------------------
    | getSkillDesc
    |------------------------------------------------------------------------------
    | Expects a valid skillId
    | Expects an object in the form { ranks: 1, modifier: 4 }
    | Returns string in the form "Piloting + 5 (1 rank)" or "gunnery +4"
    |------------------------------------------------------------------------------
    */
    // methods continued...
    getSkillDesc(skillId, skill) {
      // console.log(skillId, skill);

      var skillInfo = this.getItemById('skill', skillId);
      if (!skillInfo) return '';

      // name
      if (this.params.sourcesInUse.dnd) {
        var desc = skillInfo.dnd.name + ' ';
      } else {
        var desc = skillInfo.name + ' ';
      }

      // modifier
      var modifier = parseInt(skill.modifier);
      if (this.params.sourcesInUse.dnd) {
        if (skill.hasProficiency) {
          modifier += this.skillProficiency;
        }
        if (skill.hasExpertise) {
          modifier += this.skillProficiency;
        }
      } else {
        if (skillId != 'gunnery') {
          modifier += parseInt(skill.ranks);
        }
      }
      if (skillId == 'computers') {
        modifier += parseInt(this.skillModifierComputers);
      }
      if (skillId == 'piloting') {
        modifier += parseInt(this.skillModifierPiloting);
      }
      desc += this.getPrefixedModifier(modifier);

      // skill ranks
      if (!this.params.sourcesInUse.dnd) {
        if (skillId != 'gunnery') {
          desc += ' (' + skill.ranks + ' ' + 'rank'.pluralise(skill.ranks) + ')';
        }
      }

      return desc;
    },

    getSkillName(skillId) {
      var skillItem = this.getItemById('skill', skillId);
      if (this.params.sourcesInUse.dnd) {
        return skillItem.dnd.name;
      } else {
        return skillItem.name;
      }
    },

    // methods continued...
    getSumOfPropertyValuesInCollection(collection, property) {
      var total = 0;
      for (var i in collection) {
        total += collection[i][property];
      }
      return total;
    },

    // methods continued...
    getWeaponDamage(mount) {
      if (mount.weapon.damage == 'Special') return 'Special';

      var dice = stringToDice(mount.weapon.damage);
      if (dice === 'error') return 'error';

      // multiplier for linked weapons
      var mult = mount.isLinked ? 2 : 1;

      var result = '';
      result += mult * dice.ctDice;
      result += 'd' + dice.ctFaces;
      if (dice.mod > 0) result += '+' + mult * dice.mod;
      if (dice.mult > 1) result += '×' + dice.mult;

      return result;
    },

    // methods continued...
    getWeaponRangeNumerical(weapon) {
      if (weapon.range === undefined) return '';

      switch (weapon.range) {
        case 'Short':
          return '5 hexes';
          break;
        case 'Medium':
          return '10 hexes';
          break;
        case 'Long':
          return '20 hexes';
          break;
        default:
          return 'n/a';
      }

      return '';
    },

    // methods continued...
    initParams() {
      if (window.JTOStarshipSheetModel === undefined) {
        this.params = cloneObject(this.paramsReset);
      } else {
        this.params = cloneObject(window.JTOStarshipSheetModel);
      }
    },

    // methods continued...
    inputSampleShipParams() {
      var sampleShipSelect = document.getElementById('sampleShipSelect');
      var sampleShipId = sampleShipSelect.value;
      if (sampleShipId !== 'none') {
        var sampleShipObj = this.getItemById('sampleShip', sampleShipId);
        var sampleShipParams = cloneObject(sampleShipObj.params);

        // Retain D&D if currently checked
        var fixDnd = this.params.sourcesInUse?.dnd;

        // read sample ship
        this.params = sampleShipParams;

        // Set D&D if previously checked or in sample ship
        fixDnd |= this.params.sourcesInUse?.dnd;

        // fixup D&D parameters
        if (fixDnd) {
          this.fixDndParams();
        }
        this.fixMissingParamsValues();
      }
    },

    // methods continued...
    isCrewQuartersOptionAvailable(option) {
      if (!this.params.isUseStrictRules) return true;
      if (this.sizeCategory.multiplier == 1) {
        if (option.id == 'none') {
          return true;
        } else {
          return false;
        }
      } else {
        if (option.id == 'none') {
          return false;
        } else {
          return true;
        }
      }
      return false;
    },

    /*
    |------------------------------------------------------------------------------
    | selectOptions... methods 
    |------------------------------------------------------------------------------
    */
    // methods continued...
    selectOptionsShipWeapon(weaponType, weaponMount) {
      // console.log(
      //   'selectOptionsShipWeapon',
      //   weaponType,
      //   weaponMount,
      //   this.selectOptions.shipWeapon
      // );
      return this.selectOptions.shipWeapon.filter(
        (option) =>
          option.weaponType == weaponType &&
          (!this.params.isUseStrictRules || option.weight == weaponMount.weight)
      );
    },

    // methods continued...
    isOrbitalWeapon(weapon) {
      var isOrbital = false;
      weapon.specialProperties.forEach(function (prop) {
        if (isOrbital) return;
        if (prop.substr(0, 7) == 'orbital') isOrbital = true;
        return;
      });
      return isOrbital;
    },

    // methods continued...
    isWeaponMountLinked(position, i) {
      var result = false;
      if (
        isset(this.params.weaponMounts[position][i]) &&
        this.params.weaponMounts[position][i].isLinked === true
      ) {
        result = true;
      }
      return result;
    },

    // methods continued...
    maybeAdjustCtTim(paramName) {
      if (parseInt(this.params.ctTim) >= parseInt(this.params.ctTimAll)) return;

      if (paramName == 'ctTim') {
        this.params.ctTimAll = this.params.ctTim;
      }

      if (paramName == 'ctTimAll') {
        this.params.ctTim = this.params.ctTimAll;
      }

      return;
    },

    // methods continued...
    maybeCreateExpansionBays(targetCountBays) {
      for (var i = 0; i < targetCountBays; i++) {
        if (!isset(this.params.expansionBayIds[i])) {
          this.params.expansionBayIds[i] = 'none';
        }
      }
    },

    /*
    |------------------------------------------------------------------------------
    | maybeResetPowerCoreIds
    |------------------------------------------------------------------------------
    | This is called when a power core is changed
    | There's some complicated logic around supercolossal ships
    | This does some cross-checking to prevent illegal combinations of power cores
    |------------------------------------------------------------------------------
    */
    // methods continued...
    maybeResetPowerCoreIds(currentIndex) {
      if (this.frame.size != 'Supercolossal') return;

      var that = this;

      // for each power core
      this.params.powerCoreIds.forEach(function (id, index) {
        if (index == currentIndex) return;

        var powerCore = that.powerCores[index];

        if (that.hasSupercolossalPowerCore) {
          // if this is the supercolossal power core, then skip
          if (powerCore.sizes.includes('Supercolossal')) return;

          // otherwise
          // check that power core id is for huge or gargantuan ship
          // if not then reset
          if (!(powerCore.sizes.includes('Huge') || powerCore.sizes.includes('Gargantuan'))) {
            that.params.powerCoreIds[index] = 'none';
          }
        } else {
          // check that power core id is for colossal ship
          // if not then reset
          if (!powerCore.sizes.includes('Colossal')) {
            that.params.powerCoreIds[index] = 'none';
          }
        }
      });

      return;
    },

    // methods continued...
    popExcessExpansionBays(targetCountBays) {
      var countBays = this.params.expansionBayIds.length;
      if (countBays > targetCountBays) {
        for (var i = 0; i < countBays - targetCountBays; i++) {
          this.params.expansionBayIds.pop();
        }
      }
    },

    // methods continued...
    removeCustomComponent(index) {
      this.params.customComponents.splice(index, 1);
      return;
    },

    // methods continued...
    removeCustomFrameMount(position, index) {
      this.params.customFrame.mounts[position].splice(index, 1);
      if (!this.params.customFrame.mounts[position].length)
        this.$delete(this.params.customFrame.mounts, position);
      this.setWeaponMounts(this.frame.mounts);
    },

    // methods continued...
    resetCustomFrame() {
      this.setCustomFrame();
      this.updateFrame();
    },

    // methods continued...
    setCrewQuarters(frameSize) {
      if (frameSize == 'Tiny') {
        if (this.params.crewQuartersId !== 'none') {
          this.params.crewQuartersId = 'none';
        }
      } else {
        if (this.params.crewQuartersId == 'none') {
          this.params.crewQuartersId = 'common';
        }
      }
    },

    // methods continued...
    setCustomFrame() {
      this.params['customFrame'] = cloneObject(
        this.getItemById('frame', this.params.customFrameBaseId)
      );
    },

    // methods continued...
    setDefaultCrewSkillValues() {
      if (this.params.isSetDefaultCrewSkillValues) {
        var tier = this.getItemById('tier', this.params.tierId).value;
        if (tier < 1) {
          tier = 1;
        }
        for (var role in this.params.crewSkills) {
          for (var skill in this.params.crewSkills[role].skills) {
            var skillObj = this.params.crewSkills[role].skills[skill];
            if (skillObj.ranks > 0) {
              skillObj.ranks = tier;
            }
          }
        }
      }
    },

    // methods continued...
    setDefaultPositionDependentValues(param, key) {
      // test that computed param exists
      if (!isset(this[param])) {
        console.log('Missing computed param: ' + param);
        return;
      }

      // test that computed param resource key exists
      if (!isset(this[param][key])) {
        console.log('Missing key in ' + param + ': ' + key);
        return;
      }

      // test that [param] by position exists
      if (!isset(this.params[param + 'ByPosition'])) {
        console.log('Missing param: ' + param + 'ByPosition');
        return;
      }

      var total = this[param][key];
      var positions = [];
      for (var position in this.params[param + 'ByPosition']) {
        positions.push(position);
        this.params[param + 'ByPosition'][position] = 0;
      }
      var positionIndex = 0;
      while (total > 0) {
        this.params[param + 'ByPosition'][positions[positionIndex]]++;
        total--;
        if (positionIndex == positions.length - 1) {
          positionIndex = 0;
        } else {
          positionIndex++;
        }
      }
    },
    /*
    |------------------------------------------------------------------------------
    | setPowerCores
    |------------------------------------------------------------------------------
    | When a new frame is selected, need to check that existing power cores match new
    | options in select
    |------------------------------------------------------------------------------
    */
    // methods continued...
    setPowerCores() {
      if (this.frame.size == 'Supercolossal') {
        this.setPowerCoresForSupercolossal();
        return;
      }

      for (var index = 0; index < this.countPowerCoreHousings; index++) {
        // 1. powerCoreId doesn't exist
        if (this.params.powerCoreIds[index] === undefined) {
          this.params.powerCoreIds[index] = 'none';
          continue;
        }

        // 2. powerCoreId exists but is invalid
        var powerCore = this.getItemById('powerCore', this.params.powerCoreIds[index]);
        if (!powerCore.sizes.includes(this.sizeCategory.name)) {
          this.params.powerCoreIds[index] = 'none';
          continue;
        }
      }

      return;
    },

    // methods continued...
    setComputer() {
      if (this.frame.size != 'Supercolossal') return;
      if (this.computerBonus < 4) this.params.computerId = 'mk-4-mononode';
    },

    // methods continued...
    setNetworkNode() {
      if (this.frame.size != 'Supercolossal') {
        this.params.ctNetworkNodes == 0;
        return;
      }
    },

    // methods continued...
    setPowerCoresForSupercolossal() {
      for (var index = 0; index < this.countPowerCoreHousings; index++) {
        // 1. powerCoreId doesn't exist
        if (this.params.powerCoreIds[index] === undefined) {
          this.params.powerCoreIds[index] = 'none';
          continue;
        }

        var powerCore = this.getItemById('powerCore', this.params.powerCoreIds[index]);

        // If ship doesn't have a supercolossal power core
        if (!this.hasSupercolossalPowerCore) {
          // add only colossal and supercolossal options
          if (
            !(powerCore.sizes.includes('Colossal') || powerCore.sizes.includes('Supercolossal'))
          ) {
            this.params.powerCoreIds[index] = 'none';
          }

          continue;
        }

        // We know ship has a supercolossal power core

        // check if this index is the SC power core
        if (powerCore.sizes[0] == 'Supercolossal') {
          // add only colossal and supercolossal options
          if (
            !(powerCore.sizes.includes('Colossal') || powerCore.sizes.includes('Supercolossal'))
          ) {
            this.params.powerCoreIds[index] = 'none';
          }

          continue;
        }

        // We know this is not the SC power core

        // add only huge or gargantuan
        if (!(powerCore.sizes.includes('Huge') || powerCore.sizes.includes('Gargantuan'))) {
          this.params.powerCoreIds[index] = 'none';
        }

        continue;
      }

      return;
    },

    // methods continued...
    setWeaponLinking(position) {
      var mounts = this.params.weaponMounts[position];
      for (var i in mounts) {
        if (
          mounts[i].weaponId !== 'none' &&
          !this.isWeaponMountLinked(position, i - 1) &&
          !this.isWeaponMountLinked(position, parseInt(i) + 1) &&
          this.doesNextMountHaveSameWeaponId(position, i)
        ) {
          mounts[i].canBeLinked = true;
        } else {
          mounts[i].canBeLinked = false;
          mounts[i].isLinked = false;
        }
      }
    },

    // methods continued...
    setWeaponMounts(mounts) {
      this.clearWeaponMounts();

      var arcs = ['forward', 'aft', 'port', 'starboard', 'turret', 'spinal'];

      for (var arcIndex in arcs) {
        var arc = arcs[arcIndex];

        if (!isset(mounts[arc])) continue;

        var arcMounts = mounts[arc];

        for (var mountIndex in arcMounts) {
          var mountWeight = arcMounts[mountIndex];

          var objMount = {
            weaponId: 'none',
            weight: mountWeight,
            templateWeight: mountWeight,
            isFromTemplate: true,
            canBeLinked: false,
            isLinked: false,
            canHaveOrbitalDiscount: false,
            hasOrbitalDiscount: false,
            specialMaterial: 'none',
          };

          this.params.weaponMounts[arc].push(objMount);
        }
      }
    },
    /*
    syncExpansionBays( targetCountBays ) {
      this.popExcessExpansionBays( targetCountBays );
      this.maybeCreateExpansionBays(  targetCountBays );
    },
    */

    // methods continued...
    testThatItemHasId(prop, item) {
      if (!isset(this.data[prop].data[item].id)) {
        throw 'Property ' + prop + '[' + item + '] does not have an id';
      }
    },

    // methods continued...
    testThatItemHasName(prop, item) {
      if (!isset(this.data[prop].data[item].name)) {
        throw 'Property ' + prop + '[' + item + '] does not have a name';
      }
    },

    // methods continued...
    testThatPropExists(prop) {
      if (!isset(this.data[prop])) {
        throw 'Property ' + prop + ' does not exist';
      }
    },

    // methods continued...
    testThatPropIsArray(prop) {
      if (typeof this.data[prop].data !== 'object') {
        throw 'Property ' + prop + ' is not an array';
      }
    },

    // methods continued...
    updateFrame() {
      // this.syncExpansionBays( this.frame.expansionBays );
      this.setCrewQuarters(this.frame.size);
      this.setWeaponMounts(this.frame.mounts);
      this.setPowerCores();
      this.setComputer();
      this.setNetworkNode();
    },

    // methods continued...
    upgradeWeaponMount(position, i) {
      var weaponMount = this.params.weaponMounts[position][i];
      if (weaponMount.weight == 'light') {
        weaponMount.weight = 'heavy';
      } else {
        weaponMount.weight = 'capital';
      }
      weaponMount.weaponId = 'none';
      weaponMount.isLinked = false;
      this.setWeaponLinking(position);
    },

    // methods continued...
    logger() {
      for (let i = 0; i < arguments.length; i++) {
        console.log(arguments[i]);
      }
    },
  },

  /*
  |----------------------------------------------------------------------------------
  |  BEFORE MOUNT
  |----------------------------------------------------------------------------------
  */
  beforeMount() {
    this.initParams();
  },
};

/*
|------------------------------------------------------------------------------------------
| STRING PROTOTYPES (couldn't figure out how to export and import these)
|------------------------------------------------------------------------------------------
*/
String.prototype.pluralise = function (count) {
  return this + (count == 1 ? '' : 's');
};

String.prototype.toTitleCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
