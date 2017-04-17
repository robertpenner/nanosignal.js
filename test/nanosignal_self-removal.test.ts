import createSignal, { Signal } from '../src/nanosignal';

describe('when a listener removes itself during dispatch', () => {
  let happened: Signal<() => void>;
  let selfRemover: jest.Mock<any>;
  let listenerB: jest.Mock<any>;
  let listenerC: jest.Mock<any>;
  beforeEach(() => {
    happened = createSignal();
    selfRemover = jest.fn(() => happened.remove(selfRemover));
    listenerB = jest.fn();
    listenerC = jest.fn();
    happened.add(selfRemover);
    happened.add(listenerB);
    happened.add(listenerC);
    // dispatch twice and expect self-remover to be called only once
    happened();
    happened();
  });

  it('the self-remover is called once then removed', () => {
    expect(selfRemover).toHaveBeenCalledTimes(1);
  });

  it('no other listener is skipped', () => {
    expect(listenerB).toHaveBeenCalledTimes(2);
    expect(listenerC).toHaveBeenCalledTimes(2);
  });
});



