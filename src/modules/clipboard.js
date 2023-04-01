/*
|------------------------------------------------------------------------------------------
| CLIPBOARD.JS
|------------------------------------------------------------------------------------------
*/
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

function pasteToClipboard() {
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
}
