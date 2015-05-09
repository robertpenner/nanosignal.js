/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../src/nanosignal.ts" />

var signal = require("../src/nanosignal");
//import signal = require("../src/nanosignal_map");

describe('nanosignal', function () {

  describe("signal with 0 arguments", function () {
    var happened: nano.Signal0;
    beforeEach(function () {
      happened = signal();
    });
    it("is a function", () => expect(typeof happened).toBe('function'));

    describe("when removing a listener before firing", function () {
      var listenerA: jasmine.Spy;
      beforeEach(function () {
        listenerA = jasmine.createSpy('listenerA');
        happened.add(listenerA);
        happened.remove(listenerA);
        happened();
      });

      it("the listener is not called", function () {
        expect(listenerA).not.toHaveBeenCalled();
      });
    });


    describe("when adding the same listener twice", function () {
      var listenerA: jasmine.Spy;
      beforeEach(function () {
        listenerA = jasmine.createSpy('listenerA');
        happened.add(listenerA);
        happened.add(listenerA);
      });

      describe("then firing the signal once", function () {
        beforeEach(() => {
          happened();
        });
        it("the listener is called only once", function () {
          expect(listenerA.calls.count()).toEqual(1);
        });
      });

      describe("then removing the listener once and firing", function () {
        beforeEach(() => {
          happened.remove(listenerA);
          happened();
        });
        it("the listener is not called", function () {
          expect(listenerA.calls.count()).toEqual(0);
        });
      });
    });

    describe("when adding 2 listeners", function () {
      var listenerA: jasmine.Spy, listenerB: jasmine.Spy;
      beforeEach(function () {
        listenerA = jasmine.createSpy('listenerA');
        listenerB = jasmine.createSpy('listenerB');
        happened.add(listenerA);
        happened.add(listenerB);
      });

      it("does not call them before firing", function () {
        expect(listenerA).not.toHaveBeenCalled();
        expect(listenerB).not.toHaveBeenCalled();
      });
      describe("when firing the signal twice", function () {
        beforeEach(() => {
          happened();
          happened();
        });
        it("calls the listeners twice", function () {
          expect(listenerA.calls.count()).toEqual(2);
          expect(listenerB.calls.count()).toEqual(2);
        });
      });
      describe("with once() and firing twice", function () {
        beforeEach(() => {
          happened = signal('once');
          happened.add(listenerA);
          happened.add(listenerB);
          happened();
          happened();
        });
        it("calls the listeners only once", function () {
          expect(listenerA.calls.count()).toEqual(1);
          expect(listenerB.calls.count()).toEqual(1);
        });
      });
      describe("remove() with no argument", function () {
        beforeEach(() => {
          happened.remove();
          happened();
        });
        it("removes all listeners", function () {
          expect(listenerA).not.toHaveBeenCalled();
          expect(listenerB).not.toHaveBeenCalled();
        });
      });
      describe("remove(undefined)", function () {
        beforeEach(() => {
          happened.remove(undefined);
          happened();
        });
        it("does not remove any listeners", function () {
          expect(listenerA).toHaveBeenCalled();
          expect(listenerB).toHaveBeenCalled();
        });
      });
      describe("when adding a listener bound to a scope", function () {
        var scope: any;
        beforeEach(function () {
          scope = {
            called: false
          };
          scope.listener = (function () {
            this.called = true;
          }).bind(scope);
          happened.add(scope.listener);
          happened();
        });

        it("the listener is called in the bound scope", function () {
          expect(scope.called).toBeTruthy();
        });
      });

    });

  }); // signal0

  describe("signal with 1 argument", function () {
    var dated: nano.Signal1<Date>;
    beforeEach(() => dated = signal());
    it("is a function", () => expect(typeof dated).toBe('function'));

    describe("when fired with the payload", function () {
      var listenerA: jasmine.Spy, listenerB: jasmine.Spy;
      var payload = new Date();
      beforeEach(function () {
        listenerA = jasmine.createSpy('listenerA');
        listenerB = jasmine.createSpy('listenerB');
        dated.add(listenerA);
        dated.add(listenerB);
        dated(payload);
      });

      it("the listeners receive the payload", function () {
        expect(listenerA).toHaveBeenCalledWith(payload);
        expect(listenerB).toHaveBeenCalledWith(payload);
      });
    });

  }); // signal1

  describe("when a listener removes itself during dispatch", function() {
    var happened: nano.Signal0;
    var selfRemover: jasmine.Spy;
    var listenerB: jasmine.Spy;
    var listenerC: jasmine.Spy;
    beforeEach(function () {
      happened = signal();
      selfRemover = jasmine.createSpy('selfRemover',
        () => happened.remove(selfRemover))
        .and.callThrough();
      listenerB = jasmine.createSpy('listenerB');
      listenerC = jasmine.createSpy('listenerC');
      happened.add(selfRemover);
      happened.add(listenerB);
      happened.add(listenerC);
      // dispatch twice and expect self-remover to be called only once
      happened();
      happened();
    });
    it("the self-remover is removed", function() {
      expect(selfRemover.calls.count()).toEqual(1);
    });
    it("no listener is skipped", function() {
      expect(listenerB.calls.count()).toEqual(2);
      expect(listenerC.calls.count()).toEqual(2);
    });
  });
});