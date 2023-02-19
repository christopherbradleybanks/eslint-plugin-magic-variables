# eslint-plugin-magic-variables

Prevent variable names that are numeric, or are the word form of a number from being used. i.e. FIFTY_TWO is not a valid variable name. 

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-magic-variables`:

```sh
npm install eslint-plugin-magic-variables --save-dev
```

## Usage

Add `magic-variables` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "magic-variables"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "magic-variables/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                                   | Description                                              |
| :----------------------------------------------------- | :------------------------------------------------------- |
| [no-magic-variables](docs/rules/no-magic-variables.md) | prevent magic numbers from being used as a variable name |

<!-- end auto-generated rules list -->


