import shipData from '../data/ship-builder.json';

var WEAPON_SORT = {
  forwardArc: 0,
  portArc: 1,
  starboardArc: 2,
  aftArc: 3,
  turret: 4,
  spinal: 5,
};

var WEAPON_ARCS = ['forward', 'aft', 'port', 'starboard'];
/*
|------------------------------------------------------------------------------------------
| HELPERS
|------------------------------------------------------------------------------------------
*/
function maybeCreateProperty(obj, prop, type) {
  if (typeof obj !== 'object') {
    throw 'Not an object';
  }
  if (typeof obj[prop] === 'undefined') {
    switch (type) {
      case 'Array':
        obj[prop] = [];
        break;
      case 'String':
        obj[prop] = '';
        break;
      case 'Integer':
        obj[prop] = 0;
        break;
      case 'Object':
      default:
        obj[prop] = {};
    }
  }
}
/*
|------------------------------------------------------------------------------------------
*/
function isset(obj) {
  if (typeof obj === 'undefined') {
    return false;
  }
  return true;
}
/*
|------------------------------------------------------------------------------------------
*/
function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}
/*
|------------------------------------------------------------------------------------------
*/
function integerToWord(int) {
  var word = '';
  switch (int) {
    case 1:
      word = 'one';
      break;
    case 2:
      word = 'two';
      break;
    case 3:
      word = 'three';
      break;
    case 4:
      word = 'four';
      break;
    case 5:
      word = 'five';
      break;
    case 6:
      word = 'six';
      break;
    case 7:
      word = 'seven';
      break;
    case 8:
      word = 'eight';
      break;
    case 9:
      word = 'nine';
      break;
    case 10:
      word = 'ten';
      break;
    default:
      word = 'error';
  }
  return word;
}
/*
|------------------------------------------------------------------------------------------
| stringToFloat
|------------------------------------------------------------------------------------------
| expected values: 1, "1", "1/3"
| returns float
|------------------------------------------------------------------------------------------
*/
function stringToFloat(str) {
  // test if str is a number
  if (parseInt(str) === str) return str;

  // test if string is in the form "1" or "1/3"
  var numbers = str.split('/');
  if (numbers.length != 1 && numbers.length != 2) return 1;
  if (parseInt(numbers[0]) === NaN || parseInt(numbers[1]) === NaN) return 1;

  // test if integer
  if (numbers.length == 1) return parseFloat(numbers[0]);

  // test if denominator is 0
  if (numbers[2] == 1) return 1; // div 0

  return parseInt(numbers[0]) / parseInt(numbers[1]);
}
/*
|------------------------------------------------------------------------------------------
| stringToDice
|------------------------------------------------------------------------------------------
| expected values: "Special", "1d4", "3d4+6", "5d10×10"
| returns object
|------------------------------------------------------------------------------------------
*/
function stringToDice(str) {
  // validate input
  if (str == 'Special') return 'Special';

  var formula = {
    ctDice: 0,
    ctFaces: 0,
    mod: 0,
    mult: 1,
  };

  if (str == 'n/a') return formula;

  // mult
  var multSplit = str.split('×');
  if (multSplit.length == 2) formula.mult = parseInt(multSplit[1]);

  // modifier
  var modSplit = str.split('+');
  if (modSplit.length == 2) formula.mod = parseInt(modSplit[1]);

  // dice
  var dieSplit = str.split('d');
  if (dieSplit.length != 2) return 'error';

  formula.ctDice = parseInt(dieSplit[0]);
  formula.ctFaces = parseInt(dieSplit[1]);

  return formula;
}
/*
|------------------------------------------------------------------------------------------
*/
function loadJSON(file, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  xobj.open('GET', file, true); // Replace "my_data" with the path to your file
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == '200') {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}
/*
|------------------------------------------------------------------------------------------
*/
function addTimedClass(obj, className, duration) {
  addClass(obj, className);
  setTimeout(function () {
    removeClass(obj, className);
  }, duration);
}
/*
|------------------------------------------------------------------------------------------
*/
function addClass(obj, className) {
  obj.className += ' ' + className;
}
/*
|------------------------------------------------------------------------------------------
*/
function removeClass(obj, className) {
  obj.className = obj.className.replace(className, '');
}
/*
|------------------------------------------------------------------------------------------
*/
String.prototype.pluralise = function (count) {
  return this + (count == 1 ? '' : 's');
};
/*
|------------------------------------------------------------------------------------------
*/
String.prototype.toTitleCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
/*
|------------------------------------------------------------------------------------------
*/
function isEven(num) {
  var isEven = num % 2 == 0;
  return isEven;
}

/*
|------------------------------------------------------------------------------------------
| CLIPBOARD.JS
|------------------------------------------------------------------------------------------
*/
var clipboardJson = {};

// if (typeof window.Clipboard == 'function') {
if (typeof window.Clipboard.name !== undefined && window.Clipboard.name == 'e') {
  clipboardJson = new Clipboard('#copyJsonBtn', {
    text(trigger) {
      var el = document.getElementById('outputJson');
      addTimedClass(el, 'js-anim-border', 500);
      return el.innerHTML;
    },
  });
}

