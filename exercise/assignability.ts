let source: { a: string, b: number } = {a: '1', b: 2};
let target: { a: string, b: number, c: boolean } = {a: '1', b: 2, c: true};
target = source;
source = target;
