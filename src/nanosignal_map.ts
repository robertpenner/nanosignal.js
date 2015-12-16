/// <reference path="nanosignal_interfaces.d.ts" />

function signal(): nano.Signal0;
function signal<A>(): nano.Signal1<A>;
function signal<A, B>(): nano.Signal2<A, B>;
function signal<A, B, C>(): nano.Signal3<A, B, C>;
function signal<A, B, C, D>(): nano.Signal4<A, B, C, D>;
function signal<A, B, C, D, E>(): nano.Signal5<A, B, C, D, E>;
function signal(): any {
  var listeners: Function[] = [];

  const nanosignal: any = function(): any[] {
    const args = arguments, results = listeners.map(fn => fn.apply(null, args));
    return results;
  };

  /**
   * Starts a function listening to this signal.
   * @param listener
   */
  nanosignal.add = function<Fn extends Function>(listener: Fn): void {
    listeners = listeners.concat(listener);
  };

  /**
   * Stops a function from listening to this signal.
   * Removes all listeners if one is not specified.
   * @param listener
   */
  nanosignal.remove = function<Fn extends Function>(listener: Fn): void {
    listeners = listeners.filter(fn => fn !== listener);
  };

  return nanosignal;
}

export = signal;
