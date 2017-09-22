var JSON_FILE = "data/ship-builder.json";

var WEAPON_SORT = {
	forwardArc: 0,
	portArc: 1,
	starboardArc: 2,
	aftArc: 3,
	turret: 4
};

var WEAPON_ARCS = [
	"forward", "aft", "port", "starboard"
];

/**
 * HELPERS
 */

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

String.prototype.pluralise = function( count ) {
	return this + (count == 1 ? "" : "s");
}

String.prototype.toTitleCase = function() {
	return this.replace(/\w\S*/g, function(txt){
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

function isEven(num) {
	var isEven = (num % 2) == 0;
	return isEven;
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
				version:"1.0.1",
				hasCrew:1,
				isSetDefaultCrewSkillValues:1,
				isUseStrictRules:1,
				shipName:"",
				shipConcept:"",
				tierId:"1",
				frameId:"light-freighter",
				powerCoreIds:["none"],
				thrustersId:"none",
				armourId:"none",
				computerId:"basic-computer",
				crewQuartersId:"common",
				defensiveCountermeasuresId:"none",
				driftEngineId:"none",
				expansionBayIds:["none","none","none"],
				antiHackingSystemsId: "none",
				antiPersonnelWeaponId:"none",
				hasBiometricLocks:0,
				computerCountermeasures: {
					alarm: false,
					fakeShell: false,
					feedback: false,
					firewall: false,
					lockout: false,
					shockGridId: "none",
					wipe: false
				},
				hasSelfDestructSystem:0,
				sensorsId:"none",
				shieldsId:"none",
				weaponMounts: {
					forward: [
						{
							weaponId: "none",
							weight: "light",
							templateWeight: "light",
							isFromTemplate: true,
							canBeLinked: false,
							isLinked: false
						},
						{
							weaponId: "none",
							weight: "light",
							templateWeight: "light",
							isFromTemplate: true,
							canBeLinked: false,
							isLinked: false
						}
					],
					aft: [],
					port: [
						{
							weaponId: "none",
							weight: "light",
							templateWeight: "light",
							isFromTemplate: true,
							canBeLinked: false,
							isLinked: false
						}
					],
					starboard: [
						{
							weaponId: "none",
							weight: "light",
							templateWeight: "light",
							isFromTemplate: true,
							canBeLinked: false,
							isLinked: false
						}
					],
					turret: []
				},
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
			antiHackingSystems: function() {
				var antiHackingSystems = this.getItemById("antiHackingSystems", this.params.antiHackingSystemsId);
				antiHackingSystems.getOutputName = function() {
					var outputName = this.name.toLowerCase();
					if(this.id !== "none") {
						outputName += " (DC +" + this.dcMod + ")";
					}
					return outputName;
				};
				return antiHackingSystems;
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
			computerCountermeasuresBpCost: function() {
				var total = 0;
				for(measure in this.params.computerCountermeasures) {
					if( measure == "shockGridId" ) {
						total += this.shockGridBpCost;
					} else {
						if( this.params.computerCountermeasures[measure] == true ) {
							total += this.computerTier;
						}
					}
				}
				return total;
			},
			computerCountermeasuresDescription: function() {
				var desc = [];
				for(measure in this.params.computerCountermeasures) {
					if( measure == 'shockGridId') {
						if(this.params.computerCountermeasures[measure] !== "none") {
							var shockGridDesc = 'shock grid ' + this.shockGrid.rank +
								' [DC ' + this.shockGrid.dc +
								', ' + this.shockGrid.damage + ']';
							desc.push(shockGridDesc);
						}
					} else {
						if(this.params.computerCountermeasures[measure] == true) {
							var cmName = this.getItemById('computerCountermeasures', measure).name.toLowerCase();
							desc.push(cmName);
						}
					}
				}
				return desc.join(', ');
			},
			computerTier: function() {
				var shipTier = this.tier.value;
				return ( shipTier < 2 ? 1 : Math.floor( shipTier * 0.5 ) );
			},
			countPowerCoreHousings: function() {
				var countHousings = this.sizeCategory.countPowerCoreHousings;
				if(
					(this.sizeCategory.id == "Medium" || this.sizeCategory.id == "Large") &&
					this.hasPowerCoreHousingExpansionBay
				) {
					countHousings++;
				}
				this.adjustPowerCoreIds(countHousings);
				return countHousings;
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
								desc[role] += " (" + skillObj.ranks + " " + "rank".pluralise(skillObj.ranks) + ")";
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
				return frame;
			},
			hasComputerCountermeasures: function() {
				for(measure in this.params.computerCountermeasures) {
					if( measure == 'shockGridId') {
						if(this.params.computerCountermeasures[measure] !== "none") {
							return true;
						}
					} else {
						if(this.params.computerCountermeasures[measure] == true) {
							return true;
						}
					}
				}
				return false;
			},
			hasPowerCoreHousingExpansionBay: function() {
				var result = false;
				for( i in this.params.expansionBayIds ) {
					if( this.params.expansionBayIds[i] == "power-core-housing") {
						result =  true;
					}
				}
				return result;
			},
			hasSecurity: function() {
				return (this.params.antiHackingSystemsId !== "none" ||
					this.params.antiPersonnelWeaponId !== "none" ||
					this.params.hasBiometricLocks ||
					this.hasComputerCountermeasures ||
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
				return (this.totalPcuCost.essential > this.pcuBudget);
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
			pcuBudget: function() {
				var pcuBudget = 0;
				for(i in this.powerCores) {
					pcuBudget += this.powerCores[i].pcuBudget;
				}
				return pcuBudget;
			},
			powerCoreDescription: function() {
				var desc = [];
				for(i in this.powerCores) {
					var powerCore = this.powerCores[i];
					if(powerCore.id !== "none") {
						desc.push(powerCore.name + " (" + powerCore.pcuBudget + " PCU)");
					}
				}
				return desc.join(", ");
			},
			powerCores: function() {
				powerCores = [];
				for(i in this.params.powerCoreIds) {
					var powerCore = cloneObject( this.getItemById("powerCore", this.params.powerCoreIds[i]) );
					powerCore.sizeList = powerCore.sizes.join(", ");
					powerCores.push( powerCore );
				}
				return powerCores;
			},
			powerCoresBpCost:function() {
				var bpCost = 0;
				for(i in this.powerCores) {
					bpCost += this.powerCores[i].bpCost;
				}
				return bpCost;
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
							officers.push( roleObj.countOfficers + " " + "officer".pluralise(roleObj.countOfficers) );
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
				if(this.params.antiHackingSystemsId !== "none") {
					desc.push(this.antiHackingSystems.getOutputName());
				}
				if(this.params.antiPersonnelWeaponId !== "none") {
					desc.push( "anti-personnel weapon (" + this.antiPersonnelWeapon.name.toLowerCase() + ")" );
				}
				if(this.params.hasBiometricLocks) {
				    desc.push("biometric locks");
				}
				if(this.hasComputerCountermeasures) {
					desc.push("computer countermeasures (" + this.computerCountermeasuresDescription + ")");
				}
				if(this.params.hasSelfDestructSystem) {
				   desc.push( "self-destruct system" );
				}
				return desc.join(", ");
			},
			securityTotalBpCost: function() {
				return this.antiHackingSystems.bpCost + 
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
					"antiHackingSystems",
					"personalWeapon",
					"computerCountermeasures",
					"shockGrid",
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
			shipName: function() {
				return (this.params.shipName == "" ? "New Ship" : this.params.shipName);
			},
			shockGrid: function() {
				return this.getItemById("shockGrid", this.params.computerCountermeasures.shockGridId);
			},
			shockGridBpCost: function() {
				return this.shockGrid.bpCostMultiplier * this.computerTier;
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
				return {
					essential: this.thrusters.pcuCost +
						this.defensiveCountermeasures.pcuCost +
						this.shields.pcuCost +
						this.weaponsTotalCosts.weaponsPcu,
					nonEssential: this.computer.pcuCost +
						this.expansionBaysTotalPcuCost
				};
			},
			totalBpCost: function() {
				return this.frame.bpCost +
					this.powerCoresBpCost +
					this.thrusters.bpCost +
					this.armourBpCost +
					this.computer.bpCost +
					this.crewQuarters.bpCost +
					this.defensiveCountermeasures.bpCost +
					this.driftEngineBpCost +
					this.expansionBaysTotalBpCost +
					this.antiHackingSystems.bpCost + 
					this.antiPersonnelWeaponBpCost +
					this.biometricLocksBpCost +
					this.computerCountermeasuresBpCost +
					this.selfDestructSystemBpCost +
					this.sensors.bpCost +
					this.shields.bpCost +
					this.weaponsTotalCosts.weaponsBp +
					this.weaponsTotalCosts.weaponMountsBp +
					this.weaponsTotalCosts.weaponLinksBp
				;
			},
			turn: function() {
				return this.maneuverabilityRating.turn + this.armour.turnDistanceModifier;
			},
			weaponDescriptions: function() {
				var desc = {};
				for(position in this.weaponMounts) {
					var positionDesc = [];
					for(i in this.weaponMounts[position]) {
						var mount = this.weaponMounts[position][i];
						var prevI = parseInt(i) - 1;
						var mountDesc = "";
						
						// if this is the second of a linked set, skip this mount
						if(
							isset( this.weaponMounts[position][prevI] ) &&
							this.weaponMounts[position][prevI].isLinked
						) {
							continue;
						}
						
						// get description
						if(mount.weapon.id !== "none") {
							var weaponName = mount.weapon.name.toLowerCase();
							if( mount.isLinked ) {
								mountDesc = "linked " + weaponName.pluralise(2) + " (" + mount.weapon.damage + ")"
							} else {
								mountDesc = weaponName + " (" + mount.weapon.damage + ")"
							}
							positionDesc.push(mountDesc);
						}
					}
					if(positionDesc.length > 0) {
						desc[position] = positionDesc.join(", ");
					}
				}
				return desc;
			},
			weaponMounts: function() {
				var weaponMounts = {};
				for(position in this.params.weaponMounts ) {
					weaponMounts[position] = [];
					for(i in this.params.weaponMounts[position]) {
						var params = cloneObject(this.params.weaponMounts[position][i]);
						params.position = position;
						var mountObj = new WeaponMount(params);
						var weaponObj = this.getItemById('shipWeapon', mountObj.weaponId);
						weaponMounts[position][i] = {
							weight: params.weight,
							mountBpCost: mountObj.getCost(),
							weapon: this.getItemById('shipWeapon', params.weaponId),
							canBeUpgraded: this.canWeaponMountBeUpgraded(position, params.weight),
							canBeDowngraded: this.canWeaponMountBeDowngraded(params.weight, params.isFromTemplate,
								params.templateWeight),
							isFromTemplate: params.isFromTemplate,
							isLinked: params.isLinked,
							linkCost: params.isLinked ? Math.floor(weaponObj.bpCost * 0.5) : 0
						};
					}
				}
				return weaponMounts;
			},
			weaponsTotalCosts: function() {
				var totals = {
					weaponLinksBp: 0,
					weaponMountsBp: 0,
					weaponsBp: 0,
					weaponsPcu: 0
				};
				for(position in this.weaponMounts) {
					for(i in this.weaponMounts[position]) {
						var mount = this.weaponMounts[position][i];
						totals.weaponMountsBp += mount.mountBpCost;
						totals.weaponsBp += mount.weapon.bpCost;
						totals.weaponsPcu += mount.weapon.pcuCost;
						totals.weaponLinksBp += mount.linkCost;
					}
				}
				return totals;

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
			updateFrame: function() {
				this.syncExpansionBays( this.frame.expansionBays );
				this.setCrewQuarters( this.frame.size );
				this.setWeaponMounts( this.frame.mounts );
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
			setWeaponMounts: function(mounts) {
				this.clearWeaponMounts();
				// console.log(this.params.weaponMounts);
				var positions = ["forward", "aft", "port", "starboard", "turret"];
				for(i in positions) {
					var position = positions[i];
					if( isset(mounts[position]) ) {
						var mountsInCurrentPosition = mounts[position];
						for(j in mountsInCurrentPosition) {
							var mountWeight = mountsInCurrentPosition[j];
							var objMount = {
								weaponId: "none",
								weight: mountWeight,
								templateWeight: mountWeight,
								isFromTemplate: true,
								canBeLinked: false,
								isLinked: false
							}
							this.params.weaponMounts[position].push(objMount);
						} // for j
					} // if
				} // for i
			},
			clearWeaponMounts: function() {
				for(position in this.params.weaponMounts) {
					// var mountList = this.params.weaponMounts[position];
					this.params.weaponMounts[position].splice(0, this.params.weaponMounts[position].length); // start, deleteCount
				}
				// console.log(this.params.weaponMounts);
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
			},
			createWeaponMount: function(position) {
				var newMount = {
					weaponId: "none",
					weight: "light",
					isFromTemplate: false
				};
				this.params.weaponMounts[position].push(newMount);
			},
			destroyWeaponMount: function(position, i) {
				this.params.weaponMounts[position].splice(i, 1); // start, deleteCount
			},
			canWeaponMountBeCreated: function(position) {
				var result = true;
				var countMountsInPosition = this.params.weaponMounts[position].length;
				if(countMountsInPosition >= this.sizeCategory.maxMounts) {
					result = false;
				}
				return result;
			},
			upgradeWeaponMount: function(position, i) {
				var weaponMount = this.params.weaponMounts[position][i];
				if(weaponMount.weight == "light") {
					weaponMount.weight = "heavy";
				} else {
					weaponMount.weight = "capital";
				}
				weaponMount.weaponId = "none";
			},
			downgradeWeaponMount: function(position, i) {
				var weaponMount = this.params.weaponMounts[position][i];
				if(weaponMount.weight == "capital") {
					weaponMount.weight = "heavy";
				} else {
					weaponMount.weight = "light";
				}
				weaponMount.weaponId = "none";
			},
			canWeaponMountBeUpgraded: function(position, weight) {
				var result = true;
				var weights = {light: 0, heavy: 1, capital: 2};
				// check weight
				// Heavy weapon mounts can only appear on a Medium or larger ship,
				// capital weapon mounts can only appear on a Huge or larger ship.
				if(weights[weight] >= weights[this.sizeCategory.maxMountWeight]) {
					result = false;
				} else {
					if(position == "turret") {
						if( weight !== "light" ) {
							result = false; 
						}
					} else {
						if( weight == "capital") {
							result = false;
						}
					}
				}
				return result;
			},
			canWeaponMountBeDowngraded: function(weight, isFromTemplate, templateWeight) {
				var result = true;
				if( weight == "light" ) {
					result = false;
				} else {
					var weights = {
						heavy: 1,
						capital: 2
					};
					if( isFromTemplate ) {
						if(weight == templateWeight ) {
							result = false;
						}
					}
				}
				return result;
			},
			setWeaponLinking: function(position) {
				var mountsInArc = this.params.weaponMounts[position];
				for(i in mountsInArc) {
					var nextI = parseInt(i) + 1;
					if(
						mountsInArc[i].weaponId !== "none" &&
						isEven(i) &&
						isset( mountsInArc[nextI] ) &&
						mountsInArc[i].weaponId == mountsInArc[nextI].weaponId
					) {
						mountsInArc[i].canBeLinked = true;
					} else {
						mountsInArc[i].canBeLinked = false;
						mountsInArc[i].isLinked = false;
					}
				}
			},
			adjustPowerCoreIds: function(countHousings) {
				if( this.params.powerCoreIds.length < countHousings ) {
					for(var i = this.params.powerCoreIds.length; i < countHousings; i++) {
						this.params.powerCoreIds[i] = "none";
					}
				} else if( this.params.powerCoreIds.length > countHousings ) {
					var splicePos = countHousings;
					var spliceLen = this.params.powerCoreIds.length - countHousings;
					this.params.powerCoreIds.splice(splicePos, spliceLen);
				}
			}
		},
		beforeMount: function() {
			this.initParams();
		}
	});
	
} // Ship class

function WeaponMount(params) {
	// params expects: weaponMountId, position, weaponId, weight, isFromTemplate, canBeLinked, isLinked
	// maybe expects templateWeight
	this.id = params.weaponMountId;
	this.position = params.position;
	this.weaponId = params.weaponId;
	this.weight = params.weight;
	this.isFromTemplate = params.isFromTemplate;
	if( this.isFromTemplate ) {
		this.templateWeight = params.templateWeight;
	} else {
		this.templateWeight = "light";
	}
	this.canBeLinked = params.canBeLinked;
	this.isLinked = params.isLinked;
	
	this.doTests = function() {
		this.testThatPositionIsValid();
		this.testThatWeightIsValid(this.weight);
		this.testThatWeightIsValid(this.templateWeight);
		this.testThatTemplateWeightIsSmallerThanWeight();
		this.testThatTurretIsNotCapital();
	}
	
	this.testThatPositionIsValid = function() {
		if(["forward", "aft", "port", "starboard", "turret"].indexOf(this.position) == -1) {
			throw "Invalid position in WeaponMount class: " + this.position;
		}
	}
	
	this.testThatWeightIsValid = function(weight) {
		if(["light", "heavy", "capital"].indexOf(weight) == -1) {
			throw "Invalid weight in WeaponMount class: " + weight;
		}
	}
	
	this.testThatTemplateWeightIsSmallerThanWeight = function() {
		var weightVal = {
			light: 0,
			heavy: 1,
			capital: 2
		}
		if( weightVal[this.weight] < weightVal[this.templateWeight] ) {
			throw "Original weight must be equal to or lower than current weight";
		}
	}
	
	this.testThatTurretIsNotCapital = function() {
		if( this.position == "turret" && (this.weight == "capital" || this.templateWeight == "capital") ) {
			throw "Turrets cannot have weight 'capital' in WeaponMount";
		}
	}
	
	this.getUpgradeCost = function() {
		var upgradeCost = 0;
		if( this.weight !== this.templateWeight ) {
			// if position is forward, aft, port or starboard arc
			if( WEAPON_ARCS.indexOf(this.position) !== -1 ) {
				// if templateWeight is light and weight is heavy
				if(this.templateWeight == "light" && this.weight == "heavy") {
					upgradeCost = 4;
				} else if( this.templateWeight == "heavy" && this.weight == "capital" ) {
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
	}
	
	this.getNewMountCost = function() {
		var newMountCost = 0;
		if(!this.isFromTemplate) {
			if(this.position == "turret") {
				newMountCost = 5;
			} else {
				newMountCost = 3;
			}
		}
		return newMountCost;
	}
	
	this.getCost = function() {
		return this.getUpgradeCost() + this.getNewMountCost();
	}
	
	// constructor???
	
	this.doTests();
	
}

/**
 * MAIN
 */

loadJSON(JSON_FILE, function(response) {
	var actual_JSON = JSON.parse(response);
	// console.log(actual_JSON);
	var ship = new Ship(actual_JSON);
});