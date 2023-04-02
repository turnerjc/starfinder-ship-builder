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

// get stat mod from a random stat
function statMod(stat) {
  return Math.floor((stat - 10) / 2);
}

// generate a random number between 2 and 10, including both 2 and 10
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// generate a random stat between 8 and 18
function randomStat() {
  return 6 + randomInt(1, 6) + randomInt(1, 6);
}

// generate some random stats
function randomStats() {
  return {
    str: randomStat(),
    dex: randomStat(),
    con: randomStat(),
    int: randomStat(),
    wis: randomStat(),
    cha: randomStat(),
  };
}

export {
  maybeCreateProperty,
  isset,
  cloneObject,
  integerToWord,
  stringToFloat,
  stringToDice,
  statMod,
  randomInt,
  randomStat,
  randomStats,
};
