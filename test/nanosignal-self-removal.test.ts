import createSignal0, { Signal0 } from '../src/nanosignal0';

describe('when a listener unsubscribes another listener during dispatch', () => {
  let happened: Signal0;
  let listenerA: jest.Mock<any>;
  let listenerB: jest.Mock<any>;
  let listenerC: jest.Mock<any>;
  beforeEach(() => {
    happened = createSignal0();
    listenerA = jest.fn();
    const unsubscribeA = happened.subscribe(listenerA);
    listenerB = jest.fn(unsubscribeA);
    listenerC = jest.fn();
    happened.subscribe(listenerB);
    happened.subscribe(listenerC);
    // dispatch twice and expect self-unsubscriber to be called only once
    happened();
    happened();
  });

  it('the first listener is called once then unsubscribed', () => {
    expect(listenerA).toHaveBeenCalledTimes(1);
  });

  it('no other listener is skipped', () => {
    expect(listenerB).toHaveBeenCalledTimes(2);
    expect(listenerC).toHaveBeenCalledTimes(2);
  });
});



