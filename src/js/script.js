var JSON_FILE = "data/ship-builder.json";

var WEAPON_SORT = {
	forwardArc: 0,
	portArc: 1,
	starboardArc: 2,
	aftArc: 3,
	turret: 4,
	spinal: 5
};

var WEAPON_ARCS = [
	"forward", "aft", "port", "starboard"
];
/*
|------------------------------------------------------------------------------------------
| HELPERS
|------------------------------------------------------------------------------------------
*/
function maybeCreateProperty(obj, prop, type) {
	if (typeof obj !== "object") {
		throw "Not an object";
	}
	if (typeof obj[prop] === "undefined") {
		switch (type) {
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
/*
|------------------------------------------------------------------------------------------
*/
function isset(obj) {
	if (typeof obj === "undefined") {
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
function integerToWord( int ) {
	var word = "";
	switch (int) {
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
	var numbers = str.split("/");
	if (numbers.length != 1 && numbers.length != 2) return 1;
	if (parseInt(numbers[0]) === NaN || parseInt(numbers[1]) === NaN) return 1;

	// test if integer
	if (numbers.length == 1) return parseFloat(numbers[0]);

	// test if denominator is 0
	if (numbers[2] == 1) return 1; // div 0

	return parseInt(numbers[0]) / parseInt(numbers[1])
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
	if (str == "Special") return "Special";

	var formula = {
		ctDice: 0,
		ctFaces: 0,
		mod: 0,
		mult: 1
	};

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
/*
|------------------------------------------------------------------------------------------
*/
function addTimedClass( obj, className, duration )
{
	addClass( obj, className );
	setTimeout(function(){
		removeClass( obj, className );
	}, duration);
}
/*
|------------------------------------------------------------------------------------------
*/
function addClass( obj, className ) {
	obj.className += ' ' + className;
}
/*
|------------------------------------------------------------------------------------------
*/
function removeClass( obj, className ) {
	obj.className = obj.className.replace(className, '');
}
/*
|------------------------------------------------------------------------------------------
*/
String.prototype.pluralise = function( count ) {
	return this + (count == 1 ? "" : "s");
}
/*
|------------------------------------------------------------------------------------------
*/
String.prototype.toTitleCase = function() {
	return this.replace(/\w\S*/g, function(txt){
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}
/*
|------------------------------------------------------------------------------------------
*/
function isEven(num) {
	var isEven = (num % 2) == 0;
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
		text: function( trigger ) {
			var el = document.getElementById('outputJson');
			addTimedClass( el, 'js-anim-border', 500 );
			return el.innerHTML;
		}
	});
}

/*
|------------------------------------------------------------------------------------------
| SHIP
|------------------------------------------------------------------------------------------
*/
function Ship(json) {
	
	this.app = new Vue({
        /*
        |----------------------------------------------------------------------------------
        */
		el: "#app",
        /*
        |----------------------------------------------------------------------------------
        */
		data: {
			data: json,
			// paramsReset: {"version":"1.0.1","hasCrew":true,"isSetDefaultCrewSkillValues":0,"isUseStrictRules":1,"shipName":"UIE Hiveguard","shipConcept":"Shirrens may prefer peace to war, but they still remember the terrifying capabilities of their former slave masters, the Swarm. These destroyers employ much of the same technology to create swift, deadly warships that can be operated by a small crew.","tierId":"6","frameId":"destroyer","powerCoreIds":["arcus-maximum"],"thrustersId":"l8","armorId":"mk-4","computerId":"mk-1-trinode","crewQuartersId":"common","defensiveCountermeasuresId":"mk-4","driftEngineId":"signal-basic","expansionBayIds":["cargo-hold","escape-pods","escape-pods","escape-pods"],"antiHackingSystemsId":"none","antiPersonnelWeaponId":"none","hasBiometricLocks":0,"computerCountermeasures":{"alarm":false,"fakeShell":false,"feedback":false,"firewall":false,"lockout":false,"shockGridId":"none","wipe":false},"hasSelfDestructSystem":0,"hasDataNet":0,"hasHiveJoining":0,"sensorsId":"basic-long-range","shieldsId":"light-60","weaponMounts":{"forward":[{"weaponId":"heavy-laser-net","weight":"heavy","templateWeight":"heavy","isFromTemplate":true,"canBeLinked":false,"isLinked":false},{"weaponId":"twin-laser","weight":"heavy","templateWeight":"heavy","isFromTemplate":true,"canBeLinked":false,"isLinked":false}],"aft":[{"weaponId":"none","weight":"light","templateWeight":"light","isFromTemplate":true,"canBeLinked":false,"isLinked":false}],"port":[{"weaponId":"flak-thrower","weight":"light","templateWeight":"light","isFromTemplate":true,"canBeLinked":false,"isLinked":false}],"starboard":[{"weaponId":"flak-thrower","weight":"light","templateWeight":"light","isFromTemplate":true,"canBeLinked":false,"isLinked":false}],"turret":[{"weaponId":"light-torpedo-launcher","weight":"light","templateWeight":"light","isFromTemplate":true,"canBeLinked":false,"isLinked":false}]},"crewSkills":{"captain":{"count":1,"countOfficers":0,"hasRole":1,"skills":{"bluff":{"modifier":7,"ranks":6},"computers":{"modifier":7,"ranks":6},"diplomacy":{"modifier":7,"ranks":6},"engineering":{"modifier":7,"ranks":6},"gunnery":{"modifier":13},"intimidate":{"modifier":7,"ranks":6},"piloting":{"modifier":7,"ranks":6}}},"engineer":{"hasRole":1,"skills":{"engineering":{"modifier":12,"ranks":6}},"countOfficers":1,"countOfficerCrew":3},"gunner":{"skills":{"gunnery":{"modifier":13}},"hasRole":1,"countOfficers":2,"countOfficerCrew":2},"pilot":{"skills":{"computers":{"modifier":0,"ranks":0},"gunnery":{"modifier":0},"piloting":{"modifier":7,"ranks":6}},"hasRole":1,"countOfficers":1,"countOfficerCrew":0},"scienceOfficer":{"skills":{"computers":{"modifier":7,"ranks":6}},"hasRole":1,"countOfficers":1,"countOfficerCrew":0},"chiefMate":{"countOfficers":1,"countOfficerCrew":0,"hasRole":false,"skills":{"acrobatics":{"modifier":0,"ranks":0},"athletics":{"modifier":0,"ranks":0}}},"magicOfficer":{"countOfficers":1,"countOfficerCrew":0,"hasRole":false,"skills":{"mysticism":{"modifier":0,"ranks":0}}}},"customFrameBaseId":"light-freighter","customComponents":[],"shieldsByPosition":{"forward":15,"aft":15,"port":15,"starboard":15}},
			paramsReset: {
				ablativeArmorId: "none",
                ablativeArmorByPosition: {
                    forward: 0,
                    aft: 0,
                    port: 0,
                    starboard: 0
                },
				antiHackingSystemsId: "none",
				antiPersonnelWeaponId:"none",
				armorId:"none",
				computerCountermeasures: {
					alarm: false,
					fakeShell: false,
					feedback: false,
					firewall: false,
					lockout: false,
					shockGridId: "none",
					wipe: false
				},
				computerId:"basic-computer",
				crewQuartersId:"common",
				crewSkills: {
					captain: {
						countOfficers: 0,
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
					}, // scienceOfficer
					chiefMate: {
						countOfficers: 1,
						countOfficerCrew: 0,
						hasRole: false,
						skills: {
							acrobatics: {
								modifier: 0,
								ranks: 0
							},
							athletics: {
								modifier: 0,
								ranks: 0
							},
						}
					}, // scienceOfficer
					magicOfficer: {
						countOfficers: 1,
						countOfficerCrew: 0,
						hasRole: false,
						skills: {
							mysticism: {
								modifier: 0,
								ranks: 0
							}
						}
					}, // scienceOfficer
				}, // crewSkills
	            customFrameBaseId: "light-freighter",
	            customComponents: [],
				defensiveCountermeasuresId:"none",
				deflectorShieldId: "none",
				driftEngineId:"none",
				expansionBayIds:["none","none","none"],
				frameId:"light-freighter",
				hasBiometricLocks:0,
				hasCrew:1,
				hasDataNet:0,
				hasHiveJoining:0,
				hasSelfDestructSystem:0,
				isSetDefaultCrewSkillValues:1,
				isUseStrictRules:1,
				powerCoreIds:["none"],
				sensorsId:"none",
				shieldType: "shields",
                shieldsByPosition: {
                    forward: 0,
                    aft: 0,
                    port: 0,
                    starboard: 0
                },
				shieldsId:"none",
				shipConcept:"",
				shipName:"",
				thrustersId:"none",
				tierId:"1",
				version:"1.0.1",
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
			}, // paramsReset
			params: {},
			json: "",
			selectSampleShipSortOrder: "name",
		},
        /*
        |----------------------------------------------------------------------------------
        */
		computed: {
            /*
            |------------------------------------------------------------------------------
            */
            ablativeArmor: function() {
				return this.getItemById("ablativeArmor", this.params.ablativeArmorId);
            },
            /*
            |------------------------------------------------------------------------------
            */
            ablativeArmorByPositionTotal: function() {
                var total = 0;
                for(position in this.params.ablativeArmorByPosition) {
                    total += parseInt(this.params.ablativeArmorByPosition[position]);
                }
                return total;
            },
            /*
            |------------------------------------------------------------------------------
            */
			antiHackingSystems: function() {
				var antiHackingSystems = this.getItemById("antiHackingSystems", this.params.antiHackingSystemsId);
				antiHackingSystems.getOutputName = function() {
					var outputName = this.name.toLowerCase();
					if (this.id !== "none") {
						outputName += " (DC +" + this.dcMod + ")";
					}
					return outputName;
				};
				return antiHackingSystems;
			},
            /*
            |------------------------------------------------------------------------------
            */
			antiPersonnelWeapon: function() {
				return this.getItemById("personalWeapon", this.params.antiPersonnelWeaponId);
			},
            /*
            |------------------------------------------------------------------------------
            */
			antiPersonnelWeaponBpCost: function() {
				return (this.antiPersonnelWeapon.type == "heavy" ? 5 : 0) + this.antiPersonnelWeapon.level;
			},
            /*
            |------------------------------------------------------------------------------
            */
			armor: function () {
				return this.getItemById("armor", this.params.armorId);
			},
            /*
            |------------------------------------------------------------------------------
            */
			armorBpCost: function() {
				return this.armor.bpCostMultiplier * this.sizeCategory.multiplier;
			},
            /*
            |------------------------------------------------------------------------------
            */
			armorClass: function() {
				return 10 +
					this.armor.bonusToAc +
					this.sizeCategory.acAndTlModifier +
					this.pilotingRanks +
					this.deflectorShield.bonusToAc
				;
			},
            /*
            |------------------------------------------------------------------------------
            */
			armorSpecial: function() {
				var output = [];
				var outputStr = "n/a";
				// targetLockModifier
				if (
					isset(this.armor.targetLockModifier) &&
					this.armor.targetLockModifier < 0
				) {
					output.push(this.armor.targetLockModifier + " TL");
				}
				// turnDistanceModifier
				if (
					isset(this.armor.turnDistanceModifier) &&
					this.armor.turnDistanceModifier > 0
				) {
					output.push("+" + this.armor.turnDistanceModifier + " turn distance");
				}
				// output
				if ( output.length > 0 ) {
					outputStr = output.join("; ");
				}
				return outputStr;
			},
            /*
            |------------------------------------------------------------------------------
            */
			biometricLocksBpCost: function() {
				return 5 * this.params.hasBiometricLocks;
			},
            /*
            |------------------------------------------------------------------------------
            */
			complement: function() {
				var complement = 0;

                for(roleIndex in this.params.crewSkills) {
                    var role = this.params.crewSkills[roleIndex];
                    
					if ( !role.hasRole ) continue;
                    
                    if ( roleIndex == 'captain' ) {
                        complement++;
                    }

                    var countOfficers = role.countOfficers ? parseInt(role.countOfficers) : 0;
                    var countOfficerCrew = role.countOfficerCrew ? parseInt(role.countOfficerCrew) : 0;

                    complement += countOfficers;
                    complement += (countOfficers * countOfficerCrew);
				}

                return complement;
			},
            /*
            |------------------------------------------------------------------------------
            */
			computer: function() {
				return this.getItemById("computer", this.params.computerId);
			},
            /*
            |------------------------------------------------------------------------------
            */
			computerDescription: function() {
				var desc = "";
				if (this.computer.id !== "basic-computer") {
					var nodes = this.computer.nodes;
					var bonus = "+" + this.computer.bonus;
					var nodesWord = integerToWord(nodes);
					desc = bonus + " any " + nodesWord + " check" + (nodes > 1 ? "s" : "") + " per round";
				}
				return desc;
			},
            /*
            |------------------------------------------------------------------------------
            */
			computerCountermeasuresBpCost: function() {
				var total = 0;
				for(measure in this.params.computerCountermeasures) {
					if ( measure == "shockGridId" ) {
						total += this.shockGridBpCost;
					} else {
						if ( this.params.computerCountermeasures[measure] == true ) {
							total += this.computerTier;
						}
					}
				}
				return total;
			},
            /*
            |------------------------------------------------------------------------------
            */
			computerCountermeasuresDescription: function() {
				var desc = [];
				for(measure in this.params.computerCountermeasures) {
					if ( measure == 'shockGridId') {
						if (this.params.computerCountermeasures[measure] !== "none") {
							var shockGridDesc = 'shock grid ' + this.shockGrid.rank +
								' [DC ' + this.shockGrid.dc +
								', ' + this.shockGrid.damage + ']';
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
            /*
            |------------------------------------------------------------------------------
            */
			computerTier: function() {
				var shipTier = this.tier.value;
				return ( shipTier < 2 ? 1 : Math.floor( shipTier * 0.5 ) );
			},
            /*
            |------------------------------------------------------------------------------
            */
			countPowerCoreHousings: function() {
				var countHousings = this.sizeCategory.countPowerCoreHousings;
				if (
					(this.sizeCategory.id == "Medium" || this.sizeCategory.id == "Large") &&
					this.hasPowerCoreHousingExpansionBay
				) {
					countHousings++;
				}
				this.adjustPowerCoreIds(countHousings);
				return countHousings;
			},
            /*
            |------------------------------------------------------------------------------
            */
			crewQuarters: function() {
				return this.getItemById("crewQuarters", this.params.crewQuartersId);
			},
            /*
            |------------------------------------------------------------------------------
            */
			crewDescriptions: function() {
				var desc = {};
				for(role in this.params.crewSkills) {
					desc[role] = "";
					for(skill in this.params.crewSkills[role].skills) {
						var skillObj = this.params.crewSkills[role].skills[skill];
						if (
							skillObj.modifier != 0 ||
							(typeof skillObj.ranks !== "undefined" && skillObj.ranks != 0)
						) {
							// skill names
							desc[role] += this.getItemById("skill", skill).name + " ";
							// skill modifier
							var modifier = parseInt(skillObj.modifier);
							if ( isset(skillObj.ranks) ) {
								modifier += parseInt(skillObj.ranks);
							}
							if ( skill == "computers") {
								modifier += parseInt(this.skillModifierComputers);
							}
							if ( skill == "piloting") {
								modifier += parseInt(this.skillModifierPiloting);
							}
							desc[role] += this.getPrefixedModifier(modifier);
							// skill ranks
							if ( isset(skillObj.ranks) ) {
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
            /*
            |------------------------------------------------------------------------------
            */
			criticalThreshold: function() {
				return Math.round(this.hp / 5);
			},
            /*
            |------------------------------------------------------------------------------
            */
            customComponentBpTotal: function() {
            	if(!isset(this.params.customComponents)) return 0;

            	var total = 0;
            	this.params.customComponents.forEach(function(customComponent) {
            		total += parseInt(customComponent.bpCost);
            	});

            	return total;
            },
            /*
            |------------------------------------------------------------------------------
            */
            customComponentPcuTotal: function() {
            	if(!isset(this.params.customComponents)) return 0;

            	var total = { essential: 0, nonEssential: 0 };
            	this.params.customComponents.forEach(function(customComponent) {
            		if (customComponent.isEssential) {
            			total.essential += parseInt(customComponent.pcuCost);
            		} else {
            			total.nonEssential += parseInt(customComponent.pcuCost);
            		}
            	});

            	return total;
            },
            /*
            |------------------------------------------------------------------------------
            */
			customComponentsDescription: function() {
				if (this.params.customComponents.length == 0) return "None";

				var components = [];

				this.params.customComponents.forEach(function(component) {
					components.push(component.name + (component.notes ? (" (" + component.notes + ")") : ""));
				});

				return components.join("; ");
			},
            /*
            |------------------------------------------------------------------------------
            */
            customFrameSize: function() {
            	if(!isset(this.params.customFrame)) return {};

            	return this.getItemById('sizeCategory', this.params.customFrame.size);
            },
            /*
            |------------------------------------------------------------------------------
            */
			dataNetBpCost: function() {
				return (this.params.hasDataNet ? 3 : 0);
			},
            /*
            |------------------------------------------------------------------------------
            */
			dataNetPcuCost: function() {
				return (this.params.hasDataNet ? 5 : 0);
			},
            /*
            |------------------------------------------------------------------------------
            */
			defensiveCountermeasures: function() {
				return this.getItemById("defensiveCountermeasures", this.params.defensiveCountermeasuresId);
			},
            /*
            |------------------------------------------------------------------------------
            */
			deflectorShield: function() {
				return this.getItemById("deflectorShield", this.params.deflectorShieldId);
			},
            /*
            |------------------------------------------------------------------------------
            */
			driftEngine: function() {
				return this.getItemById("driftEngine", this.params.driftEngineId);
			},
            /*
            |------------------------------------------------------------------------------
            */
			driftEngineBpCost: function() {
				return this.driftEngine.bpCostMultiplier * this.sizeCategory.multiplier;
			},
            /*
            |------------------------------------------------------------------------------
            */
			expansionBays: function() {
				var that = this;
				var expansionBays = [];
				this.params.expansionBayIds.forEach(function(id) {
					expansionBays.push(that.getItemById("expansionBay", id));
				});
				return expansionBays;
			},
            /*
            |------------------------------------------------------------------------------
            */
			expansionBaysCountUsed: function() {
				var countUsed = 0;
				for(i in this.expansionBays) {
					if (this.expansionBays[i].id !== "none") {
						countUsed += this.expansionBays[i].numBays;
					}
				}
				return countUsed;
			},
            /*
            |------------------------------------------------------------------------------
            */
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
					if (id !== "none") {
						var expansionBayName = this.getItemById("expansionBay", id).name.toLowerCase();
						var expansionBayQuantity = expansionBaysByType[id] == 1 ? "" : " (" + expansionBaysByType[id] + ")";
						var expansionBayDesc = expansionBayName + expansionBayQuantity + sep;
						expansionBaysDescription += expansionBayDesc;
					}
				}
				expansionBaysDescription = expansionBaysDescription.substr(0, expansionBaysDescription.length - sep.length);
				return expansionBaysDescription;
			},
            /*
            |------------------------------------------------------------------------------
            */
			expansionBaysTotalBpCost: function() {
				return this.getSumOfPropertyValuesInCollection(this.expansionBays, "bpCost");
			},
            /*
            |------------------------------------------------------------------------------
            */
			expansionBaysTotalPcuCost: function() {
				return this.getSumOfPropertyValuesInCollection(this.expansionBays, "pcuCost");
			},
            /*
            |------------------------------------------------------------------------------
            */
			frame: function() {
                if(this.params.frameId == "custom") {
                    // custom frame
                    if (!this.params.customFrame)
                        this.setCustomFrame();
                    return this.params.customFrame;
                    
                } else {
                    // standard frame
                    // if(this.params.customFrame) this.$delete(this.params, 'customFrame');
                    var frame = this.getItemById("frame", this.params.frameId);
                    return frame;
                }
			},
            /*
            |------------------------------------------------------------------------------
            */
			hasComputerCountermeasures: function() {
				for(measure in this.params.computerCountermeasures) {
					if ( measure == 'shockGridId') {
						if (this.params.computerCountermeasures[measure] !== "none") {
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
            /*
            |------------------------------------------------------------------------------
            */
			hasPowerCoreHousingExpansionBay: function() {
				var result = false;
				for( i in this.params.expansionBayIds ) {
					if ( this.params.expansionBayIds[i] == "power-core-housing") {
						result =  true;
					}
				}
				return result;
			},
            /*
            |------------------------------------------------------------------------------
            */
			hasSecurity: function() {
				return (this.params.antiHackingSystemsId !== "none" ||
					this.params.antiPersonnelWeaponId !== "none" ||
					this.params.hasBiometricLocks ||
					this.hasComputerCountermeasures ||
					this.params.hasSelfDestructSystem);
			},
            /*
            |------------------------------------------------------------------------------
            */
			hiveJoiningBpCost: function() {
				return (this.params.hasHiveJoining ? 1 : 0);
			},
            /*
            |------------------------------------------------------------------------------
            */
			hp: function() {
				return parseInt(this.frame.hp) + (parseInt(this.tier.hpIncrease) * this.frame.hpIncrement);
			},
            /*
            |------------------------------------------------------------------------------
            */
			isBpCostOverBudget: function() {
				return (this.totalBpCost > this.tier.bpBudget);
			},
            /*
            |------------------------------------------------------------------------------
            */
			isComplementValid: function() {
				var isComplementValid = true;
				if ( this.complement < this.frame.minCrew || this.complement > this.frame.maxCrew) {
					isComplementValid = false;
				}
				return isComplementValid;
			},
            /*
            |------------------------------------------------------------------------------
            */
			isPcuCostOverBudget: function() {
				return (this.totalPcuCost.essential > this.pcuBudget);
			},
            /*
            |------------------------------------------------------------------------------
            */
			isExpansionBaysCountOverBudget: function() {
				return (this.expansionBaysCountUsed > this.frame.expansionBays);
			},
            /*
            |------------------------------------------------------------------------------
            */
			jsonParams: function() {
				var jsonParams = cloneObject(this.params);
				jsonParams["isSetDefaultCrewSkillValues"] = 0; // Because otherwise crew skills get overwritten!
				return JSON.stringify(jsonParams);
			},
            /*
            |------------------------------------------------------------------------------
            */
			maneuverabilityRating: function() {
				return this.getItemById("maneuverabilityRating", this.frame.maneuverability);
			},
            /*
            |------------------------------------------------------------------------------
            */
			modifiersDescription: function() {
				var desc = [];
				// computer nodes
				if (this.computer.id !== "basic-computer") {
					desc.push(this.computerDescription);
				}
				// Computers skill
				if (this.skillModifierComputers !== 0) {
					desc.push(this.getPrefixedModifier(this.skillModifierComputers) + " Computers");
				}
				// Piloting skill
				if (this.skillModifierPiloting !== 0) {
					desc.push(this.getPrefixedModifier(this.skillModifierPiloting) + " Piloting");
				}
				return desc.join(", ");
			},
            /*
            |------------------------------------------------------------------------------
            */
			pilotingRanks: function() {
				var pilotingRanks = 0;
				var crewSkills = this.params.crewSkills;
				if (crewSkills.pilot.hasRole) {
					pilotingRanks = parseInt(crewSkills.pilot.skills.piloting.ranks);
				} else if ( crewSkills.captain.hasRole ) {
					pilotingRanks = parseInt(crewSkills.captain.skills.piloting.ranks);
				}

				// penalty for unevenly distributed ablative armor
				if (pilotingRanks > -2 && !this.isAblativeArmorBalanced) {
					pilotingRanks--;
				}

				// penalty for ablative armor > hp
				if (this.ablativeArmor.tempHp > this.hp) {
					pilotingRanks--;
				}

				return pilotingRanks;
			},
            /*
            |------------------------------------------------------------------------------
            */
			pcuBudget: function() {
				var pcuBudget = 0;
				for(i in this.powerCores) {
					pcuBudget += this.powerCores[i].pcuBudget;
				}
				return pcuBudget;
			},
            /*
            |------------------------------------------------------------------------------
            */
			powerCoreDescription: function() {
				var desc = [];
				for(i in this.powerCores) {
					var powerCore = this.powerCores[i];
					if (powerCore.id !== "none") {
						desc.push(powerCore.name + " (" + powerCore.pcuBudget + " PCU)");
					}
				}
				return desc.join(", ");
			},
            /*
            |------------------------------------------------------------------------------
            */
			powerCores: function() {
				powerCores = [];
				for(i in this.params.powerCoreIds) {
					var powerCore = cloneObject( this.getItemById("powerCore", this.params.powerCoreIds[i]) );
					powerCore.sizeList = powerCore.sizes.join(", ");
					powerCores.push( powerCore );
				}
				return powerCores;
			},
            /*
            |------------------------------------------------------------------------------
            */
			powerCoresBpCost:function() {
				var bpCost = 0;
				for(i in this.powerCores) {
					bpCost += this.powerCores[i].bpCost;
				}
				return bpCost;
			},
            /*
            |------------------------------------------------------------------------------
            */
			roleDescription: function() {
				roleDesc = {};
				for(role in this.params.crewSkills) {
					roleDesc[role] = this.getItemById("role", role).name;
					var roleObj = this.params.crewSkills[role];
					if (isset(roleObj.countOfficers) && roleObj.countOfficers > 0) {
						if (isset(roleObj.countOfficerCrew) && roleObj.countOfficerCrew > 0) {
							// at least one officer with large team
							var officers = [];
							officers.push( roleObj.countOfficers + " " + "officer".pluralise(roleObj.countOfficers) );
							officers.push( roleObj.countOfficerCrew + " crew" + (roleObj.countOfficers > 1 ? " each" : ""));
							roleDesc[role] += " (" + officers.join(", ") + ")";
						} else if (roleObj.countOfficers > 1) {
							// more than one officer
                            if (role == 'captain') {
                                roleDesc[role] += " (plus " + roleObj.countOfficers + " " + "officer".pluralise(roleObj.countOfficers) + ")";
                            } else {
                                roleDesc[role] += " (" + roleObj.countOfficers + ")";
                            }
						}
					}
				}
				return roleDesc;
			},
            /*
            |------------------------------------------------------------------------------
            */
			securityDescription: function() {
				var desc = [];
				if (this.params.antiHackingSystemsId !== "none") {
					desc.push(this.antiHackingSystems.getOutputName());
				}
				if (this.params.antiPersonnelWeaponId !== "none") {
					desc.push( "anti-personnel weapon (" + this.antiPersonnelWeapon.name.toLowerCase() + ")" );
				}
				if (this.params.hasBiometricLocks) {
				    desc.push("biometric locks");
				}
				if (this.hasComputerCountermeasures) {
					desc.push("computer countermeasures (" + this.computerCountermeasuresDescription + ")");
				}
				if (this.params.hasSelfDestructSystem) {
				   desc.push( "self-destruct system" );
				}
				return desc.join(", ");
			},
            /*
            |------------------------------------------------------------------------------
            */
			securityTotalBpCost: function() {
				return this.antiHackingSystems.bpCost + 
					this.antiPersonnelWeaponBpCost +
					this.biometricLocksBpCost +
					this.computerCountermeasuresBpCost +
					this.selfDestructSystemBpCost;
			},
            /*
            |------------------------------------------------------------------------------
            */
			selectOptions: function() {
				var that = this;
				var selectOptions = {};
				var fields = [
					"ablativeArmor",
					"antiHackingSystems",
					"armor",
					"computer",
					"computerCountermeasures",
					"crewQuarters",
					"defensiveCountermeasures",
					"deflectorShield",
					"driftEngine",
					"expansionBay",
					"frame",
					"personalWeapon",
					"powerCore",
					"role",
					"sampleShip",
					"shockGrid",
					"sensors",
					"shields",
					"shipWeapon",
                    "sizeCategory",
					"skill",
					"thrusters",
					"tier"
				];

				for(i in fields) {
					var field = fields[i];
					selectOptions[field] = this.getSelectOptionsFor(field);
				}

				// sampleShip
				selectOptions.sampleShip.sort(function(a, b) {
					if (that.selectSampleShipSortOrder == "tier") return stringToFloat(a.tier) > stringToFloat(b.tier);

					return a[that.selectSampleShipSortOrder] > b[that.selectSampleShipSortOrder];
				});

				// ship weapon
				selectOptions.shipWeapon.sort(function(a, b) {
					return a.name > b.name;
				});

				return selectOptions;
			},
            /*
            |------------------------------------------------------------------------------
            */
			selfDestructSystemBpCost: function() {
				return this.params.hasSelfDestructSystem * 5 * this.sizeCategory.multiplier;
			},
            /*
            |------------------------------------------------------------------------------
            */
			sensors: function() {
				return this.getItemById("sensors", this.params.sensorsId);
			},
            /*
            |------------------------------------------------------------------------------
            */
			shields: function() {
				return this.getItemById("shields", this.params.shieldsId);
			},
            /*
            |------------------------------------------------------------------------------
            */
            shieldsByPositionTotal: function() {
                var total = 0;
                for(position in this.params.shieldsByPosition) {
                    total += parseInt(this.params.shieldsByPosition[position]);
                }
                return total;
            },
            /*
            |------------------------------------------------------------------------------
            */
			shipName: function() {
				return (this.params.shipName == "" ? "New Ship" : this.params.shipName);
			},
            /*
            |------------------------------------------------------------------------------
            */
			shockGrid: function() {
				return this.getItemById("shockGrid", this.params.computerCountermeasures.shockGridId);
			},
            /*
            |------------------------------------------------------------------------------
            */
			shockGridBpCost: function() {
				return this.shockGrid.bpCostMultiplier * this.computerTier;
			},
            /*
            |------------------------------------------------------------------------------
            */
			sizeCategory: function() {
				return this.getItemById("sizeCategory", this.frame.size);
			},
            /*
            |------------------------------------------------------------------------------
            */
			skillModifierComputers: function() {
				return this.sensors.modifier;
			},
            /*
            |------------------------------------------------------------------------------
            */
			skillModifierPiloting: function() {
				return this.maneuverabilityRating.pilotingModifier +
					this.thrusters.pilotingModifier
				;
			},
            /*
            |------------------------------------------------------------------------------
            */
			skillTotals: function() {
				var skillTotals = {};
				for(role in this.params.crewSkills) {
					skillTotals[role] = {};
					for(skill in this.params.crewSkills[role].skills) {
						var skillObj = this.params.crewSkills[role].skills[skill];
						skillTotals[role][skill] = parseInt(skillObj.modifier);
						if ( isset(skillObj.ranks) ) {
							skillTotals[role][skill] += parseInt(skillObj.ranks);
						}
						if ( skill == "computers" ) {
							skillTotals[role][skill] += this.skillModifierComputers;
						}
						if ( skill == "piloting" ) {
							skillTotals[role][skill] += this.skillModifierPiloting;
						}
					}
				}
				return skillTotals;
			},
            /*
            |------------------------------------------------------------------------------
            */
			systemsDescription: function(){
				var desc = [];
				// sensors
				desc.push( this.sensors.id == "none" ? "no sensors" : this.sensors.name.toLowerCase() + " sensors" );
				// crew quarters
				if ( this.params.crewQuartersId !== "none" ) {
					desc.push( "crew quarters (" + this.crewQuarters.name.toLowerCase() + ")" );
				} 
				// armor
				if ( this.params.armorId !== "none" ) {
					desc.push( this.armor.name.toLowerCase() );
				}
				// defences
				if ( this.params.defensiveCountermeasuresId !== "none" ) {
					desc.push( this.defensiveCountermeasures.name.toLowerCase() );
				}
				// computer
				var computerDesc = this.computer.name.toLowerCase() +
					(this.computer.id == "basic-computer" ? "" : " computer") +
					" (tier " + this.computerTier + ")";
				desc.push( computerDesc );
                
                // data net
                if (this.params.hasDataNet) {
                    desc.push('data net');
                }
                // hive joining
                if (this.params.hasHiveJoining) {
                    desc.push('hive joining');
                }
                return desc.join(", ");
			},
            /*
            |------------------------------------------------------------------------------
            */
			targetLock: function() {
				return 10 +
					this.defensiveCountermeasures.defCMBonusToTl +
					this.sizeCategory.acAndTlModifier +
					this.armor.targetLockModifier +
					this.pilotingRanks +
					this.ablativeArmor.tlMod +
					this.deflectorShield.bonusToTl
				;
			},
            /*
            |------------------------------------------------------------------------------
            */
            tempHp: function() {
            	return this.ablativeArmor.tempHp;
            },
            /*
            |------------------------------------------------------------------------------
            */
			thrusters: function () {
				return this.getItemById("thrusters", this.params.thrustersId);
			},
            /*
            |------------------------------------------------------------------------------
            */
			tier: function() {
				var tier = this.getItemById("tier", this.params.tierId);
				return tier;
			},
            /*
            |------------------------------------------------------------------------------
            */
			totalPcuCost: function() {
				return {
					essential: this.thrusters.pcuCost +
						this.defensiveCountermeasures.pcuCost +
						this.shields.pcuCost +
						this.deflectorShield.pcuCost +
						this.weaponsTotalCosts.weaponsPcu +
						parseInt(this.customComponentPcuTotal.essential),
					nonEssential: this.computer.pcuCost +
						this.expansionBaysTotalPcuCost +
                        this.dataNetPcuCost +
                        parseInt(this.customComponentPcuTotal.nonEssential),
				};
			},
            /*
            |------------------------------------------------------------------------------
            */
			totalBpCost: function() {
				return parseInt(this.ablativeArmor.bpCost) +
					parseInt(this.antiHackingSystems.bpCost )+ 
					parseInt(this.antiPersonnelWeaponBpCost) +
					parseInt(this.armorBpCost) +
					parseInt(this.biometricLocksBpCost) +
					parseInt(this.computer.bpCost) +
					parseInt(this.computerCountermeasuresBpCost) +
					parseInt(this.customComponentBpTotal) +
					parseInt(this.crewQuarters.bpCost) +
					parseInt(this.dataNetBpCost) +
					parseInt(this.defensiveCountermeasures.bpCost) +
					parseInt(this.deflectorShield.bpCost) +
					parseInt(this.driftEngineBpCost) +
					parseInt(this.expansionBaysTotalBpCost) +
					parseInt(this.frame.bpCost) +
					parseInt(this.hiveJoiningBpCost) +
					parseInt(this.powerCoresBpCost) +
					parseInt(this.selfDestructSystemBpCost) +
					parseInt(this.sensors.bpCost) +
					parseInt(this.shields.bpCost) +
					parseInt(this.thrusters.bpCost) +
					parseInt(this.weaponsTotalCosts.weaponsBp) +
					parseInt(this.weaponsTotalCosts.weaponMountsBp) +
					parseInt(this.weaponsTotalCosts.weaponLinksBp)
				;
			},
            /*
            |------------------------------------------------------------------------------
            */
			turn: function() {
				return this.maneuverabilityRating.turn +
					this.armor.turnDistanceModifier +
					this.ablativeArmor.turnMod
				;
			},
            /*
            |------------------------------------------------------------------------------
            */
			weaponDescriptions: function() {
				var desc = {};
				for(position in this.weaponMounts) {
					var positionDesc = [];
					for(i in this.weaponMounts[position]) {
						var mount = this.weaponMounts[position][i];
						var prevI = parseInt(i) - 1;
						var mountDesc = "";
						
						// if this is the second of a linked set, skip this mount
						if (
							isset( this.weaponMounts[position][prevI] ) &&
							this.weaponMounts[position][prevI].isLinked
						) {
							continue;
						}
						
						// get description
                        if (mount.weapon.id == "none") continue;

                        var weaponName = mount.weapon.name.toLowerCase();
                        
                        // weapon name
                        if ( mount.isLinked ) {
                            mountDesc = "linked " + weaponName.pluralise(2);
                        } else {
                            mountDesc = weaponName;
                        }

                        // weapon damage and special properties
                        mountDesc += " (" + this.getWeaponDamage(mount);
                        if (mount.weapon.specialProperties.length > 0) {
                        	let wpnSpcPropDesc = ", ";
                        	wpnSpcPropDesc += this.getNamesFromIds("weaponSpecialProperty", mount.weapon.specialProperties, "").toLowerCase();
                        	wpnSpcPropDesc = wpnSpcPropDesc.replace("(", "[");
                        	wpnSpcPropDesc = wpnSpcPropDesc.replace(")", "]");
                        	mountDesc += wpnSpcPropDesc;
                        }
                        mountDesc += ")";

                        positionDesc.push(mountDesc);
					}
					if (positionDesc.length > 0) {
						desc[position] = positionDesc.join(", ");
					}
				}
				return desc;
			},
            /*
            |------------------------------------------------------------------------------
            */
			weaponMounts: function() {
				var weaponMounts = {};
				for(position in this.params.weaponMounts ) {
					weaponMounts[position] = [];
					for(i in this.params.weaponMounts[position]) {
						var params = cloneObject(this.params.weaponMounts[position][i]);
						params.position = position;
						params.sizeCategoryId = this.sizeCategory.id;
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
            /*
            |------------------------------------------------------------------------------
            */
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
            /*
            |------------------------------------------------------------------------------
            */
		},
        /*
        |----------------------------------------------------------------------------------
        |  METHODS
        |----------------------------------------------------------------------------------
        */
		methods: {
            /*
            |------------------------------------------------------------------------------
            */
			addCustomFrameMount: function(position) {
                if (!isset(this.params.customFrame.mounts[position]))
                    this.$set(this.params.customFrame.mounts, position, []);
				this.params.customFrame.mounts[position].push('light');
				this.setWeaponMounts( this.frame.mounts );
			},
            /*
            |------------------------------------------------------------------------------
            */
			adjustPowerCoreIds: function(countHousings) {
				if ( this.params.powerCoreIds.length < countHousings ) {
					for(var i = this.params.powerCoreIds.length; i < countHousings; i++) {
						this.params.powerCoreIds[i] = "none";
					}
				} else if ( this.params.powerCoreIds.length > countHousings ) {
					var splicePos = countHousings;
					var spliceLen = this.params.powerCoreIds.length - countHousings;
					this.params.powerCoreIds.splice(splicePos, spliceLen);
				}
			},
            /*
            |------------------------------------------------------------------------------
            */
			canWeaponMountBeCreated: function(position) {
				var result = true;
				var countMountsInPosition = this.params.weaponMounts[position].length;
				if (countMountsInPosition >= this.sizeCategory.maxMounts) {
					result = false;
				}
				return result;
			},
            /*
            |------------------------------------------------------------------------------
            */
			canWeaponMountBeDowngraded: function(weight, isFromTemplate, templateWeight) {
				var result = true;
				if ( weight == "light" ) {
					result = false;
				} else {
					var weights = {
						heavy: 1,
						capital: 2
					};
					if ( isFromTemplate ) {
						if (weight == templateWeight ) {
							result = false;
						}
					}
				}
				return result;
			},
            /*
            |------------------------------------------------------------------------------
            */
			canWeaponMountBeUpgraded: function(position, weight) {
				var result = true;
				var weights = {light: 0, heavy: 1, capital: 2};
				// check weight
				// Heavy weapon mounts can only appear on a Medium or larger ship,
				// capital weapon mounts can only appear on a Huge or larger ship.
				if (weights[weight] >= weights[this.sizeCategory.maxMountWeight]) {
					result = false;
				} else {
					if (position == "turret") {
						if ( weight !== "light" ) {
							result = false; 
						}
					} else {
						if ( weight == "capital") {
							result = false;
						}
					}
				}
				return result;
			},
            /*
            |------------------------------------------------------------------------------
            */
			clearAll: function() {
				this.params = cloneObject(this.paramsReset);
				this.json = "";
				document.getElementById("sampleShipSelect").value = "none";
			},
            /*
            |------------------------------------------------------------------------------
            */
			clearWeaponMounts: function() {
				for(position in this.params.weaponMounts) {
					// var mountList = this.params.weaponMounts[position];
					this.params.weaponMounts[position].splice(0, this.params.weaponMounts[position].length); // start, deleteCount
				}
				// console.log(this.params.weaponMounts);
			},
            /*
            |------------------------------------------------------------------------------
            */
			convertJsonInput: function() {
				var params = JSON.parse(this.json);
				this.params = params;
				this.fixMissingParamsValues();
			},
            /*
            |------------------------------------------------------------------------------
            */
			createCustomComponent: function() {
				// initialise on older builds
				if (!isset(this.params.customComponents)) {
                    this.$set(this.params, "customComponents", []);
				}

				this.params.customComponents.push({
					name: "",
					notes: "",
					isEssential: false,
					pcuCost: 0,
					bpCost: 0,
				});

                return;
			},
            /*
            |------------------------------------------------------------------------------
            */
			createWeaponMount: function(position) {
				var newMount = {
					weaponId: "none",
					weight: "light",
					isFromTemplate: false,
					canBeLinked: false,
					isLinked: false
				};
				this.params.weaponMounts[position].push(newMount);
			},
            /*
            |------------------------------------------------------------------------------
            */
			destroyWeaponMount: function(position, i) {
				this.params.weaponMounts[position].splice(i, 1); // start, deleteCount
				this.setWeaponLinking(position);
			},
            /*
            |------------------------------------------------------------------------------
            */
			doesNextMountHaveSameWeaponId: function(position, i) {
				var result = false;
				var nextI = parseInt(i) + 1;
				var mounts = this.params.weaponMounts[position];
				if (
					isset( this.params.weaponMounts[position][nextI] ) &&
					mounts[i].weaponId == mounts[nextI].weaponId
				) {
					result = true;
				}
				return result;
			},
            /*
            |------------------------------------------------------------------------------
            */
			downgradeWeaponMount: function(position, i) {
				var weaponMount = this.params.weaponMounts[position][i];
				if (weaponMount.weight == "capital") {
					weaponMount.weight = "heavy";
				} else {
					weaponMount.weight = "light";
				}
				weaponMount.weaponId = "none";
				this.setWeaponLinking(position);
			},
            /*
            |------------------------------------------------------------------------------
            */
			fixMissingParamsValues: function() {
				for(key in this.paramsReset){

                    // crew positions
                    if (key == 'crewSkills') {
                    	for (role in this.paramsReset.crewSkills) {
		                    if (isset(this.params.crewSkills[role])) continue;

		                    console.log("Missing crew role, " + role + ", added to ship");
		                    this.$set(this.params.crewSkills, role, cloneObject(this.paramsReset.crewSkills[role]));
                    	}
                    }

                    if (isset(this.params[key])) continue;

                    console.log("Missing param, " + key + ", added to ship");
                    this.$set(this.params, key, cloneObject(this.paramsReset[key]));

                    // shields by position
                    if (key == 'shieldsByPosition') {
                        this.setDefaultShieldsByPosition();
                    }

                    // convert legacy armour to armor
                    if (key == "armorId" && isset(this.params.armourId)) {
                    	this.params.armorId = this.params.armourId;
                    	delete this.params.armourId;
                    }
				}
			},
            /*
            |------------------------------------------------------------------------------
            */
            getAvailableWeaponUpgrades: function(weapon) {
            	return [{id: "test", name: "Test"}];
            },
            /*
            |------------------------------------------------------------------------------
            */
			getFrameMountWeaponWeight: function(position, index) {
				return this.frame.mounts[position][index];
			},
            /*
            |------------------------------------------------------------------------------
            */
			getItemById: function(prop, id) {
				this.testThatPropExists(prop);
				// find item
				var item = this.data[prop].data.find(function(item) {
					return item.id === id;
				});
				// test that item exists
				if (typeof item === "undefined") {
					console.log("There is no item " + prop + " that matches id " + id);
					item = this.data[prop].data.find(function(item) {
						return item.id === "none";
					});
				}
				return item;
			},
            /*
            |------------------------------------------------------------------------------
            */
            getNamesFromIds: function(prop, ids, emptyString) {
            	if (!ids || ids.length == 0) return emptyString ? emptyString : "";

            	var that = this;

				var names = [];
				ids.forEach(function(id) {
					var obj = that.getItemById(prop, id);
					names.push(obj.name);
				});

				return names.join(", ");
            },
            /*
            |------------------------------------------------------------------------------
            */
			getPrefixedModifier: function(val) {
				var prefix = (val >= 0) ? "+" : "";
				return prefix + val;
			},
            /*
            |------------------------------------------------------------------------------
            */
			getSelectOptionsFor: function(prop) {
				this.testThatPropExists(prop);
				this.testThatPropIsArray(prop);
				for(item in this.data[prop].data) {
					this.testThatItemHasId(prop, item);
					this.testThatItemHasName(prop, item);
				}
				return this.data[prop].data;
			},
            /*
            |------------------------------------------------------------------------------
            */
			getSumOfPropertyValuesInCollection: function(collection, property) {
				var total = 0;
				for(i in collection) {
					total += collection[i][property];
				}
				return total;
			},
            /*
            |------------------------------------------------------------------------------
            */
            getWeaponDamage: function(mount) {
            	if (mount.weapon.damage == "Special") return "Special";

            	var dice = stringToDice(mount.weapon.damage);
            	if (dice === "error") return "error";

            	// multiplier for linked weapons
                var mult = (mount.isLinked ? 2 : 1);
                
                var result = "";
                result += mult * dice.ctDice;
                result += "d" + dice.ctFaces;
                if (dice.mod > 0) result += "+" + mult * dice.mod;

                return result;
            },
            /*
            |------------------------------------------------------------------------------
            */
			initParams: function() {
				if (window.JTOStarshipSheetModel === undefined) {
					this.params = cloneObject(this.paramsReset);
				} else {
					this.params = cloneObject(window.JTOStarshipSheetModel);
				}

			},
            /*
            |------------------------------------------------------------------------------
            */
			inputSampleShipParams: function() {
				var sampleShipSelect = document.getElementById("sampleShipSelect");
				var sampleShipId = sampleShipSelect.value;
				if (sampleShipId !== "none") {
					var sampleShipObj = this.getItemById("sampleShip", sampleShipId);
					var sampleShipParams = cloneObject(sampleShipObj.params);
					this.params = sampleShipParams;
					this.fixMissingParamsValues();
				}
			},
            /*
            |------------------------------------------------------------------------------
            */
            isAblativeArmorBalanced: function() {
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
            /*
            |------------------------------------------------------------------------------
            */
			isWeaponMountLinked: function(position, i) {
				var result = false;
				if (
					isset( this.params.weaponMounts[position][i] ) &&
					this.params.weaponMounts[position][i].isLinked === true
				) {
					result = true;
				}
				return result;
			},
            /*
            |------------------------------------------------------------------------------
            */
			maybeCreateExpansionBays: function( targetCountBays ) {
				for(var i = 0; i < targetCountBays; i++) {
					if ( !isset(this.params.expansionBayIds[i]) ) {
						this.params.expansionBayIds[i] = "none";
					}
				}
			},
            /*
            |------------------------------------------------------------------------------
            */
			popExcessExpansionBays: function( targetCountBays ) {
				var countBays = this.params.expansionBayIds.length;
				if ( countBays > targetCountBays ) {
					for(var i = 0; i < countBays - targetCountBays; i++) {
						this.params.expansionBayIds.pop();
					}
				}
			},
            /*
            |------------------------------------------------------------------------------
            */
			removeCustomComponent: function(index) {
				this.params.customComponents.splice(index, 1);
				return;
			},
            /*
            |------------------------------------------------------------------------------
            */
			removeCustomFrameMount: function(position, index) {
				this.params.customFrame.mounts[position].splice(index, 1);
                if (!this.params.customFrame.mounts[position].length)
                    this.$delete(this.params.customFrame.mounts, position);
				this.setWeaponMounts( this.frame.mounts );
			},
            /*
            |------------------------------------------------------------------------------
            */
            resetCustomFrame: function() {
            	this.setCustomFrame();
            	this.updateFrame();
            },
            /*
            |------------------------------------------------------------------------------
            */
			setCrewQuarters: function( frameSize ) {
				if ( frameSize == "Tiny" ) {
					if ( this.params.crewQuartersId !== "none" ) {
						this.params.crewQuartersId = "none";
					}
				} else {
					if ( this.params.crewQuartersId == "none" ) {
						this.params.crewQuartersId = "common";
					}
				}
			},
            /*
            |------------------------------------------------------------------------------
            */
            setCustomFrame: function() {
            	this.$set(this.params, 'customFrame', cloneObject(this.getItemById("frame", this.params.customFrameBaseId)) );
            },
            /*
            |------------------------------------------------------------------------------
            */
			setDefaultCrewSkillValues: function() {
				if (this.params.isSetDefaultCrewSkillValues) {
					var tier = this.getItemById("tier", this.params.tierId).value;
					if (tier < 1) {
						tier = 1;
					}
					for(role in this.params.crewSkills) {
						for(skill in this.params.crewSkills[role].skills) {
							var skillObj = this.params.crewSkills[role].skills[skill];
							if ( skillObj.ranks > 0 ) {
								skillObj.ranks = tier;
							}
						}
					}
				}
			},
            /*
            |------------------------------------------------------------------------------
            */
            setDefaultPositionDependentValues: function(param, key) {
            	// test that computed param exists
            	if (!isset(this[param])) {
            		console.log("Missing computed param: " + param);
            		return;
            	}

            	// test that computed param resource key exists
            	if (!isset(this[param][key])) {
            		console.log("Missing key in " + param + ": " + key);
            		return;
            	}

            	// test that [param] by position exists
            	if (!isset(this.params[param + 'ByPosition'])) {
            		console.log("Missing param: " + param + "ByPosition");
            		return;
            	}

				var total = this[param][key];
                var positions = [];
				for (position in this.params[param + 'ByPosition']) {
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
            */
			setWeaponLinking: function(position) {
				var mounts = this.params.weaponMounts[position];
				for(i in mounts) {
					if (
						mounts[i].weaponId !== "none" &&
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
            /*
            |------------------------------------------------------------------------------
            */
			setWeaponMounts: function(mounts) {

                this.clearWeaponMounts();

                var arcs = ["forward", "aft", "port", "starboard", "turret", "spinal"];

                for(arcIndex in arcs) {
					var arc = arcs[ arcIndex ];

                    if ( !isset(mounts[arc]) ) continue;
                        
                    var arcMounts = mounts[arc];
                    
                    for(mountIndex in arcMounts) {
                        
                        var mountWeight = arcMounts[ mountIndex ];

                        var objMount = {
                            weaponId: "none",
                            weight: mountWeight,
                            templateWeight: mountWeight,
                            isFromTemplate: true,
                            canBeLinked: false,
                            isLinked: false
                        }
                        
                        this.params.weaponMounts[arc].push(objMount);
                    }

				}
			},
            /*
            |------------------------------------------------------------------------------
			syncExpansionBays: function( targetCountBays ) {
				this.popExcessExpansionBays( targetCountBays );
				this.maybeCreateExpansionBays(  targetCountBays );
			},
            */
            /*
            |------------------------------------------------------------------------------
            */
			testThatItemHasId: function(prop, item) {
				if ( !isset(this.data[prop].data[item].id) ) {
					throw "Property " + prop + "[" + item + "] does not have an id";
				}
			},
            /*
            |------------------------------------------------------------------------------
            */
			testThatItemHasName: function(prop, item) {
				if ( !isset(this.data[prop].data[item].name) ) {
					throw "Property " + prop + "[" + item + "] does not have a name";
				}
			},
            /*
            |------------------------------------------------------------------------------
            */
			testThatPropExists: function(prop) {
				if ( !isset(this.data[prop]) ) {
					throw "Property " + prop + " does not exist";
				}
			},
            /*
            |------------------------------------------------------------------------------
            */
			testThatPropIsArray: function(prop) {
				if (typeof this.data[prop].data !== "object") {
					throw "Property " + prop + " is not an array";
				}
			},
            /*
            |------------------------------------------------------------------------------
            */
			updateFrame: function() {
				// this.syncExpansionBays( this.frame.expansionBays );
				this.setCrewQuarters( this.frame.size );
				this.setWeaponMounts( this.frame.mounts );
			},
            /*
            |------------------------------------------------------------------------------
            */
			upgradeWeaponMount: function(position, i) {
				var weaponMount = this.params.weaponMounts[position][i];
				if (weaponMount.weight == "light") {
					weaponMount.weight = "heavy";
				} else {
					weaponMount.weight = "capital";
				}
				weaponMount.weaponId = "none";
				weaponMount.isLinked = false;
				this.setWeaponLinking(position);
			},
            /*
            |------------------------------------------------------------------------------
            */
		},
        /*
        |----------------------------------------------------------------------------------
        */
		beforeMount: function() {
			this.initParams();
		},
        /*
        |----------------------------------------------------------------------------------
        */
	});
	
} // Ship class



/*
|------------------------------------------------------------------------------------------
| WEAPON MOUNT
|------------------------------------------------------------------------------------------
|
| params expects: weaponMountId, position, weaponId, weight, isFromTemplate, canBeLinked, isLinked, sizeCategoryId
| maybe expects templateWeight
|
|------------------------------------------------------------------------------------------
*/
function WeaponMount(params) {

    /*
    |--------------------------------------------------------------------------------------
    */
    this.doTests = function() {
		this.testThatPositionIsValid();
		this.testThatWeightIsValid(this.weight);
		this.testThatWeightIsValid(this.templateWeight);
		this.testThatTemplateWeightIsSmallerThanWeight();
		this.testThatTurretIsNotCapital();
	}
	
    /*
    |--------------------------------------------------------------------------------------
    */
	this.testThatPositionIsValid = function() {
		if (["forward", "aft", "port", "starboard", "turret", "spinal"].indexOf(this.position) == -1) {
			throw "Invalid position in WeaponMount class: " + this.position;
		}
	}
	
    /*
    |--------------------------------------------------------------------------------------
    */
	this.testThatWeightIsValid = function(weight) {
		if (["light", "heavy", "capital", "spinal"].indexOf(weight) == -1) {
			throw "Invalid weight in WeaponMount class: " + weight;
		}
	}
	
    /*
    |--------------------------------------------------------------------------------------
    */
	this.testThatTemplateWeightIsSmallerThanWeight = function() {
		var weightVal = {
			light: 0,
			heavy: 1,
			capital: 2
		}
		if ( weightVal[this.weight] < weightVal[this.templateWeight] ) {
			throw "Original weight must be equal to or lower than current weight";
		}
	}
	
    /*
    |--------------------------------------------------------------------------------------
    */
	this.testThatTurretIsNotCapital = function() {
		if ( this.sizeCategoryId == "Supercolossal" ) return;

		if ( this.position == "turret" && (this.weight == "capital" || this.templateWeight == "capital") ) {
			throw "Turrets cannot have weight 'capital' in WeaponMount";
		}
	}
	
    /*
    |--------------------------------------------------------------------------------------
    */
	this.getUpgradeCost = function() {
		var upgradeCost = 0;
		if ( this.weight !== this.templateWeight ) {
			// if position is forward, aft, port or starboard arc
			if ( WEAPON_ARCS.indexOf(this.position) !== -1 ) {
				// if templateWeight is light and weight is heavy
				if (this.templateWeight == "light" && this.weight == "heavy") {
					upgradeCost = 4;
				} else if ( this.templateWeight == "heavy" && this.weight == "capital" ) {
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
	
    /*
    |--------------------------------------------------------------------------------------
    */
	this.getNewMountCost = function() {
		var newMountCost = 0;
		if (!this.isFromTemplate) {
			if (this.position == "turret") {
				newMountCost = 5;
			} else {
				newMountCost = 3;
			}
		}
		return newMountCost;
	}
	
    /*
    |--------------------------------------------------------------------------------------
    */
	this.getCost = function() {
		return this.getUpgradeCost() + this.getNewMountCost();
	}
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
	this.weight = params.weight;
	this.isFromTemplate = params.isFromTemplate;
	if ( this.isFromTemplate ) {
		this.templateWeight = params.templateWeight;
	} else {
		this.templateWeight = "light";
	}
	this.canBeLinked = params.canBeLinked;
	this.isLinked = params.isLinked;
	this.sizeCategoryId = params.sizeCategoryId; // of ship
	
	this.doTests();

    /*
    |--------------------------------------------------------------------------------------
    */
}

/*
|------------------------------------------------------------------------------------------
| MAIN
|------------------------------------------------------------------------------------------
*/
loadJSON(JSON_FILE, function(response) {
	var actual_JSON = JSON.parse(response);
	// console.log(actual_JSON);
	var ship = new Ship(actual_JSON);
});