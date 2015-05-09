/// <reference path="nanosignal_interfaces.d.ts" />
function signal(options) {
    var listeners = [];
    var nanosignal = function () {
        for (var i = 0, fns = listeners, len = fns.length; i < len; i++)
            fns[i].apply(null, arguments);
        if (options === 'once')
            listeners = [];
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
//# sourceMappingURL=nanosignal.js.map