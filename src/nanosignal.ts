/// <reference path="nanosignal_interfaces.d.ts" />

function signal(options?: string): nano.Signal0;
function signal<A>(options?: string): nano.Signal1<A>;
function signal<A, B>(options?: string): nano.Signal2<A, B>;
function signal<A, B, C>(options?: string): nano.Signal3<A, B, C>;
function signal<A, B, C, D>(options?: string): nano.Signal4<A, B, C, D>;
function signal<A, B, C, D, E>(options?: string): nano.Signal5<A, B, C, D, E>;
function signal(options?: string): any {
  var listeners: Function[] = [];

  const nanosignal: any = function(): void {
    for (var i = 0, fns = listeners, len = fns.length; i < len; i++)
      fns[i].apply(null, arguments);
    if (options === 'once') listeners = [];
  };

  /**
   * Starts a function listening to this signal.
   * @param listener
   */
  nanosignal.add = function<Fn extends Function>(listener: Fn): void {
    if (listeners.indexOf(listener) < 0) listeners = listeners.concat(listener);
  };

  /**
   * Stops a function from listening to this signal.
   * Removes all listeners if one is not specified.
   * @param listener
   */
  nanosignal.remove = function<Fn extends Function>(listener?: Fn): void {
    listeners = !arguments.length ? [] : listeners.filter(fn => fn !== listener);
  };

  return nanosignal;
}

export = signal;
