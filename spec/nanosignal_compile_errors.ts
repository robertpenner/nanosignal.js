/// <reference path="nanosignal.ts" />

(function test() {
  var zig0 = nano.signal();
  //zig0.remove(null);
  zig0.add(() => console.log('zig0', 0));
  zig0.remove();
  zig0();
  //zig0('wrong');

  //zig0.add(null);


  var zig1 = nano.signal<Date>();
  var onDate = (date: Date) => console.log(date);
  zig1.add(onDate);
  zig1.remove(onDate);
  zig1(new Date());

  //// compile errors
  zig1.add((a, b) => null);
  //zig1.add((wrong: string) => null);
  //zig1();
  //zig1("wrong");
  //zig1(null, null);

})();

