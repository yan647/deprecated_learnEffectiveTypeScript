interface Person {
  name: string;
}
interface Lifespan {
  birth: Date;
  death?: Date;
}
type PersonSpan = Person & Lifespan;

const ps0: PersonSpan = {
  name: 'Alan Turing',
  birth: new Date('1912/06/23'),
  death: new Date('1954/06/07'),
}; // OK

const ps01: PersonSpan = {
  name: 'Alan Turing',
  // birth: new Date('1912/06/23'),
  // death: new Date('1954/06/07'),
};

const ps02: PersonSpan = {
  name: 'Alan Turing',
  birth: new Date('1912/06/23'),
  death: new Date('1954/06/07'),
  example:true,
}; // OK

type PersonSpan2 = Person | Lifespan;

const ps21: PersonSpan2 = {
  name: 'Alan Turing',
  birth: new Date('1912/06/23'),
  death: new Date('1954/06/07'),
};
const ps22: PersonSpan2 = {
  name: 'Alan Turing',
  // birth: new Date('1912/06/23'),
  // death: new Date('1954/06/07'),
};

type K = keyof (Person | Lifespan); // Type is never
