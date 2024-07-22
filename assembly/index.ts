// The entry file of your WebAssembly module.
// Allowing memory
memory.grow(2);

store<u8>(0, 21);
store<u8>(1, 99);

declare function log(n: i32): void;

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function minusOne(a: i32): i32 {
  log(a);
  if (a === 44) {
    throw new Error("a is 44");
  }

  return a - 1;
}


export function fizzbuzz(n: i32): String {
  let str = '';
  if (n % 3 === 0) {
    str = str.concat('fizz');
  }
  if (n % 5 === 0) {
    str = str.concat('buzz');
  }

  return str;
}

export function readMemory(n: i32): i32 {
  return load<u8>(n);
}