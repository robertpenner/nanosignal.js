export interface Listener<PAYLOAD, RESULT = void> {
  (payload: PAYLOAD): RESULT;
}

export interface Signal<PAYLOAD, RESULT = void> {
  (payload: PAYLOAD): ReadonlyArray<RESULT>;

  /**
   * Starts a function listening to this signal.
   * @param listener
   */
  add(listener: Listener<PAYLOAD, RESULT>): void;

  /**
   * Stops a function from listening to this signal.
   * @param listener
   */
  remove(listener: Listener<PAYLOAD, RESULT>): void;
}

/**
 * Creates a Signal: a function that multicasts its arguments to listeners.
 * @returns A new Signal
 */
export default function createSignal<PAYLOAD, RESULT = void>(firstListener?: Listener<PAYLOAD, RESULT>): Signal<PAYLOAD, RESULT> {
  let listeners: ReadonlyArray<Listener<PAYLOAD, RESULT>> = firstListener ? [firstListener] : [];

  const signal: Partial<Signal<PAYLOAD, RESULT>> = (payload: PAYLOAD) => listeners.map(fn => fn(payload));
  signal.add = (listener) => (
    listeners = listeners.concat(listener)
  );
  signal.remove = (listener) => {
    listeners = listeners.filter(fn => fn !== listener);
  };

  return signal as Signal<PAYLOAD, RESULT>;
}


