export interface Listener0<RESULT = void> {
  (): RESULT;
}

/**
 * Cancels a listener's subscription to its signal.
 */
export interface Unsubscriber {
  (): void;
}

export interface Signal0<RESULT = void> {
  (): ReadonlyArray<RESULT>;

  /**
   * Starts a function listening to this signal.
   * @param listener
   */
  subscribe(listener: Listener0<RESULT>): Unsubscriber;
}

/**
 * Creates a Signal0: a function that calls listeners but passes no arguments.
 * @returns A new Signal0
 */
export default function createSignal0<RESULT = void>(firstListener?: Listener0<RESULT>): Signal0<RESULT> {
  let listeners: ReadonlyArray<Listener0<RESULT>> = firstListener ? [firstListener] : [];

  const signal: Partial<Signal0<RESULT>> = () => listeners.map(fn => fn());

  signal.subscribe = (listener) => {
    listeners = listeners.concat(listener);
    return () => {
      listeners = listeners.filter(fn => fn !== listener);
    };
  };

  return signal as Signal0<RESULT>;
}

