This part is all about TypeScript: an open-source typed superset of JavaScript developed by Microsoft that compiles to plain JavaScript.

In this part, we will be using the tools previously introduced to build end-to-end features to an existing ecosystem, with predefined linters and an existing codebase, while writing TypeScript. After doing this part, you should be able to understand, develop and configure projects using TypeScript.

This part is created by Tuomo Torppa, Tuukka Peuraniemi and Jani Rapo, the awesome developers of Terveystalo, the largest private healthcare service provider in Finland. Terveystalo’s nationwide network covers 300 locations across Finland. The clinic network is supplemented by 24/7 digital services.

# Table of Content


# Part 9

## Part9 - Background and introduction

[TypeScript](https://www.typescriptlang.org/) is a programming language designed for large-scale JavaScript development created by Microsoft. For example, Microsoft's _Azure Management Portal_ (1,2 million lines of code) and _Visual Studio Code_ (300 000 lines of code) have both been written in TypeScript. To support building large-scale JavaScript applications, TypeScript offers features such as better development-time tooling, static code analysis, compile-time type checking and code-level documentation.

### Main principle

TypeScript is a typed superset of JavaScript, and eventually, it's compiled into plain JavaScript code. The programmer is even able to decide the version of the generated code, as long as it's ECMAScript 3 or newer. TypeScript being a superset of JavaScript means that it includes all the features of JavaScript and its additional features as well. In other words, all existing JavaScript code is valid TypeScript.

TypeScript consists of three separate, but mutually fulfilling parts:

- The language

- The compiler

- The language service

![alt text](assets/image.png)

The _language_ consists of syntax, keywords and type annotations. The syntax is similar to but not the same as JavaScript syntax. From the three parts of TypeScript, programmers have the most direct contact with the language.

The _compiler_ is responsible for type information erasure (i.e. removing the typing information) and for code transformations. The code transformations enable TypeScript code to be transpiled into executable JavaScript. Everything related to the types is removed at compile-time, so TypeScript isn't genuine statically typed code.

Traditionally, _compiling_ means that code is transformed from a human-readable format to a machine-readable format. In TypeScript, human-readable source code is transformed into another human-readable source code, so the correct term would be _transpiling_. However, compiling has been the most commonly used term in this context, so we will continue to use it.

The compiler also performs a static code analysis. It can emit warnings or errors if it finds a reason to do so, and it can be set to perform additional tasks such as combining the generated code into a single file.

The _language service_ collects type information from the source code. Development tools can use the type information for providing intellisense, type hints and possible refactoring alternatives.

### TypeScript key language features

In this section, we will describe some of the key features of the TypeScript language. The intent is to provide you with a basic understanding of TypeScript's key features to help you understand more of what is to come during this course.

__Type annotations__

Type annotations in TypeScript are a lightweight way to record the intended contract of a function or a variable. In the example below, we have defined a `birthdayGreeter` function that accepts two arguments: one of type string and one of type number. The function will return a string.

```js
const birthdayGreeter = (name: string, age: number): string => {
  return `Happy birthday ${name}, you are now ${age} years old!`
}

const birthdayHero = "Jane User"
const age = 22

console.log(birthdayGreeter(birthdayHero, age))
```

__Keywords__

Keywords in TypeScript are specially reserved words that embody designated teleological meaning within the construct of the language. They cannot be used as identifiers (variable names, function names, class names, etc.) because they are part of the syntax of the language. An attempt to use these keywords will result in syntax or semantics error. There are about 40-50 keywords in TypeScript. Some of these keywords include: type, enum, interface, void, null, instanceof etc. One thing to note is that, TypeScript inherits all the reserved keywords from JavaScript, plus it adds a few of its own type-related keywords like interface, type, enum, etc.

__Structural typing__

TypeScript is a structurally typed language. In structural typing, two elements are considered to be compatible with one another if, for each feature within the type of the first element, a corresponding and identical feature exists within the type of the second element. Two types are considered to be identical if they are compatible with each other.

__Type inference__

The TypeScript compiler can attempt to infer the type information if no type has been specified. Variables' types can be inferred based on their assigned value and their usage. The type inference takes place when initializing variables and members, setting parameter default values, and determining function return types.

For example, consider the function `add`:

```js
const add = (a: number, b: number) => {
  /* The return value is used to determine
     the return type of the function */
  return a + b;
}
```

The type of the function's return value is inferred by retracing the code back to the return expression. The return expression performs an addition of the parameters a and b. We can see that a and b are numbers based on their types. Thus, we can infer the return value to be of type `number`.

__Type erasure__

TypeScript removes all type system constructs during compilation.

Input:

```js
let x: SomeType
```

Output:

```js
let x
```

This means that no type information remains at runtime; nothing says that some variable x was declared as being of type `SomeType`.

The lack of runtime type information can be surprising for programmers who are used to extensively using reflection or other metadata systems.