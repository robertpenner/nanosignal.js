export interface Listener<PAYLOAD, RESULT = void> {
  (payload: PAYLOAD): RESULT;
}

/**
 * Cancels a listener's subscription to its signal.
 */
export interface Subscription {
  unsubscribe(): void;
}

export interface Signal<PAYLOAD, RESULT = void> {
  (payload: PAYLOAD): ReadonlyArray<RESULT>;

  /**
   * Starts a function listening to this signal.
   * @param listener
   */
  subscribe(listener: Listener<PAYLOAD, RESULT>): Subscription;
}

/**
 * Creates a Signal: a function that multicasts a payload to listeners.
 * @returns A new Signal
 */
export default function createSignal<PAYLOAD, RESULT = void>(firstListener?: Listener<PAYLOAD, RESULT>): Signal<PAYLOAD, RESULT> {
  let listeners: ReadonlyArray<Listener<PAYLOAD, RESULT>> = firstListener ? [firstListener] : [];

  const signal: Partial<Signal<PAYLOAD, RESULT>> = (payload: PAYLOAD) => listeners.map(fn => fn(payload));

  signal.subscribe = (listener) => {
    listeners = listeners.concat(listener);
    return {
      unsubscribe() {
        listeners = listeners.filter(fn => fn !== listener);
      }
    };
  };

  return signal as Signal<PAYLOAD, RESULT>;
}


