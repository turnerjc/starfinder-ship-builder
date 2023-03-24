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

export { String };
