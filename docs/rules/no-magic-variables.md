# Prevent magic numbers from being used as a variable name (`magic-variables/no-magic-variables`)

<!-- end auto-generated rule header -->

I have noticed that developers are lazy and even though the no-magic-numbers rule may in place developers will at times use variables that are the string representation of the magic number. 

## Rule Details

This rule aims to prevent developers from using variables names that are numeric 

Examples of **incorrect** code for this rule:

```js

var ZeroPointTwoFive = 0.25;

```

Examples of **correct** code for this rule:

```js

var UNAUTHORIZED = 401;

```

