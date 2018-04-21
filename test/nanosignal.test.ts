import createSignal, { Signal, Unsubscriber } from '../src/nanosignal'

describe('Signal', () => {
  let dated: Signal<Date>
  beforeEach(() => {
    dated = createSignal()
  })
  it('is a function', () => expect(typeof dated).toBe('function'))

  describe('given 2 listeners', () => {
    let listenerA: jest.Mock<any>
    let listenerB: jest.Mock<any>
    const payload = new Date()
    beforeEach(() => {
      listenerA = jest.fn()
      listenerB = jest.fn()
      dated.subscribe(listenerA)
      dated.subscribe(listenerB)
      dated(payload)
    })

    it('when the signal fires, the listeners receive the payload', () => {
      expect(listenerA).toHaveBeenCalledWith(payload)
      expect(listenerB).toHaveBeenCalledWith(payload)
    })
  })

  describe('given a firstListener argument and then subscribe() a second listener', () => {
    let listenerA: jest.Mock<any>
    let listenerB: jest.Mock<any>
    const payload = new Date()
    beforeEach(() => {
      listenerA = jest.fn()
      listenerB = jest.fn()
      dated = createSignal(listenerA)
      dated.subscribe(listenerB)
      dated(payload)
    })

    it('when the signal fires, the listeners receive the payload', () => {
      expect(listenerA).toHaveBeenCalledWith(payload)
      expect(listenerB).toHaveBeenCalledWith(payload)
    })
  })

  describe('when removing a listener before firing', () => {
    let listenerA: jest.Mock<any>
    let removeA: Unsubscriber
    beforeEach(() => {
      listenerA = jest.fn()
      removeA = dated.subscribe(listenerA)
      removeA()
      dated(new Date())
    })

    it('the listener is not called', () => {
      expect(listenerA).not.toBeCalled()
    })
  })
})
