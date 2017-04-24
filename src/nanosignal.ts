export interface Listener<PAYLOAD = undefined, RESULT = void> {
  (payload?: PAYLOAD): RESULT;
}

export interface Signal<PAYLOAD = undefined, RESULT = void> {
  (payload?: PAYLOAD): ReadonlyArray<RESULT>;

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
export default function createSignal<PAYLOAD = undefined, RESULT = void>(firstListener?: Listener<PAYLOAD, RESULT>): Signal<PAYLOAD, RESULT> {
  let listeners: ReadonlyArray<Listener<PAYLOAD, RESULT>> = firstListener ? [firstListener] : [];

  const signal: Signal<PAYLOAD, RESULT> = Object.assign(
    (payload?: PAYLOAD) => listeners.map(listener => listener(payload)),
    {
      add(listener: Listener<PAYLOAD, RESULT>) {
        listeners = listeners.concat(listener);
      },
      remove(listener: Listener<PAYLOAD, RESULT>) {
        listeners = listeners.filter(fn => fn !== listener);
      },
    }
  );
  return signal;
}

