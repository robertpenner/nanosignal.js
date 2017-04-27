import createSignal, { Signal } from '../src/nanosignal';

describe('signal with 1 argument', () => {
  let dated: Signal<Date>;
  beforeEach(() => {
    dated = createSignal();
  });
  it('is a function', () => expect(typeof dated).toBe('function'));

  describe('when fired with the payload', () => {
    let listenerA: jest.Mock<any>;
    let listenerB: jest.Mock<any>;
    const payload = new Date();
    beforeEach(() => {
      listenerA = jest.fn();
      listenerB = jest.fn();
      dated.subscribe(listenerA);
      dated.subscribe(listenerB);
      dated(payload);
    });

    it('the listeners receive the payload', () => {
      expect(listenerA).toHaveBeenCalledWith(payload);
      expect(listenerB).toHaveBeenCalledWith(payload);
    });
  });

});



