/// <reference path="nanosignal_interfaces.d.ts" />
function signal(options) {
    var listeners = [];
    var nanosignal = function () {
        var args = arguments, results = listeners.map(function (fn) { return fn.apply(null, args); });
        if (options === 'once')
            listeners = [];
        return results;
    };
    /**
     * Starts a function listening to this signal.
     * @param listener
     */
    nanosignal.add = function (listener) {
        if (listeners.indexOf(listener) < 0)
            listeners = listeners.concat(listener);
    };
    /**
     * Stops a function from listening to this signal.
     * Removes all listeners if one is not specified.
     * @param listener
     */
    nanosignal.remove = function (listener) {
        listeners = !arguments.length ? [] : listeners.filter(function (fn) { return fn !== listener; });
    };
    return nanosignal;
}
module.exports = signal;
//# sourceMappingURL=nanosignal_map.js.map