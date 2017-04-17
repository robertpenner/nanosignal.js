export interface Signal<F extends Function> extends Function {
  /**
   * Starts a function listening to this signal.
   * @param listener
   */
  add(listener: F): void;

  /**
   * Stops a function from listening to this signal.
   * @param listener
   */
  remove(listener: F): void;
}

/**
 * Creates a Signal: a function that multicasts its arguments to listeners.
 * @returns The new Signal.
 */
export default function createSignal<F extends Function>(): F & Signal<F> {
  let listeners: ReadonlyArray<F> = [];

  const signal: F & Signal<F> = Object.assign(
    function () { for (const fn of listeners) { fn(...arguments as any); } },
    {
      add(listener: F) { listeners = [...listeners, listener]; },
      remove(listener: F) { listeners = listeners.filter(fn => fn !== listener); },
    }
  );

  return signal;
}

