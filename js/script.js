var JSON_FILE = "data/ship-builder.json";

var WEAPON_SORT = {
	forwardArc: 0,
	portArc: 1,
	starboardArc: 2,
	aftArc: 3,
	turret: 4
};

/**
 * HELPERS
 */

function getSortKeyForShipWeapon(shipWeaponId) {
	var keyAr = shipWeaponId["position"].split("_");
	var position = keyAr[0];
	var index = parseInt(keyAr[1]);
	var positionSort = WEAPON_SORT[position];
	var sortKey = (positionSort * 10 + index);
	return sortKey;
}

function maybeCreateProperty(obj, prop, type) {
	if(typeof obj !== "object") {
		throw "Not an object";
	}
	if(typeof obj[prop] === "undefined") {
		switch(type) {
			case "Array":
				obj[prop] = [];
				break;
			case "String":
				obj[prop] = "";
				break;
			case "Integer":
				obj[prop] = 0;
				break;
			case "Object":
			default:
				obj[prop] = {};
		}
	}
}

function isset(obj) {
	if(typeof obj === "undefined") {
		return false;
	}
	return true;
}

function cloneObject( obj ) {
	return JSON.parse(JSON.stringify(obj));
}

function integerToWord( int ) {
	var word = "";
	switch(int) {
		case 1:
			word = "one";
			break;
		case 2:
			word = "two";
			break;
		case 3:
			word = "three";
			break;
		case 4:
			word = "four";
			break;
		case 5:
			word = "five";
			break;
		case 6:
			word = "six";
			break;
		case 7:
			word = "seven";
			break;
		case 8:
			word = "eight";
			break;
		case 9:
			word = "nine";
			break;
		case 10:
			word = "ten";
			break;
		default:
			word = "error";
	}
	return word;
}

function loadJSON(file, callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", file, true); // Replace "my_data" with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
}

function pluralise(str, count) {
	return str + (count == 1 ? "" : "s");
}

function addTimedClass( obj, className, duration )
{
	addClass( obj, className );
	setTimeout(function(){
		removeClass( obj, className );
	}, duration);
}

function addClass( obj, className ) {
	obj.className += ' ' + className;
}

function removeClass( obj, className ) {
	obj.className = obj.className.replace(className, '');
}

/**
 * CLIPBOARD.JS
 * https://clipboardjs.com/
 */

/*
var clipboardOutput = new Clipboard('#copyOutputBtn', {
	text: function( trigger ) {
		var el = document.getElementById('outputText');
		return el.innerHTML;
	}
});
*/

var clipboardJson = new Clipboard('#copyJsonBtn', {
	text: function( trigger ) {
		var el = document.getElementById('outputJson');
		addTimedClass( el, 'js-anim-border', 500 );
		return el.innerHTML;
	}
});

//clipboard.on('success', function(e) {
//	doCopyFeedback('success');
//    e.clearSelection();
//});
//
//clipboard.on('error', function(e) {
//	doCopyFeedback('error');
//    console.error('Action:', e.action);
//    console.error('Trigger:', e.trigger);
//});



/**
 * SHIP
 */

