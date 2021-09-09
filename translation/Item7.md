# Item 7 把类型视为值的集合

在运行时，每个变量有一个从JavaScript宇宙中选择的值。有很多可能的值，包括：

- 42
- null
- undefined
- 'Canada'
- {animal: 'Whale', weight_lbs: 40_000}
- /regex/
- new HTMLButtonElement
- (x, y) => x + y

但是在运行代码之前，当TypeScript检查错误时，变量只有一个类型。把可能的值看作一个集合，这是最好的想法。这个集合称为类型的域。比如，你可以把number类型看作所有数值的集合。42和-37.25在其中，但'Canada'不在。依赖于strictNullChecks，null和undefined可能是集合的一部分也可能不是。

最小的集合是空集合，它不包含任何值。在TypeScript中，它对应never类型。因为它的域是空，never类型的值不能被赋值给其他变量：

```typescript
const x: never = 12;
   // ~ Type '12' is not assignable to type 'never'
```

下一个最小的集合是那些包含单个值的集合。在TypeScript中，它们对应文字类型，也称为单元类型（unit types）：

```typescript
type A = 'A';
type B = 'B';
type Twelve = 12;
```

若要形成两个或三个值的类型，你可以联合单元类型：

```typescript
type AB = 'A' | 'B';
type AB12 = 'A' | 'B' | 12;
```

等等。联合类型对应值的并集。

单词"assignable"出现在很多TypeScript错误中。在值的集合的上下文中，它表示"成员"（表示值和类型间的关系）或"子集"（表示两个类型间的关系）：

```typescript
const a: AB = 'A';  // OK, value 'A' is a member of the set {'A', 'B'}
const c: AB = 'C';
   // ~ Type '"C"' is not assignable to type 'AB'
```

类型C是个单元类型。它只包括一个值C。它不是AB（包括A和B两个值）的子集，所以这是个错误。在一天结束的时候，几乎所有的类型检查器都在测试一个集合是否是另一个的子集：

```typescript
// OK, {"A", "B"} is a subset of {"A", "B"}:
const ab: AB = Math.random() < 0.5 ? 'A' : 'B';
const ab12: AB12 = ab;  // OK, {"A", "B"} is a subset of {"A", "B", 12}

declare let twelve: AB12;
const back: AB = twelve;
   // ~~~~ Type 'AB12' is not assignable to type 'AB'
   //        Type '12' is not assignable to type 'AB'
```

这些类型的集合是很容易推导出的，因为它们是有限的。但是实际中大多数类型都有着无限的域。对它们的推导可能更加困难。你可以把它们看作是建设性的：

```typescript
type Int = 1 | 2 | 3 | 4 | 5 // | ...
```

或者描述它们的成员：

```typescript
interface Identified {
  id: string;
}
```

可以把这个接口看作对值在它的类型域中的描述。该值是否有一个id属性，该属性的值可以分配给string（字符串的子集）？然后它就是被确定的。

上面就说这些。正如Item 4解释的那样，TypeScript的结构类型规则意味着该值也可以有其他属性。它甚至可以被调用。这个事实有时会被过量属性检查所掩盖（参见Item 11）。

把类型看作值的集合可以帮助你推理对它们的操作。比如：

```typescript
interface Person {
  name: string;
}
interface Lifespan {
  birth: Date;
  death?: Date;
}
type PersonSpan = Person & Lifespan;
```

todo

























