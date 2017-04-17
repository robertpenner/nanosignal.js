import createSignal from '../src/nanosignal';

describe('Dummy test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy();
  });
});


const onDate = (date: Date) => console.log(date);
const zig1 = createSignal<typeof onDate>();
zig1.add(onDate);
zig1(new Date());
zig1.remove(onDate);