function Ship(json) {
	
	this.app = new Vue({
		el: "#app",
		data: {
			data: json,
			paramsReset: {
				version:"1.0.0",
				hasCrew:1,
				isSetDefaultCrewSkillValues:1,
				isUseStrictRules:1,
				shipName:"",
				shipConcept:"",
				tierId:"1",
				frameId:"light-freighter",
				powerCoreId:"none",
				thrustersId:"none",
				armourId:"none",
				computerId:"basic-computer",
				crewQuartersId:"common",
				defensiveCountermeasuresId:"none",
				driftEngineId:"none",
				expansionBayIds:["none","none","none"],
				hasAntiHackingSystems:0,
				antiPersonnelWeaponId:"none",
				hasBiometricLocks:0,
				computerCountermeasuresId:"none",
				hasSelfDestructSystem:0,
				sensorsId:"none",
				shieldsId:"none",
				shipWeaponIds:[
					{
						position:"forwardArc_0",
						id:"none",
						weight:"light"
					},
					{
						position:"forwardArc_1",
						id:"none",
						weight:"light"
					},
					{
						position:"portArc_0",
						id:"none",
						weight:"light"
					},
					{
						position:"starboardArc_0",
						id:"none",
						weight:"light"
					}
				],
				crewSkills: {
					captain: {
						hasRole: true,
						skills: {
							bluff: {
								modifier: 0,
								ranks: 0
							},
							computers: {
								modifier: 0,
								ranks: 0
							},
							diplomacy: {
								modifier: 0,
								ranks: 0
							},
							engineering: {
								modifier: 0,
								ranks: 0
							},
							gunnery: {
								modifier: 0
							},
							intimidate: {
								modifier: 0,
								ranks: 0
							},
							piloting: {
								modifier: 0,
								ranks: 0
							}
						}
					}, // captain
					engineer: {
						countOfficers: 1,
						countOfficerCrew: 0,
						hasRole: true,
						skills: {
							engineering: {
								modifier: 0,
								ranks: 0
							}
						}
					}, // engineer
					gunner: {
						countOfficers: 1,
						countOfficerCrew: 0,
						hasRole: true,
						skills: {
							gunnery: {
								modifier: 0
							}
						}
					}, // gunner
					pilot: {
						countOfficers: 1,
						countOfficerCrew: 0,
						hasRole: true,
						skills: {
							computers: {
								modifier: 0,
								ranks: 0
							},
							gunnery: {
								modifier: 0
							},
							piloting: {
								modifier: 0,
								ranks: 0
							},
						}
					}, // pilot
					scienceOfficer: {
						countOfficers: 1,
						countOfficerCrew: 0,
						hasRole: true,
						skills: {
							computers: {
								modifier: 0,
								ranks: 0
							}
						}
					} // scienceOfficer
				} // crewSkills
			},
			params: {},
			json: ""
		},
		computed: {
			antiHackingSystemsBpCost: function() {
				return 3 * this.params.hasAntiHackingSystems;
			},
			antiPersonnelWeapon: function() {
				return this.getItemById("personalWeapon", this.params.antiPersonnelWeaponId);
			},
			antiPersonnelWeaponBpCost: function() {
				return (this.antiPersonnelWeapon.type == "heavy" ? 5 : 0) + this.antiPersonnelWeapon.level;
			},
			armour: function () {
				return this.getItemById("armour", this.params.armourId);
			},
			armourBpCost: function() {
				return this.armour.bpCostMultiplier * this.sizeCategory.multiplier;
			},
			armourClass: function() {
				return 10 +
					this.armour.bonusToAc +
					this.sizeCategory.acAndTlModifier +
					this.pilotingRanks
				;
			},
			armourSpecial: function() {
				var output = [];
				var outputStr = "n/a";
				// targetLockModifier
				if(
					isset(this.armour.targetLockModifier) &&
					this.armour.targetLockModifier < 0
				) {
					output.push(this.armour.targetLockModifier + " TL");
				}
				// turnDistanceModifier
				if(
					isset(this.armour.turnDistanceModifier) &&
					this.armour.turnDistanceModifier > 0
				) {
					output.push("+" + this.armour.turnDistanceModifier + " turn distance");
				}
				// output
				if( output.length > 0 ) {
					outputStr = output.join("; ");
				}
				return outputStr;
			},
			biometricLocksBpCost: function() {
				return 5 * this.params.hasBiometricLocks;
			},
			complement: function() {
				var complement = 0;
				for(role in this.params.crewSkills) {
					if( this.params.crewSkills[role].hasRole ) {
						if( role == 'captain' ) {
							complement++;
						} else {
							var countOfficers = parseInt(this.params.crewSkills[role].countOfficers);
							var countOfficerCrew = parseInt(this.params.crewSkills[role].countOfficerCrew);
							complement += countOfficers;
							complement += (countOfficers * countOfficerCrew);
						}
					}
				}
				return complement;
			},
			computer: function() {
				return this.getItemById("computer", this.params.computerId);
			},
			computerDescription: function() {
				var desc = "";
				if(this.computer.id !== "basic-computer") {
					var nodes = this.computer.nodes;
					var bonus = "+" + this.computer.bonus;
					var nodesWord = integerToWord(nodes);
					desc = bonus + " any " + nodesWord + " check" + (nodes > 1 ? "s" : "") + " per round";
				}
				return desc;
			},
			computerCountermeasures: function() {
				return this.getItemById("computerCountermeasures", this.params.computerCountermeasuresId);
			},
			computerCountermeasuresBpCost: function() {
				var cost = 0;
				if(this.computerCountermeasures.id !== "none") {
					cost = Math.round(this.tier.value / 2);
				}
				return cost;
			},
			crewQuarters: function() {
				return this.getItemById("crewQuarters", this.params.crewQuartersId);
			},
			crewDescriptions: function() {
				var desc = {};
				for(role in this.params.crewSkills) {
					desc[role] = "";
					for(skill in this.params.crewSkills[role].skills) {
						var skillObj = this.params.crewSkills[role].skills[skill];
						if(
							skillObj.modifier != 0 ||
							(typeof skillObj.ranks !== "undefined" && skillObj.ranks != 0)
						) {
							// skill names
							desc[role] += this.getItemById("skill", skill).name + " ";
							// skill modifier
							var modifier = parseInt(skillObj.modifier);
							if( isset(skillObj.ranks) ) {
								modifier += parseInt(skillObj.ranks);
							}
							if( skill == "computers") {
								modifier += parseInt(this.skillModifierComputers);
							}
							if( skill == "piloting") {
								modifier += parseInt(this.skillModifierPiloting);
							}
							desc[role] += this.getPrefixedModifier(modifier);
							// skill ranks
							if( isset(skillObj.ranks) ) {
								desc[role] += " (" + skillObj.ranks + " " + pluralise("rank", skillObj.ranks) + ")";
							}
							// comma
							desc[role] += ", ";
						}
					}
					// remove final comma
					desc[role] = desc[role].substr(0, desc[role].length - 2);
				}
				return desc;
			},
			criticalThreshold: function() {
				return Math.round(this.hp / 5);
			},
			defensiveCountermeasures: function() {
				return this.getItemById("defensiveCountermeasures", this.params.defensiveCountermeasuresId);
			},
			driftEngine: function() {
				return this.getItemById("driftEngine", this.params.driftEngineId);
			},
			driftEngineBpCost: function() {
				return this.driftEngine.bpCostMultiplier * this.sizeCategory.multiplier;
			},
			expansionBays: function() {
				var expansionBays = [];
				for(var i = 0; i < this.frame.expansionBays; i++) {
					expansionBays[i] = this.getItemById("expansionBay", this.params.expansionBayIds[i]);
				}
				return expansionBays;
			},
			expansionBaysCountUsed: function() {
				var countUsed = 0;
				for(i in this.expansionBays) {
					if(this.expansionBays[i].id !== "none") {
						countUsed += this.expansionBays[i].numBays;
					}
				}
				return countUsed;
			},
			expansionBaysDescription: function() {
				var expansionBaysByType = {};
				for(index in this.expansionBays) {
					var expansionBayId = this.expansionBays[index].id;
					maybeCreateProperty(expansionBaysByType, expansionBayId, "Integer");
					expansionBaysByType[expansionBayId]++;
				}
				var expansionBaysDescription = "";
				var sep = ", ";
				for(id in expansionBaysByType) {
					if(id !== "none") {
						var expansionBayName = this.getItemById("expansionBay", id).name.toLowerCase();
						var expansionBayQuantity = expansionBaysByType[id] == 1 ? "" : " (" + expansionBaysByType[id] + ")";
						var expansionBayDesc = expansionBayName + expansionBayQuantity + sep;
						expansionBaysDescription += expansionBayDesc;
					}
				}
				expansionBaysDescription = expansionBaysDescription.substr(0, expansionBaysDescription.length - sep.length);
				return expansionBaysDescription;
			},
			expansionBaysTotalBpCost: function() {
				return this.getSumOfPropertyValuesInCollection(this.expansionBays, "bpCost");
			},
			expansionBaysTotalPcuCost: function() {
				return this.getSumOfPropertyValuesInCollection(this.expansionBays, "pcuCost");
			},
			frame: function() {
				var frame = this.getItemById("frame", this.params.frameId);
				this.syncExpansionBays( frame.expansionBays );
				this.syncShipWeapons( frame.mounts );
				this.setCrewQuarters( frame.size );
				return frame;
			},
			hasSecurity: function() {
				return (this.params.hasAntiHackingSystems || this.params.antiPersonnelWeaponId !== "none" ||
					this.params.hasBiometricLocks || this.params.computerCountermeasuresId !== "none" ||
					this.params.hasSelfDestructSystem);
			},
			hp: function() {
				return this.frame.hp + (this.tier.hpIncrease * this.frame.hpIncrement);
			},
			isBpCostOverBudget: function() {
				return (this.totalBpCost > this.tier.bpBudget);
			},
			isComplementValid: function() {
				var isComplementValid = true;
				if( this.complement < this.frame.minCrew || this.complement > this.frame.maxCrew) {
					isComplementValid = false;
				}
				return isComplementValid;
			},
			isPcuCostOverBudget: function() {
				return (this.totalPcuCost > this.powerCore.pcuBudget);
			},
			isExpansionBaysCountOverBudget: function() {
				return (this.expansionBaysCountUsed > this.frame.expansionBays);
			},
			jsonParams: function() {
				var jsonParams = cloneObject(this.params);
				jsonParams["isSetDefaultCrewSkillValues"] = 0; // Because otherwise crew skills get overwritten!
				return JSON.stringify(jsonParams);
			},
			maneuverabilityRating: function() {
				return this.getItemById("maneuverabilityRating", this.frame.maneuverability);
			},
			modifiersDescription: function() {
				var desc = [];
				// computer nodes
				if(this.computer.id !== "basic-computer") {
					desc.push(this.computerDescription);
				}
				// Computers skill
				if(this.skillModifierComputers !== 0) {
					desc.push(this.getPrefixedModifier(this.skillModifierComputers) + " Computers");
				}
				// Piloting skill
				if(this.skillModifierPiloting !== 0) {
					desc.push(this.getPrefixedModifier(this.skillModifierPiloting) + " Piloting");
				}
				return desc.join(", ");
			},
			pilotingRanks: function() {
				var pilotingRanks = 0;
				var crewSkills = this.params.crewSkills;
				if(crewSkills.pilot.hasRole) {
					pilotingRanks = parseInt(crewSkills.pilot.skills.piloting.ranks);
				} else if( crewSkills.captain.hasRole ) {
					pilotingRanks = parseInt(crewSkills.captain.skills.piloting.ranks);
				}
				return pilotingRanks;
			},
			powerCore:function() {
				return this.getItemById("powerCore", this.params.powerCoreId);
			},
			powerCoreSizeList: function() {
				return this.powerCore.sizes.join(", ");
			},
			roleDescription: function() {
				roleDesc = {};
				for(role in this.params.crewSkills) {
					roleDesc[role] = this.getItemById("role", role).name;
					var roleObj = this.params.crewSkills[role];
					if(isset(roleObj.countOfficers) && roleObj.countOfficers > 0) {
						if(isset(roleObj.countOfficerCrew) && roleObj.countOfficerCrew > 0) {
							// at least one officer with large team
							var officers = [];
							officers.push( roleObj.countOfficers + " " + pluralise("officer", roleObj.countOfficers) );
							officers.push( roleObj.countOfficerCrew + " crew" + (roleObj.countOfficers > 1 ? " each" : ""));
							roleDesc[role] += " (" + officers.join(", ") + ")";
						} else if(roleObj.countOfficers > 1) {
							// more than one officer
							roleDesc[role] += " (" + roleObj.countOfficers + ")";
						}
					}
				}
				return roleDesc;
			},
			securityDescription: function() {
				var desc = [];
				if(this.params.hasAntiHackingSystems) {
					desc.push("anti-hacking systems");
				}
				if(this.params.antiPersonnelWeaponId !== "none") {
					desc.push( "anti-personnel weapon (" + this.antiPersonnelWeapon.name.toLowerCase() + ")" );
				}
				if(this.params.hasBiometricLocks) {
				   desc.push("biometric locks");
				}
				if(this.params.computerCountermeasuresId !== "none") {
				   desc.push( "computer countermeasures (" + this.computerCountermeasures.name.toLowerCase() + ")" );
				}
				if(this.params.hasSelfDestructSystem) {
				   desc.push( "self-destruct system" );
				}
				return desc.join(", ");
			},
			securityTotalBpCost: function() {
				return this.antiHackingSystemsBpCost + 
					this.antiPersonnelWeaponBpCost +
					this.biometricLocksBpCost +
					this.computerCountermeasuresBpCost +
					this.selfDestructSystemBpCost;
			},
			selectOptions: function() {
				var selectOptions = {};
				var fields = [
					"tier",
					"frame",
					"powerCore",
					"thrusters",
					"armour",
					"computer",
					"crewQuarters",
					"defensiveCountermeasures",
					"driftEngine",
					"expansionBay",
					"personalWeapon",
					"computerCountermeasures",
					"sensors",
					"shields",
					"shipWeapon",
					"role",
					"skill",
					"sampleShip"
				];
				for(i in fields) {
					var field = fields[i];
					selectOptions[field] = this.getSelectOptionsFor(field);
				}
				return selectOptions;
			},
			selfDestructSystemBpCost: function() {
				return this.params.hasSelfDestructSystem * 5 * this.sizeCategory.multiplier;
			},
			sensors: function() {
				return this.getItemById("sensors", this.params.sensorsId);
			},
			shields: function() {
				return this.getItemById("shields", this.params.shieldsId);
			},
			shieldsByPosition: function() {
				var totalSp = this.shields.totalSp;
				var positions = ["forward", "aft", "port", "starboard"];
				var shieldsByPosition = {};
				for(position in positions) {
					shieldsByPosition[positions[position]] = 0;
				}
				var position = 0;
				while (totalSp > 0) {
					shieldsByPosition[positions[position]]++;
					totalSp--;
					if(position == positions.length - 1) {
						position = 0;
					} else {
						position++;
					}
				}
				return shieldsByPosition;
			},
			shipWeapons: function() {
				var shipWeapons = [];
				var i = 0;
				for(position in this.frame.mounts) {
					for(index in this.frame.mounts[position]) {
						shipWeapons[i] = cloneObject(this.getItemById("shipWeapon", this.params.shipWeaponIds[i].id));
						shipWeapons[i].positionName = this.getItemById("weaponPosition", position).name;
						i++;
					}
				}
				return shipWeapons;
			},
			shipWeaponsTotalBpCost: function() {
				return this.getSumOfPropertyValuesInCollection(this.shipWeapons, "bpCost");
			},
			shipWeaponsTotalPcuCost: function() {
				return this.getSumOfPropertyValuesInCollection(this.shipWeapons, "pcuCost");
			},
			sizeCategory: function() {
				return this.getItemById("sizeCategory", this.frame.size);
			},
			skillModifierComputers: function() {
				return this.sensors.modifier;
			},
			skillModifierPiloting: function() {
				return this.maneuverabilityRating.pilotingModifier +
					this.thrusters.pilotingModifier
				;
			},
			skillTotals: function() {
				var skillTotals = {};
				for(role in this.params.crewSkills) {
					skillTotals[role] = {};
					for(skill in this.params.crewSkills[role].skills) {
						var skillObj = this.params.crewSkills[role].skills[skill];
						skillTotals[role][skill] = parseInt(skillObj.modifier);
						if( isset(skillObj.ranks) ) {
							skillTotals[role][skill] += parseInt(skillObj.ranks);
						}
						if( skill == "computers" ) {
							skillTotals[role][skill] += this.skillModifierComputers;
						}
						if( skill == "piloting" ) {
							skillTotals[role][skill] += this.skillModifierPiloting;
						}
					}
				}
				return skillTotals;
			},
			systemsDescription: function(){
				var desc = [];
				// sensors
				desc.push( this.sensors.id == "none" ? "no sensors" : this.sensors.name.toLowerCase() + " sensors" );
				// crew quarters
				if( this.params.crewQuartersId !== "none" ) {
					desc.push( "crew quarters (" + this.crewQuarters.name.toLowerCase() + ")" );
				} 
				// armour
				if( this.params.armourId !== "none" ) {
					desc.push( this.armour.name.toLowerCase() );
				}
				// defences
				if( this.params.defensiveCountermeasuresId !== "none" ) {
					desc.push( this.defensiveCountermeasures.name.toLowerCase() );
				}
				// computer
				desc.push( this.computer.name.toLowerCase() + (this.computer.id == "basic-computer" ? "" : " computer") );
				return desc.join(", ");
			},
			targetLock: function() {
				return 10 +
					this.defensiveCountermeasures.defCMBonusToTl +
					this.sizeCategory.acAndTlModifier +
					this.armour.targetLockModifier +
					this.pilotingRanks
				;
			},
			thrusters: function () {
				return this.getItemById("thrusters", this.params.thrustersId);
			},
			tier: function() {
				var tier = this.getItemById("tier", this.params.tierId);
				return tier;
			},
			totalPcuCost: function() {
				return this.thrusters.pcuCost +
					this.computer.pcuCost +
					this.defensiveCountermeasures.pcuCost +
					this.expansionBaysTotalPcuCost +
					this.shields.pcuCost +
					this.shipWeaponsTotalPcuCost
				;
			},
			totalBpCost: function() {
				return this.frame.bpCost +
					this.powerCore.bpCost +
					this.thrusters.bpCost +
					this.armourBpCost +
					this.computer.bpCost +
					this.crewQuarters.bpCost +
					this.defensiveCountermeasures.bpCost +
					this.driftEngineBpCost +
					this.expansionBaysTotalBpCost +
					this.antiHackingSystemsBpCost + 
					this.antiPersonnelWeaponBpCost +
					this.biometricLocksBpCost +
					this.computerCountermeasuresBpCost +
					this.selfDestructSystemBpCost +
					this.sensors.bpCost +
					this.shields.bpCost +
					this.shipWeaponsTotalBpCost
				;
			}
		},
		methods: {
			getSelectOptionsFor: function(prop) {
				this.testThatPropExists(prop);
				this.testThatPropIsArray(prop);
				for(item in this.data[prop].data) {
					this.testThatItemHasId(prop, item);
					this.testThatItemHasName(prop, item);
				}
				return this.data[prop].data;
			},
			testThatPropExists: function(prop) {
				if( !isset(this.data[prop]) ) {
					throw "Property " + prop + " does not exist";
				}
			},
			testThatPropIsArray: function(prop) {
				if(typeof this.data[prop].data !== "object") {
					throw "Property " + prop + " is not an array";
				}
			},
			testThatItemHasId: function(prop, item) {
				if( !isset(this.data[prop].data[item].id) ) {
					throw "Property " + prop + "[" + item + "] does not have an id";
				}
			},
			testThatItemHasName: function(prop, item) {
				if( !isset(this.data[prop].data[item].name) ) {
					throw "Property " + prop + "[" + item + "] does not have a name";
				}
			},
			getItemById: function(prop, id) {
				this.testThatPropExists(prop);
				// find item
				var item = this.data[prop].data.find(function(item) {
					return item.id === id;
				});
				// test that item exists
				if(typeof item === "undefined") {
					console.log("There is no item " + prop + " that matches id " + id);
					item = this.data[prop].data.find(function(item) {
						return item.id === "none";
					});
				}
				return item;
			},
			syncExpansionBays: function( targetCountBays ) {
				this.popExcessExpansionBays( targetCountBays );
				this.maybeCreateExpansionBays(  targetCountBays );
			},
			popExcessExpansionBays: function( targetCountBays ) {
				var countBays = this.params.expansionBayIds.length;
				if( countBays > targetCountBays ) {
					for(var i = 0; i < countBays - targetCountBays; i++) {
						this.params.expansionBayIds.pop();
					}
				}
			},
			maybeCreateExpansionBays: function( targetCountBays ) {
				for(var i = 0; i < targetCountBays; i++) {
					if( !isset(this.params.expansionBayIds[i]) ) {
						this.params.expansionBayIds[i] = "none";
					}
				}
			},
			syncShipWeapons: function( mounts ) {
				this.popExcessShipWeapons( mounts );
				this.maybeCreateShipWeapons( mounts );
				this.sortShipWeapons();
			},
			popExcessShipWeapons: function( mounts ) {
				for(var i = this.params.shipWeaponIds.length - 1; i >= 0; i--) {
					var mountKey = this.params.shipWeaponIds[i].position;
					if( !this.doesWeaponExistAtMountPosition(mounts, mountKey, i) ) {
						this.params.shipWeaponIds.splice(i, 1);
					}
				}
			},
			doesWeaponExistAtMountPosition: function(mounts, mountKey, i) {
				var mountKeyAr = mountKey.split("_");
				var mountPosition = mountKeyAr[0];
				var mountIndex = mountKeyAr[1];
				var shipWeaponIdObj = this.params.shipWeaponIds.find(function(item) {
					return item.position == mountKey;
				});
				if(
					mounts.hasOwnProperty( mountPosition ) &&
					shipWeaponIdObj.weight == mounts[mountPosition][mountIndex]
				) {
					return true;
				}
				return false;
			},
			maybeCreateShipWeapons: function( mounts ) {
				for(position in mounts) {
					for(index in mounts[position]) {
						var mountKey = position + "_" + index;
						var shipWeaponIdObj = this.params.shipWeaponIds.find(function(item) {
							return item.position == mountKey;
						});
						if( !isset(shipWeaponIdObj) ) {
							var obj = {
								position: position + "_" + index,
								id: "none",
								weight: mounts[position][index]
							};
							this.params.shipWeaponIds.push(obj);
						}
					}
				}
			},
			sortShipWeapons: function() {
				this.params.shipWeaponIds.sort(function(weaponA, weaponB){
					return getSortKeyForShipWeapon(weaponA) - getSortKeyForShipWeapon(weaponB);
				});
			},
			setCrewQuarters: function( frameSize ) {
				if( frameSize == "Tiny" ) {
					if( this.params.crewQuartersId !== "none" ) {
						this.params.crewQuartersId = "none";
					}
				} else {
					if( this.params.crewQuartersId == "none" ) {
						this.params.crewQuartersId = "common";
					}
				}
			},
			getSumOfPropertyValuesInCollection: function(collection, property) {
				var total = 0;
				for(i in collection) {
					total += collection[i][property];
				}
				return total;
			},
			getShipWeaponAtPosition: function(position, index) {
				return this.getItemById("shipWeapon", this.params.shipWeaponIds[position][index]);
			},
			getShipWeaponPositionName: function(position) {
				var positionData = position.split("_");
				var positionTitle = this.getItemById("weaponPosition", positionData[0]).name;
				var positionIndex = parseInt(positionData[1]);
				var positionWeight = this.getFrameMountWeaponWeight(positionData[0], positionIndex);
				return positionTitle + " " + (positionIndex + 1) + " (" + positionWeight + ")";
			},
			getFrameMountWeaponWeight: function(position, index) {
				return this.frame.mounts[position][index];
			},
			setDefaultCrewSkillValues: function() {
				if(this.params.isSetDefaultCrewSkillValues) {
					var tier = this.getItemById("tier", this.params.tierId).value;
					if(tier < 1) {
						tier = 1;
					}
					for(role in this.params.crewSkills) {
						for(skill in this.params.crewSkills[role].skills) {
							var skillObj = this.params.crewSkills[role].skills[skill];
							if( skillObj.ranks > 0 ) {
								skillObj.ranks = tier;
							}
						}
					}
				}
			},
			getPrefixedModifier: function(val) {
				var prefix = (val >= 0) ? "+" : "";
				return prefix + val;
			},
			convertJsonInput: function() {
				var params = JSON.parse(this.json);
				this.params = params;
				this.fixMissingParamsValues();
			},
			clearAll: function() {
				this.params = cloneObject(this.paramsReset);
				this.json = "";
				document.getElementById("sampleShipSelect").value = "none";
			},
			initParams: function() {
				this.params = cloneObject(this.paramsReset);
			},
			inputSampleShipParams: function() {
				var sampleShipSelect = document.getElementById("sampleShipSelect");
				var sampleShipId = sampleShipSelect.value;
				if(sampleShipId !== "none") {
					var sampleShipObj = this.getItemById("sampleShip", sampleShipId);
					var sampleShipParams = cloneObject(sampleShipObj.params);
					this.params = sampleShipParams;
					this.fixMissingParamsValues();
				}
			},
			fixMissingParamsValues: function() {
				for(key in this.paramsReset){
					if( !isset(this.params[key]) ) {
						console.log("Missing param: " + key);
						this.params[key] = cloneObject(this.paramsReset[key]);
					}
				}
			}
		},
		beforeMount: function() {
			this.initParams();
		}
	});
	
}

/**
 * MAIN
 */

loadJSON(JSON_FILE, function(response) {
	var actual_JSON = JSON.parse(response);
	// console.log(actual_JSON);
	var ship = new Ship(actual_JSON);
});