/**
 * Creates a Signal: a function that multicasts a payload to listeners.
 * @returns {function} A new Signal
 */
export default function createSignal() {
  let listeners = [];
  // Each listener can return a value, which is collected in the map array.
  const signal = (payload) => listeners.map(fn => fn(payload));

  signal.subscribe = (listener) => {
    listeners = [...listeners, listener];
    // return an unsubscriber
    return () => {
      listeners = listeners.filter(fn => fn !== listener);
    };
  };

  return signal;
}
