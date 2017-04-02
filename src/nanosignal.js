"use strict";
function signal() {
  var listeners = [];
  var nanosignal = function () {
    var args = arguments;
    return listeners.map(function (fn) { return fn.apply(null, args); });
  };

  /**
   * Starts a function listening to this signal.
   * @param listener
   */
  nanosignal.add = function (listener) {
    listeners = listeners.concat(listener);
  };

  /**
   * Stops a function from listening to this signal.
   * @param listener
   */
  nanosignal.remove = function (listener) {
    listeners = listeners.filter(function (fn) { return fn !== listener; });
  };
  return nanosignal;
}
module.exports = signal;