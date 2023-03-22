var WEAPON_ARCS = ['forward', 'aft', 'port', 'starboard'];
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

export { WeaponMount };
