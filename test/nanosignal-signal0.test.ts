import { createSignal0, Signal0 } from '../src/nanosignal0';

describe('signal with 0 arguments', () => {
  let happened: Signal0;
  beforeEach(() => {
    happened = createSignal0();
  });
  it('is a function', () => expect(typeof happened).toBe('function'));

  describe('when removing a listener before firing', () => {
    let listenerA: jest.Mock<any>;
    beforeEach(() => {
      listenerA = jest.fn();
      happened.add(listenerA);
      happened.remove(listenerA);
      happened();
    });

    it('the listener is not called', () => {
      expect(listenerA).not.toBeCalled();
    });
  });

  describe('when adding the same listener twice', () => {
    let listenerA: jest.Mock<any>;
    beforeEach(() => {
      listenerA = jest.fn();
      happened.add(listenerA);
      happened.add(listenerA);
    });

    describe('then firing the signal once', () => {
      beforeEach(() => {
        happened();
      });
      it('the listener is called twice', () => {
        expect(listenerA.mock.calls.length).toEqual(2);
      });
    });

    describe('then removing the listener once and firing', () => {
      beforeEach(() => {
        happened.remove(listenerA);
        happened();
      });
      it('the listener is not called', () => {
        expect(listenerA.mock.calls.length).toEqual(0);
      });
    });
  });

  describe('when adding 2 listeners', () => {
    let listenerA: jest.Mock<any>;
    let listenerB: jest.Mock<any>;
    beforeEach(() => {
      listenerA = jest.fn();
      listenerB = jest.fn();
      happened.add(listenerA);
      happened.add(listenerB);
    });

    it('does not call them before firing', () => {
      expect(listenerA).not.toBeCalled();
      expect(listenerB).not.toBeCalled();
    });

    describe('when firing the signal twice', () => {
      beforeEach(() => {
        happened();
        happened();
      });
      it('calls the listeners twice', () => {
        expect(listenerA).toHaveBeenCalledTimes(2);
        expect(listenerB).toHaveBeenCalledTimes(2);
      });
    });

    describe('remove(undefined)', () => {
      beforeEach(() => {
        happened.remove(undefined as any);
        happened();
      });
      it('does not remove any listeners', () => {
        expect(listenerA).toBeCalled();
        expect(listenerB).toBeCalled();
      });
    });

    describe('when adding a listener bound to a scope', () => {
      let scope: any;
      beforeEach(() => {
        scope = {
          called: false
        };
        function listener() {
          this.called = true;
        }

        scope.listener = listener.bind(scope);
        happened.add(scope.listener);
        happened();
      });

      it('the listener is called in the bound scope', () => {
        expect(scope.called).toBeTruthy();
      });
    });

  });

});



