import createSignal, { Signal } from '../src/nanosignal'

describe('when a listener unsubscribes another listener during dispatch', () => {
  let dated: Signal<Date>
  let listenerA: jest.Mock<any>
  let listenerB: jest.Mock<any>
  let listenerC: jest.Mock<any>
  beforeEach(() => {
    dated = createSignal()
    listenerA = jest.fn()
    const unsubscribeA = dated.subscribe(listenerA)
    listenerB = jest.fn(unsubscribeA)
    listenerC = jest.fn()
    dated.subscribe(listenerB)
    dated.subscribe(listenerC)
    // dispatch twice and expect the unsubscribed listener to be called only once
    dated(new Date())
    dated(new Date())
  })

  it('the first listener is called once then unsubscribed', () => {
    expect(listenerA).toHaveBeenCalledTimes(1)
  })

  it('no other listener is skipped', () => {
    expect(listenerB).toHaveBeenCalledTimes(2)
    expect(listenerC).toHaveBeenCalledTimes(2)
  })
})
