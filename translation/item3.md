# item 3 明白代码生成与类型无关
在高层次，tsc做了两件事：
* 它将下一代的TS/JS转换成能在浏览器中运行的老版本的JS（编译）。
* 它检查代码是否存在类型错误。

令人惊讶的是，这两种行为是完全独立的。换句话说，代码中的类型不会影响由TS到JS的编译过程。由于JS是可执行的，这就意味着类型不能影响代码的运行方式。
这里有一些令人惊讶的暗示，而且会告诉你TS能做什么和不能做什么。
带有类型错误的代码可以产生输出
由于代码输出与类型检查无关，因此有类型错误的代码可以产生输出。

```
$ cat test.ts
let x = 'hello';
x = 1234;
$ tsc test.ts
test.ts:2:1 - error TS2322: Type '1234' is not assignable to type 'string'
​
2 x = 1234;
~
​
$ cat test.js
var x = 'hello';
x = 1234;
```
如果你使用过C或Java这样的语言，他们的类型检查和输出是同时进行的，那TS的这种情况可能会非常令人惊讶。你可以认为所有的TS报错与这些语言中的警告类似：他们很可能表明了一个问题，值得探究，但他们不会停止构建。

在实践中，在代码中发现错误是很有用的。如果你正在构建一个Web应用程序，你可能知道某个特定部分存在问题。但是因为TS在存在错误的时候仍然可以生成代码，你可以在修改他们之前测试其他部分的代码。

当你提交代码的时候你的目标是零错误，以免落入必须记住预料之中或意外的错误。如果你希望禁止错误输出，可以在tsconfig.json中使用noEmitOnErrors选项，或者在构建工具中使用类似选项。

## 不能在运行时检查TS类型
你可能会写这样的代码：

```TypeScript
interface Square {
  width: number;
}
interface Rectangle extends Square {
  height: number;
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
    if (shape instanceof Rectangle) {
                        // ~~~~~~~~~ 'Rectangle' only refers to a type,
                        //           but is being used as a value here
    return shape.width * shape.height;
                    //         ~~~~~~ Property 'height' does not exist
                    //                on type 'Shape'
    } else {
      return shape.width * shape.width;
    }
}
```
