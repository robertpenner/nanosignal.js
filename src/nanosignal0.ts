
export interface Listener0<RESULT = void> {
  (): RESULT;
}

export interface Signal0<RESULT = void> {
  (): ReadonlyArray<RESULT>;

  /**
   * Starts a function listening to this signal.
   * @param listener
   */
  add(listener: Listener0<RESULT>): void;

  /**
   * Stops a function from listening to this signal.
   * @param listener
   */
  remove(listener: Listener0<RESULT>): void;
}

export function createSignal0<RESULT = void>(firstListener?: Listener0<RESULT>): Signal0<RESULT> {
  let listeners: ReadonlyArray<Listener0<RESULT>> = firstListener ? [firstListener] : [];

  const signal: Partial<Signal0<RESULT>> = () => listeners.map(fn => fn());
  signal.add = (listener) => (
    listeners = listeners.concat(listener)
  );
  signal.remove = (listener) => {
    listeners = listeners.filter(fn => fn !== listener);
  };

  return signal as Signal0<RESULT>;
}

