declare module nano {

  // most generic signal
  interface Signal<Fn extends Function> extends Function {
    add(listener: Fn): void;
    remove(listener?: Fn): void;
  }

  export interface Signal0 extends Function0, Signal<Function0> {}
  interface Signal1<A> extends Function1<A>, Signal<Function1<A>> {}
  interface Signal2<A, B> extends Function2<A, B>, Signal<Function2<A, B>> {}
  interface Signal3<A, B, C> extends Function3<A, B, C>, Signal<Function3<A, B, C>> {}
  interface Signal4<A, B, C, D> extends Function4<A, B, C, D>, Signal<Function4<A, B, C, D>> {}
  interface Signal5<A, B, C, D, E> extends Function5<A, B, C, D, E>, Signal<Function5<A, B, C, D, E>> {}

  interface Function0 { (): any }
  interface Function1<A> { (a: A): any }
  interface Function2<A, B> { (a: A, b: B): any }
  interface Function3<A, B, C> { (a: A, b: B, c: C): any }
  interface Function4<A, B, C, D> { (a: A, b: B, c: C, d: D): any }
  interface Function5<A, B, C, D, E> { (a: A, b: B, c: C, d: D, e: E): any }

}

