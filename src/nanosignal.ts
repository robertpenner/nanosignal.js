export interface Listener<PAYLOAD, RESULT = void> {
  (payload: PAYLOAD): RESULT;
}

/**
 * Cancels a listener's subscription to its signal.
 */
export interface Unsubscriber {
  (): void;
}

export interface Signal<PAYLOAD, RESULT = void> {
  (payload: PAYLOAD): ReadonlyArray<RESULT>;

  /**
   * Starts a function listening to this signal.
   * @param listener
   */
  subscribe(listener: Listener<PAYLOAD, RESULT>): Unsubscriber;
}

/**
 * Creates a Signal: a function that multicasts a payload to listeners.
 * @returns A new Signal
 */
export default function createSignal<PAYLOAD, RESULT = void>(
  firstListener?: Listener<PAYLOAD, RESULT>,
): Signal<PAYLOAD, RESULT> {
  let listeners: ReadonlyArray<Listener<PAYLOAD, RESULT>> = firstListener
    ? [firstListener]
    : [];

  const signal = Object.assign(
    (payload: PAYLOAD) => listeners.map((fn) => fn(payload)),
    {
      subscribe: (listener: Listener<PAYLOAD, RESULT>) => {
        listeners = listeners.concat(listener);
        return () => {
          listeners = listeners.filter((fn) => fn !== listener);
        };
      },
    },
  );

  return signal;
}