/*
|------------------------------------------------------------------------------------------
| SHIP
|------------------------------------------------------------------------------------------
*/
export default {
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
              bluff: {
                modifier: 0,
                ranks: 0,
              },
              computers: {
                modifier: 0,
                ranks: 0,
              },
              diplomacy: {
                modifier: 0,
                ranks: 0,
              },
              engineering: {
                modifier: 0,
                ranks: 0,
              },
              gunnery: {
                modifier: 0,
              },
              intimidate: {
                modifier: 0,
                ranks: 0,
              },
              perception: {
                modifier: 0,
                ranks: 0,
              },
              piloting: {
                modifier: 0,
                ranks: 0,
              },
            },
          }, // captain
          engineer: {
            countOfficers: 1,
            countOfficerCrew: 0,
            hasRole: true,
            skills: {
              computers: {
                modifier: 0,
                ranks: 0,
              },
              engineering: {
                modifier: 0,
                ranks: 0,
              },
            },
          }, // engineer
          gunner: {
            countOfficers: 1,
            countOfficerCrew: 0,
            hasRole: true,
            skills: {
              computers: {
                modifier: 0,
                ranks: 0,
              },
              engineering: {
                modifier: 0,
                ranks: 0,
              },
              gunnery: {
                modifier: 0,
              },
            },
          }, // gunner
          pilot: {
            countOfficers: 1,
            countOfficerCrew: 0,
            hasRole: true,
            skills: {
              computers: {
                modifier: 0,
                ranks: 0,
              },
              diplomacy: {
                modifier: 0,
                ranks: 0,
              },
              engineering: {
                modifier: 0,
                ranks: 0,
              },
              gunnery: {
                modifier: 0,
              },
              intimidate: {
                modifier: 0,
                ranks: 0,
              },
              piloting: {
                modifier: 0,
                ranks: 0,
              },
            },
          }, // pilot
          scienceOfficer: {
            countOfficers: 1,
            countOfficerCrew: 0,
            hasRole: true,
            skills: {
              computers: {
                modifier: 0,
                ranks: 0,
              },
              'life-science': {
                modifier: 0,
                ranks: 0,
              },
              'physical-science': {
                modifier: 0,
                ranks: 0,
              },
            },
          }, // scienceOfficer
          chiefMate: {
            countOfficers: 1,
            countOfficerCrew: 0,
            hasRole: false,
            skills: {
              acrobatics: {
                modifier: 0,
                ranks: 0,
              },
              athletics: {
                modifier: 0,
                ranks: 0,
              },
            },
          }, // chiefMate
          magicOfficer: {
            countOfficers: 1,
            countOfficerCrew: 0,
            hasRole: false,
            skills: {
              mysticism: {
                modifier: 0,
                ranks: 0,
              },
            },
          }, // magicOfficer
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
        isSetDefaultCrewSkillValues: 1,
        isUseStrictRules: 1,
        powerCoreIds: ['none'],
        powerCoreSpecialMaterials: ['none'],
        ctNetworkNodes: 0,
        // networkNodeId: "none",
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
        sources: {
          pw: true,
          som: true,
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

    ablativeArmorByPositionTotal() {
      var total = 0;
      for (var position in this.params.ablativeArmorByPosition) {
        total += parseInt(this.params.ablativeArmorByPosition[position]);
      }
      return total;
    },

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

    antiPersonnelWeapon() {
      return this.getItemById('personalWeapon', this.params.antiPersonnelWeaponId);
    },

    antiPersonnelWeaponBpCost() {
      return (
        (this.antiPersonnelWeapon.weaponType == 'heavy' ? 5 : 0) + this.antiPersonnelWeapon.level
      );
    },

    armor() {
      return this.getItemById('armor', this.params.armorId);
    },

    armorBpCost() {
      var armorBpCost = this.armor.bpCostMultiplier * this.sizeCategory.multiplier;

      if (this.params.sources.som) {
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

    armorClass() {
      return (
        10 +
        this.armor.bonusToAc +
        this.sizeCategory.acAndTlModifier +
        this.pilotingRanks +
        this.deflectorShield.bonusToAc
      );
    },

    armorSpecial() {
      var output = [];
      var outputStr = 'n/a';
      // targetLockModifier
      if (isset(this.armor.targetLockModifier) && this.armor.targetLockModifier < 0) {
        output.push(this.armor.targetLockModifier + ' TL');
      }
      // turnDistanceModifier
      if (isset(this.armor.turnDistanceModifier) && this.armor.turnDistanceModifier > 0) {
        output.push('+' + this.armor.turnDistanceModifier + ' turn distance');
      }
      // output
      if (output.length > 0) {
        outputStr = output.join('; ');
      }
      return outputStr;
    },

    biometricLocksBpCost() {
      return 5 * this.params.hasBiometricLocks;
    },

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

    computer() {
      return this.getItemById('computer', this.params.computerId);
    },

    computerDescription() {
      var desc = '';
      if (this.computer.id !== 'basic-computer') {
        var nodes = this.computer.nodes;
        if (this.params.sources.som && this.isSupercolossal && this.networkNodes.ct > 0) {
          nodes += this.networkNodes.ct;
        }
        var bonus = '+' + this.computer.bonus;
        var nodesWord = integerToWord(nodes);
        desc = bonus + ' to any ' + nodesWord + ' check' + (nodes > 1 ? 's' : '') + ' per round';
      }
      return desc;
    },

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

    computerSkillBonusDesc() {
      if (this.computer.nodes === undefined || this.computer.nodes == 0) return '+0';

      var that = this;
      var bonuses = [];

      // main computer
      for (var index = 0; index < this.computer.nodes; index++) {
        bonuses.push(that.getPrefixedModifier(that.computer.bonus));
      }

      // secondary computer (supercolossal ships)
      if (this.params.sources.som && this.frame.size == 'Supercolossal') {
        for (var index = 0; index < this.secondaryComputer.nodes; index++) {
          bonuses.push(that.getPrefixedModifier(that.secondaryComputer.bonus));
        }
      }

      return bonuses.join('/');
    },

    computerTier() {
      var shipTier = this.tier.value;
      return shipTier < 2 ? 1 : Math.floor(shipTier * 0.5);
    },

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

    crewQuarters() {
      return this.getItemById('crewQuarters', this.params.crewQuartersId);
    },

    crewDescriptions() {
      var that = this;

      var descs = {};

      // crew
      Object.keys(this.params.crewSkills).forEach(function (roleId) {
        var crewSkill = that.params.crewSkills[roleId];
        if (crewSkill.hasRole == false) return;

        var roleDesc = [];

        Object.keys(crewSkill.skills).forEach(function (skillId) {
          var skill = that.params.crewSkills[roleId].skills[skillId];
          if (skillId == 'gunnery' && skill.modifier == 0) return;
          if (skillId != 'gunnery' && (skill.ranks === undefined || skill.ranks == 0)) return;

          roleDesc.push(that.getSkillDesc(skillId, skill));
        });

        if (roleDesc.length > 0) descs[roleId] = roleDesc.join(', ');
      });

      return descs;
    },

    criticalThreshold() {
      return Math.round(this.hp / 5) + this.fortifiedHull.bonusToCt;
    },

    ctComputerNodes() {
      var ct = 0;
      ct += this.computer.nodes;
      if (this.params.sources.som && this.frame.size == 'Supercolossal') {
        ct += this.secondaryComputer.nodes;

        ct += this.networkNodes.ct;
      }
      return ct;
    },

    ctExpansionBaySlots() {
      var ctExpansionBaySlots = this.frame.expansionBays;
      if (
        this.params.sources.som &&
        this.sizeCategory.multiplier >= 4 &&
        (this.params.hasColonyShipFramework || this.params.hasSpaceStationFramework)
      ) {
        ctExpansionBaySlots *= 3;
      }
      return ctExpansionBaySlots;
    },

    ctExternalExpansionBays() {
      if (!this.params.sources.som) return 0;

      var ctBays = this.expansionBays.filter(function (bay) {
        return bay.id == 'external-expansion-bay';
      });

      return ctBays.length;
    },

    customComponentBpTotal() {
      if (!isset(this.params.customComponents)) return 0;

      var total = 0;
      this.params.customComponents.forEach(function (customComponent) {
        total += parseInt(customComponent.bpCost);
      });

      return total;
    },

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

    customComponentsDescription() {
      if (this.params.customComponents.length == 0) return 'None';

      var components = [];

      this.params.customComponents.forEach(function (component) {
        components.push(component.name + (component.notes ? ' (' + component.notes + ')' : ''));
      });

      return components.join('; ');
    },

    customFrameSize() {
      if (!isset(this.params.customFrame)) return {};

      return this.getItemById('sizeCategory', this.params.customFrame.size);
    },

    damageThreshold() {
      var dt = this.frame.dt;
      if (this.params.sources.som && this.params.armorMaterialId == 'adamantine-alloy') {
        if (dt == 'n/a') dt = 0;
        dt += this.armor.bonusToAc;
      }
      return dt;
    },

    dataNetBpCost() {
      return this.params.hasDataNet ? 3 : 0;
    },

    dataNetPcuCost() {
      return this.params.hasDataNet ? 5 : 0;
    },

    dedicatedComputer() {
      return this.getItemById('computer', this.params.dedicatedComputerId);
    },

    defensiveCountermeasures() {
      return this.getItemById('defensiveCountermeasures', this.params.defensiveCountermeasuresId);
    },

    defensiveCountermeasuresBpCost() {
      var dcBpCost = this.defensiveCountermeasures.bpCost;

      if (this.params.sources.som) {
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

    deflectorShield() {
      return this.getItemById('deflectorShield', this.params.deflectorShieldId);
    },

    driftEngine() {
      return this.getItemById('driftEngine', this.params.driftEngineId);
    },

    driftEngineBpCost() {
      return this.driftEngine.bpCostMultiplier * this.sizeCategory.multiplier;
    },

    expansionBays() {
      var that = this;
      var expansionBays = [];
      this.params.expansionBayIds.forEach(function (id) {
        expansionBays.push(that.getItemById('expansionBay', id));
      });
      return expansionBays;
    },

    expansionBaysCountUsed() {
      var countUsed = 0;
      for (var i in this.expansionBays) {
        if (this.expansionBays[i].id !== 'none') {
          countUsed += this.expansionBays[i].numBays;
        }
      }
      return countUsed;
    },

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

    expansionBaysTotalBpCost() {
      return this.getSumOfPropertyValuesInCollection(this.expansionBays, 'bpCost');
    },

    expansionBaysTotalPcuCost() {
      return this.getSumOfPropertyValuesInCollection(this.expansionBays, 'pcuCost');
    },

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

    frameName() {
      return (
        this.frame.name.toLowerCase() +
        (this.params.hasColonyShipFramework ? '(colony ship)' : '') +
        (this.params.hasSpaceStationFramework ? ' (space station)' : '')
      );
    },

    hasBoosterThrusterHousing() {
      if (!this.params.sources.som) return false;

      var hasHousing =
        this.expansionBays.find(function (bay) {
          return bay.id == 'booster-thruster-housing';
        }) !== undefined;

      return hasHousing;
    },

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

    hasDedicatedComputerHousing() {
      if (!this.params.sources.som) return false;

      var hasHousing =
        this.expansionBays.find(function (bay) {
          return bay.id == 'dedicated-computer-housing';
        }) !== undefined;

      return hasHousing;
    },

    hasHealingPod() {
      if (!this.params.sources.som) return false;

      var hasPod =
        this.expansionBays.find(function (bay) {
          return bay.id == 'healing-pods';
        }) !== undefined;

      return hasPod;
    },

    hasPowerCoreHousingExpansionBay() {
      var result = false;
      for (var i in this.params.expansionBayIds) {
        if (this.params.expansionBayIds[i] == 'power-core-housing') {
          result = true;
        }
      }
      return result;
    },

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

    hiveJoiningBpCost() {
      return this.params.hasHiveJoining ? 1 : 0;
    },

    hp() {
      return parseInt(this.frame.hp) + parseInt(this.tier.hpIncrease) * this.frame.hpIncrement;
    },

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

    isBpCostOverBudget() {
      return this.totalBpCost > this.tier.bpBudget;
    },

    isComplementValid() {
      var isComplementValid = true;
      if (this.complement < this.frame.minCrew || this.complement > this.frame.maxCrew) {
        isComplementValid = false;
      }
      return isComplementValid;
    },

    isExpansionBaysCountOverBudget() {
      return this.expansionBaysCountUsed > this.ctExpansionBaySlots;
    },

    isOrbitalWeaponDiscountUsed() {
      if (!this.params.sources.som) return false;
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

    isPcuCostOverBudget() {
      return this.totalPcuCost.essential > this.pcuBudget;
    },

    isSupercolossal() {
      return this.params.sources.som && this.frame.size == 'Supercolossal';
    },

    jsonParams() {
      var jsonParams = cloneObject(this.params);
      jsonParams['isSetDefaultCrewSkillValues'] = 0; // Because otherwise crew skills get overwritten!
      return JSON.stringify(jsonParams);
    },

    maneuverabilityRating() {
      if (this.params.hasSpaceStationFramework) {
        return this.getItemById('maneuverabilityRating', 'poor');
      }

      return this.getItemById('maneuverabilityRating', this.frame.maneuverability);
    },

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

    // networkNode() {
    // 	return this.getItemById("networkNode", this.params.networkNodeId);
    // },

    networkNodes() {
      var ctNodes = 0;

      if (this.params.sources.som && this.isSupercolossal) {
        ctNodes = parseInt(this.params.ctNetworkNodes);
      }

      var pcuCosts = [0, 0, 0, 0, 8, 10, 11, 13, 15, 17, 19];

      return {
        bpCost: ctNodes * this.computer.bonus,
        ct: ctNodes,
        pcuCost: ctNodes * pcuCosts[this.computer.bonus == 0 ? 0 : this.computer.bonus - 1],
      };
    },

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

    pcuBudget() {
      var pcuBudget = 0;
      for (var i in this.powerCores) {
        var powerCoreBudget = this.powerCores[i].pcuBudget;
        if (this.params.powerCoreSpecialMaterials[i] == 'abysium') powerCoreBudget *= 1.25;
        pcuBudget += Math.floor(powerCoreBudget);
      }
      return pcuBudget;
    },

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

    powerCores() {
      var powerCoreList = [];
      for (var i in this.params.powerCoreIds) {
        var powerCore = cloneObject(this.getItemById('powerCore', this.params.powerCoreIds[i]));
        powerCore.sizeList = powerCore.sizes.join(', ');

        // special materials
        if (this.params.sources.som) {
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

    powerCoresBpCost() {
      var bpCost = 0;
      for (var i in this.powerCores) {
        bpCost += this.powerCores[i].bpCost;
      }
      return bpCost;
    },

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

    roboticAppendage() {
      var roboticAppendage = this.getItemById('roboticAppendage', this.params.roboticAppendageId);
      return roboticAppendage;
    },

    roleDescription() {
      roleDesc = {};
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

    secondaryComputer() {
      return this.getItemById('computer', this.params.secondaryComputerId);
    },

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

    securityTotalPcuCost() {
      return (
        (this.params.hasEmergencyAccelerator ? 5 : 0) +
        (this.params.hasHolographicMantle ? 10 : 0) +
        (this.params.hasReconfigurationSystem ? 50 : 0)
      );
    },

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
        // "networkNode",
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
          (option) => option.src == 'scr' || this.params.sources[option.src]
        );
      }

      // expansionBay
      var expansionBayNone = options.expansionBay.shift();
      options.expansionBay.sort(function (a, b) {
        return a.name > b.name;
      });
      options.expansionBay.unshift(expansionBayNone);

      // sampleShip
      options.sampleShip.sort(function (a, b) {
        // tier
        if (that.selectSampleShipSortOrder == 'tier')
          return stringToFloat(a.tier) > stringToFloat(b.tier);

        // size, name
        return a[that.selectSampleShipSortOrder] > b[that.selectSampleShipSortOrder];
      });

      // ship weapon
      options.shipWeapon.sort(function (a, b) {
        return a.name > b.name;
      });

      return options;
    },

    selectOptionsBaseFrame() {
      return this.selectOptions.frame.filter((option) => option.id != custom);
    },

    selectOptionsThruster() {
      return this.selectOptions.thrusters.filter(
        (option) => !this.params.isUseStrictRules || option.size.indexOf(this.frame.size) > -1
      );
    },

    selectOptionsAblativeArmor() {
      return this.selectOptions.ablativeArmor.filter((option) => option.tempHp <= this.hp * 2);
    },

    selectOptionsComputer() {
      // TODO: Change computer bonus check for D&D 5e
      return this.selectOptions.computer.filter(
        (option) => this.frame.size != 'Supercolossal' || option.bonus >= 4
      );
    },

    selectOptionsComputerCountermeasures() {
      return this.selectOptions.computerCountermeasures.filter(
        (option) => option.id != 'shock-grid'
      );
    },

    selectOptionsComputerDedicated() {
      return this.selectOptions.computer.filter(
        (option) => option.id == 'basic-computer' || option.id.indexOf('mononode') !== -1
      );
    },

    selectOptionsComputerSecondary() {
      return this.selectOptions.computer.filter((option) => option.bonus >= this.computer.bonus);
    },

    selectOptionsCrewQuarters() {
      return this.selectOptions.crewQuarters.filter(
        (option) =>
          !this.params.isUseStrictRules ||
          (this.sizeCategory.multiplier == 1 && option.isTinyOnly) ||
          (this.sizeCategory.multiplier > 1 && !option.isTinyOnly)
      );
    },

    selectOptionsCrewRole() {
      return this.selectOptions.role.filter(
        (option) => option.id == 'vi' && this.params.viId != 'none'
      );
    },

    selectOptionsDriftEngine() {
      return this.selectOptions.driftEngine.filter(
        (option) =>
          !this.params.isUseStrictRules ||
          (this.pcuBudget >= option.minPcu && this.sizeCategory.multiplier <= option.maxSize)
      );
    },

    selectOptionsPersonalWeapon() {
      // TODO: Remove weapon level for D&D 5e or add levels to the personal weapons
      return this.selectOptions.personalWeapon.filter((option) => option.level <= this.tier.id);
    },

    selfDestructSystemBpCost() {
      return this.params.hasSelfDestructSystem * 5 * this.sizeCategory.multiplier;
    },

    sensors() {
      return this.getItemById('sensors', this.params.sensorsId);
    },

    sensorsBpCost() {
      var sensorsBpCost = this.sensors.bpCost;
      if (this.params.sources.som) {
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

    shields() {
      return this.getItemById('shields', this.params.shieldsId);
    },

    shieldsByPositionTotal() {
      var total = 0;
      for (var position in this.params.shieldsByPosition) {
        total += parseInt(this.params.shieldsByPosition[position]);
      }
      return total;
    },

    shipName() {
      return this.params.shipName == '' ? 'New Ship' : this.params.shipName;
    },

    shockGrid() {
      return this.getItemById('shockGrid', this.params.computerCountermeasures.shockGridId);
    },

    shockGridBpCost() {
      return this.shockGrid.bpCostMultiplier * this.computerTier;
    },

    sizeCategory() {
      return this.getItemById('sizeCategory', this.frame.size);
    },

    skillModifierComputers() {
      return this.sensors.modifier;
    },

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

    skillTotals() {
      var skillTotals = {};
      for (var role in this.params.crewSkills) {
        skillTotals[role] = {};
        for (var skill in this.params.crewSkills[role].skills) {
          var skillObj = this.params.crewSkills[role].skills[skill];
          skillTotals[role][skill] = parseInt(skillObj.modifier);
          if (isset(skillObj.ranks)) {
            skillTotals[role][skill] += parseInt(skillObj.ranks);
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
        if (this.params.sources.som && this.params.defensiveCountermeasuresMaterialId != 'none') {
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
        this.computer.name.toLowerCase() +
        (this.computer.id == 'basic-computer' ? '' : ' computer') +
        ' (tier ' +
        this.computerTier +
        ')';
      desc.push(computerDesc);

      // network nodes
      if (this.params.sources.som && this.isSupercolossal && this.networkNodes.ct > 0) {
        var networkNodeDesc = ('mk ' + this.computer.bonus + ' network node').pluralise(
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

      return desc.join(', ');
    },

    targetLock() {
      return (
        10 +
        this.defensiveCountermeasures.defCMBonusToTl +
        this.sizeCategory.acAndTlModifier +
        this.armor.targetLockModifier +
        this.pilotingRanks +
        this.ablativeArmor.tlMod +
        this.deflectorShield.bonusToTl
      );
    },

    tempHp() {
      return this.ablativeArmor.tempHp;
    },

    thrusters() {
      var thrusters = cloneObject(this.getItemById('thrusters', this.params.thrustersId));

      // space station framework
      if (this.params.hasSpaceStationFramework) {
        var speed = Math.floor(thrusters.speed * 0.25);
        thrusters.speed = speed < 1 ? 1 : speed;
      }

      // materials
      if (this.params.sources.som) {
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

    thrustersBooster() {
      var thrustersBooster = cloneObject(
        this.getItemById('thrusters', this.params.thrustersBoosterId)
      );

      if (this.params.sources.som) {
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

    tier() {
      var tier = this.getItemById('tier', this.params.tierId);
      return tier;
    },

    timBpCost() {
      var ctTim = parseInt(this.params.ctTim);
      var ctTimAll = parseInt(this.params.ctTimAll);

      var cost = 2 * ctTim + 0.5 * (ctTim * ctTim + ctTim) + 3 * ctTimAll;

      return cost;
    },

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
        // (this.isSupercolossal ? this.networkNode.bpCost : 0) +
        // (this.isSupercolossal ? parseInt(this.ctNetworkNode) * this.computer.bonus : 0) +
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
        parseInt(this.weaponsTotalCosts.weaponLinksBp)
      );
    },

    totalPcuCost() {
      return {
        essential:
          this.thrusters.pcuCost +
          (this.hasBoosterThrusterHousing ? this.thrustersBooster.pcuCost : 0) +
          this.defensiveCountermeasures.pcuCost +
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
          (this.isSupercolossal ? this.networkNodes.bpCost : 0),
      };
    },

    turn() {
      return (
        this.maneuverabilityRating.turn +
        this.armor.turnDistanceModifier +
        this.ablativeArmor.turnMod +
        Math.ceil(this.ctExternalExpansionBays / 3)
      );
    },

    vi() {
      var vi = this.getItemById('vi', this.params.viId);
      return vi;
    },

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

    viHoloProjector() {
      var viHoloProjector = this.getItemById('viHoloProjector', this.params.viHoloProjectorId);
      return viHoloProjector;
    },

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

    viSkillExpander() {
      var viSkillExpander = this.getItemById('viSkillExpander', this.params.viSkillExpanderId);
      return viSkillExpander;
    },

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
        this.$set(this.params.customFrame.mounts, position, []);
      this.params.customFrame.mounts[position].push('light');
      this.setWeaponMounts(this.frame.mounts);
    },

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

    canWeaponMountBeCreated(position) {
      var result = true;
      var countMountsInPosition = this.params.weaponMounts[position].length;
      if (countMountsInPosition >= this.sizeCategory.maxMounts) {
        result = false;
      }
      return result;
    },

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

    clearAll() {
      this.params = cloneObject(this.paramsReset);
      this.json = '';
      document.getElementById('sampleShipSelect').value = 'none';
    },

    clearWeaponMounts() {
      for (var position in this.params.weaponMounts) {
        // var mountList = this.params.weaponMounts[position];
        this.params.weaponMounts[position].splice(0, this.params.weaponMounts[position].length); // start, deleteCount
      }
      // console.log(this.params.weaponMounts);
    },

    convertJsonInput() {
      var params = JSON.parse(this.json);
      this.params = params;
      this.fixMissingParamsValues();
    },

    createCustomComponent() {
      // initialise on older builds
      if (!isset(this.params.customComponents)) {
        this.$set(this.params, 'customComponents', []);
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

    destroyWeaponMount(position, i) {
      this.params.weaponMounts[position].splice(i, 1); // start, deleteCount
      this.setWeaponLinking(position);
    },

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

    fixMissingCrewSkills() {
      for (var roleId in this.paramsReset.crewSkills) {
        // if role is missing, add it
        if (!isset(this.params.crewSkills[roleId])) {
          console.log('Missing crew role, ' + roleId + ', added to ship');
          this.$set(
            this.params.crewSkills,
            roleId,
            cloneObject(this.paramsReset.crewSkills[roleId])
          );
          continue;
        }

        for (var skillId in this.paramsReset.crewSkills[roleId].skills) {
          // if skill is missing, add it
          if (!isset(this.params.crewSkills[roleId].skills[skillId])) {
            console.log(
              'Missing skill, ' + skillId + ', in crew role, ' + roleId + ', added to ship'
            );
            this.$set(
              this.params.crewSkills[roleId].skills,
              skillId,
              cloneObject(this.paramsReset.crewSkills[roleId].skills[skillId])
            );
          }
        }
      }
      return;
    },

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
                that.$set(that.params.weaponMounts[position][i], param.id, param.default);
                console.log(
                  'Missing property, ' +
                    param.id +
                    ', added to ' +
                    position +
                    ' weapon mount ' +
                    (parseInt(i) + 1)
                );
              });
            }
          }
        }

        if (isset(this.params[key])) continue;

        console.log('Missing property, ' + key + ', added to ship');
        this.$set(this.params, key, cloneObject(this.paramsReset[key]));

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
    /*
     getAvailableWeaponUpgrades(weapon) {
       return [{id: "test", name: "Test"}];
     },
     */

    getExpansionBayBpCost(bay) {
      // Quantum defender
      if (bay.id == 'quantum-defender') {
        var bpCost = 4 * this.sizeCategory.multiplier;
        return bpCost < 10 ? 10 : bpCost;
      }

      // everything else
      return bay.bpCost;
    },

    getExpansionBayPcuCost(bay) {
      // Quantum defender
      if (bay.id == 'quantum-defender') {
        var pcuCost = 5 * this.sizeCategory.multiplier;
        return pcuCost < 20 ? 20 : pcuCost;
      }

      // everything else
      return bay.pcuCost;
    },

    getFrameMountWeaponWeight(position, index) {
      return this.frame.mounts[position][index];
    },

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

    getPrefixedModifier(val) {
      var prefix = val >= 0 ? '+' : '';
      return prefix + val;
    },

    getSampleShipOptionName(option) {
      // name
      var shipName = option.name;
      // tier
      var tier = option.tier;

      // frame
      var frame = {};
      if (option.params.frameId == 'custom') {
        frame = option.params.customFrame;
      } else {
        frame = this.getItemById('frame', option.params.frameId);
      }

      // size
      var size = this.getItemById('sizeCategory', frame.size);

      return option.name + ' (' + 'Tier ' + option.tier + ' ' + size.name + ' ' + frame.name + ')';
    },

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
    getSkillDesc(skillId, skill) {
      if (skillId == 'gunnery' && skill.modifier == 0) return '';
      if (skillId != 'gunnery' && (skill.ranks === undefined || skill.ranks == 0)) return '';

      var skillInfo = this.getItemById('skill', skillId);
      if (!skillInfo) return '';

      // name
      var desc = skillInfo.name + ' ';

      // modifier
      var modifier = parseInt(skill.modifier);
      if (skillId != 'gunnery') {
        modifier += parseInt(skill.ranks);
      }
      if (skillId == 'computers') {
        modifier += parseInt(this.skillModifierComputers);
      }
      if (skillId == 'piloting') {
        modifier += parseInt(this.skillModifierPiloting);
      }
      desc += this.getPrefixedModifier(modifier);

      // skill ranks
      if (skillId != 'gunnery') {
        desc += ' (' + skill.ranks + ' ' + 'rank'.pluralise(skill.ranks) + ')';
      }

      return desc;
    },

    getSumOfPropertyValuesInCollection(collection, property) {
      var total = 0;
      for (var i in collection) {
        total += collection[i][property];
      }
      return total;
    },

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

    initParams() {
      if (window.JTOStarshipSheetModel === undefined) {
        this.params = cloneObject(this.paramsReset);
      } else {
        this.params = cloneObject(window.JTOStarshipSheetModel);
      }
    },

    inputSampleShipParams() {
      var sampleShipSelect = document.getElementById('sampleShipSelect');
      var sampleShipId = sampleShipSelect.value;
      if (sampleShipId !== 'none') {
        var sampleShipObj = this.getItemById('sampleShip', sampleShipId);
        var sampleShipParams = cloneObject(sampleShipObj.params);
        this.params = sampleShipParams;
        this.fixMissingParamsValues();
      }
    },

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
    selectOptionsShipWeapon(weaponType, weaponMount) {
      console.log(weaponType, weaponMount);
      return this.selectOptions.shipWeapon.filter(
        (option) =>
          option.weaponType == weaponType &&
          (!params.isUseStrictRules || option.weight == weaponMount.weight)
      );
    },

    isOrbitalWeapon(weapon) {
      var isOrbital = false;
      weapon.specialProperties.forEach(function (prop) {
        if (isOrbital) return;
        if (prop.substr(0, 7) == 'orbital') isOrbital = true;
        return;
      });
      return isOrbital;
    },

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

    popExcessExpansionBays(targetCountBays) {
      var countBays = this.params.expansionBayIds.length;
      if (countBays > targetCountBays) {
        for (var i = 0; i < countBays - targetCountBays; i++) {
          this.params.expansionBayIds.pop();
        }
      }
    },

    removeCustomComponent(index) {
      this.params.customComponents.splice(index, 1);
      return;
    },

    removeCustomFrameMount(position, index) {
      this.params.customFrame.mounts[position].splice(index, 1);
      if (!this.params.customFrame.mounts[position].length)
        this.$delete(this.params.customFrame.mounts, position);
      this.setWeaponMounts(this.frame.mounts);
    },

    resetCustomFrame() {
      this.setCustomFrame();
      this.updateFrame();
    },

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

    setCustomFrame() {
      this.$set(
        this.params,
        'customFrame',
        cloneObject(this.getItemById('frame', this.params.customFrameBaseId))
      );
    },

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
    /*
    |------------------------------------------------------------------------------
    | setComputer
    |------------------------------------------------------------------------------
    | When a new frame is selected, need to check that existing computer matches legal options
    |------------------------------------------------------------------------------
    */
    setComputer() {
      if (this.frame.size != 'Supercolossal') return;
      if (this.computer.bonus < 4) this.params.computerId = 'mk-4-mononode';
    },
    /*
    |------------------------------------------------------------------------------
    | setNetworkNode
    |------------------------------------------------------------------------------
    | When a new frame is selected, need to check that existing network node matches legal options
    |------------------------------------------------------------------------------
    */
    setNetworkNode() {
      if (this.params.networkNodeId == 'none') return;

      if (this.frame.size != 'Supercolossal') {
        this.params.networkNodeId == 'none';
        return;
      }

      if (this.networkNode.bonus != this.computer.bonus) {
        this.params.networkNodeId = 'mk' + this.computer.bonus;
      }

      return;
    },

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

    testThatItemHasId(prop, item) {
      if (!isset(this.data[prop].data[item].id)) {
        throw 'Property ' + prop + '[' + item + '] does not have an id';
      }
    },

    testThatItemHasName(prop, item) {
      if (!isset(this.data[prop].data[item].name)) {
        throw 'Property ' + prop + '[' + item + '] does not have a name';
      }
    },

    testThatPropExists(prop) {
      if (!isset(this.data[prop])) {
        throw 'Property ' + prop + ' does not exist';
      }
    },

    testThatPropIsArray(prop) {
      if (typeof this.data[prop].data !== 'object') {
        throw 'Property ' + prop + ' is not an array';
      }
    },

    // updateComputer() {
    // 	if (!this.params.sources.som) return;
    // 	if (this.params.networkNodeId == "none") return;
    // 	if (this.frame.size != "Supercolossal") return;

    // 	if (this.computer.bonus != this.networkNode.bonus) {
    // 		this.params.networkNodeId = "mk" + this.computer.bonus;
    // 	}

    // 	return;
    // },

    updateFrame() {
      // this.syncExpansionBays( this.frame.expansionBays );
      this.setCrewQuarters(this.frame.size);
      this.setWeaponMounts(this.frame.mounts);
      this.setPowerCores();
      this.setComputer();
      this.setNetworkNode();
    },

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
| WEAPON MOUNT
|------------------------------------------------------------------------------------------
|
| params expects: weaponMountId, position, weaponId, weight, isFromTemplate, canBeLinked, 
| isLinked, sizeCategoryId
| maybe expects templateWeight
|
|------------------------------------------------------------------------------------------
*/
function WeaponMount(params) {
  /*
    |--------------------------------------------------------------------------------------
    */
  this.doTests = function () {
    this.testThatPositionIsValid();
    this.testThatWeightIsValid(this.weight);
    this.testThatWeightIsValid(this.templateWeight);
    this.testThatTemplateWeightIsSmallerThanWeight();
    this.testThatTurretIsNotCapital();
  };
  /*
    |--------------------------------------------------------------------------------------
    */
  this.getCost = function () {
    return this.getUpgradeCost() + this.getNewMountCost();
  };
  /*
    |--------------------------------------------------------------------------------------
    */
  this.getMaterialCost = function () {
    var materialCost = 0;

    switch (this.specialMaterial) {
      // abysium and inubrix: 2, 6, 10, 10
      case 'abysium':
      case 'inubrix':
        switch (this.weight) {
          case 'light':
            materialCost = 2;
            break;
          case 'heavy':
            materialCost = 6;
            break;
          case 'capital':
          case 'spinal':
            materialCost = 10;
            break;
        }
        break;

      // adamantine alloy: damage die type (with multipliers)
      case 'adamantine-alloy':
        var damageDice = stringToDice(this.weapon.damage);
        var mult = this.isLinked ? 2 : 1;
        materialCost = (damageDice.ctFaces * mult) / 2;
        break;
        break;
      default:
        break;
    }

    return materialCost;
  };
  /*
  |--------------------------------------------------------------------------------------
  */
  this.getMaterialDesc = function () {
    var materialDesc = [];

    switch (this.specialMaterial) {
      case 'abysium':
        switch (this.weight) {
          case 'light':
            materialDesc.push('irradiate (low)');
            break;
          case 'heavy':
            materialDesc.push('irradiate (medium)');
            break;
          case 'capital':
          case 'spinal':
            materialDesc.push('irradiate (high)');
            break;
        }
        break;
      case 'adamantine-alloy':
        var damageDice = stringToDice(this.weapon.damage);
        if (damageDice.ctDice !== undefined && damageDice.ctDice > 0) {
          materialDesc.push('+' + damageDice.ctDice + ' damage to shieldless quadrants');
        }
        break;
      case 'inubrix':
        materialDesc.push('20% chance to score second critical hit');
        break;
      default:
        break;
    }

    return materialDesc.join(', ');
  };
  /*
  |--------------------------------------------------------------------------------------
  */
  this.getNewMountCost = function () {
    var newMountCost = 0;
    if (!this.isFromTemplate) {
      if (this.position == 'turret') {
        newMountCost = 5;
      } else {
        newMountCost = 3;
      }
    }
    return newMountCost;
  };
  /*
  |--------------------------------------------------------------------------------------
  */
  this.getUpgradeCost = function () {
    var upgradeCost = 0;
    if (this.weight !== this.templateWeight) {
      // if position is forward, aft, port or starboard arc
      if (WEAPON_ARCS.indexOf(this.position) !== -1) {
        // if templateWeight is light and weight is heavy
        if (this.templateWeight == 'light' && this.weight == 'heavy') {
          upgradeCost = 4;
        } else if (this.templateWeight == 'heavy' && this.weight == 'capital') {
          // if templateWeight is heavy and weight is capital
          upgradeCost = 5;
        } else {
          // if templateWeight is light and weight is capital (i.e. 2 upgrades)
          upgradeCost = 9;
        }
      } else {
        // if position is turret
        upgradeCost = 6;
      }
    }
    return upgradeCost;
  };
  /*
  |--------------------------------------------------------------------------------------
  */
  this.testThatPositionIsValid = function () {
    if (['forward', 'aft', 'port', 'starboard', 'turret', 'spinal'].indexOf(this.position) == -1) {
      throw 'Invalid position in WeaponMount class: ' + this.position;
    }
  };

  /*
  |--------------------------------------------------------------------------------------
  */
  this.testThatWeightIsValid = function (weight) {
    if (['light', 'heavy', 'capital', 'spinal'].indexOf(weight) == -1) {
      throw 'Invalid weight in WeaponMount class: ' + weight;
    }
  };

  /*
  |--------------------------------------------------------------------------------------
  */
  this.testThatTemplateWeightIsSmallerThanWeight = function () {
    var weightVal = {
      light: 0,
      heavy: 1,
      capital: 2,
    };
    if (weightVal[this.weight] < weightVal[this.templateWeight]) {
      throw 'Original weight must be equal to or lower than current weight';
    }
  };

  /*
  |--------------------------------------------------------------------------------------
  */
  this.testThatTurretIsNotCapital = function () {
    if (this.sizeCategoryId == 'Supercolossal') return;

    if (
      this.position == 'turret' &&
      (this.weight == 'capital' || this.templateWeight == 'capital')
    ) {
      throw "Turrets cannot have weight 'capital' in WeaponMount";
    }
  };
  /*
  |--------------------------------------------------------------------------------------
  */

  /*
  |--------------------------------------------------------------------------------------
  | CONSTRUCTOR
  |--------------------------------------------------------------------------------------
  */
  this.id = params.weaponMountId;
  this.position = params.position;
  this.weaponId = params.weaponId;
  this.weapon = params.weapon;
  this.weight = params.weight;
  this.isFromTemplate = params.isFromTemplate;
  if (this.isFromTemplate) {
    this.templateWeight = params.templateWeight;
  } else {
    this.templateWeight = 'light';
  }
  this.canBeLinked = params.canBeLinked;
  this.isLinked = params.isLinked;
  this.specialMaterial = params.specialMaterial;
  this.sizeCategoryId = params.sizeCategoryId; // of ship

  this.doTests();

  /*
  |--------------------------------------------------------------------------------------
  */
}
